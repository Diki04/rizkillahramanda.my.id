'use client';

import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useId,
  forwardRef,
} from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { cn } from '@/common/utils/cn';

export interface GlideSelectOption {
  value: string;
  label?: string;
  tag?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export type GlideSelectRawOption = string | GlideSelectOption;

export interface GlideSelectProps {
  /** Array of raw strings or option objects */
  options: GlideSelectRawOption[];
  /** Controlled selected value */
  value?: string;
  /** Uncontrolled default value */
  defaultValue?: string;
  /** Selection change callback */
  onChange?: (value: string, option: GlideSelectOption) => void;
  /** Placeholder when no option is selected */
  placeholder?: string;
  /** Disable the entire component */
  disabled?: boolean;
  /** Name attribute for HTML forms */
  name?: string;
  /** Custom ID for accessibility and DOM targeting */
  id?: string;
  /** Custom class for outer wrapper */
  className?: string;
  /** Custom class for combobox trigger button */
  buttonClassName?: string;
  /** Custom class for dropdown listbox menu */
  menuClassName?: string;
  /** Custom class for each option item */
  optionClassName?: string;
  /** Custom class for sliding highlight backdrop indicator */
  indicatorClassName?: string;
  /** Accent color for checkmarks and active highlights (default: "#ffffff") */
  accentColor?: string;
  /** Surface background color (default: "#09090b") */
  surfaceColor?: string;
  /** Sliding backdrop highlight indicator color (default: "#27272a") */
  highlightColor?: string;
  /** Primary text color (default: "#ffffff") */
  textColor?: string;
  /** Accessible label */
  ariaLabel?: string;
  'aria-label'?: string;
  /** Presentation variant: 'dropdown' or 'inline' (default: 'dropdown') */
  variant?: 'dropdown' | 'inline';
  /** Size variant: 'sm' | 'md' | 'lg' (default: 'md') */
  size?: 'sm' | 'md' | 'lg';
  /** Initial dropdown open state (useful for tests and SSR) */
  defaultOpen?: boolean;
  /** Controlled open state */
  open?: boolean;
  /** Callback fired when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Style overrides for container */
  style?: React.CSSProperties;
}

/**
 * Normalizes an array of raw strings or option objects into standardized GlideSelectOption structures.
 */
export function normalizeOptions(rawOptions: GlideSelectRawOption[]): GlideSelectOption[] {
  if (!Array.isArray(rawOptions)) return [];
  return rawOptions.map((opt) => {
    if (typeof opt === 'string') {
      return {
        value: opt,
        label: opt,
        tag: undefined,
        disabled: false,
        icon: undefined,
      };
    }
    return {
      value: String(opt.value),
      label: opt.label !== undefined ? String(opt.label) : String(opt.value),
      tag: opt.tag,
      disabled: Boolean(opt.disabled),
      icon: opt.icon,
    };
  });
}

/**
 * Accessible typeahead search finding the next matching option starting with query.
 */
export function findTypeaheadMatch(
  options: GlideSelectOption[],
  searchString: string,
  startIndex = 0
): number {
  if (!searchString || options.length === 0) return -1;
  const query = searchString.toLowerCase();

  // 1. Search forward from startIndex + 1
  for (let i = startIndex + 1; i < options.length; i++) {
    const opt = options[i];
    if (opt.disabled) continue;
    const text = (opt.label || opt.value).toLowerCase();
    if (text.startsWith(query)) return i;
  }

  // 2. Wrap around from 0 up to startIndex
  for (let i = 0; i <= startIndex; i++) {
    const opt = options[i];
    if (opt.disabled) continue;
    const text = (opt.label || opt.value).toLowerCase();
    if (text.startsWith(query)) return i;
  }

  return -1;
}

/**
 * GlideSelect: ReactBits monochrome spring selector component.
 * Features an animated sliding backdrop highlight indicator, keyboard typeahead navigation,
 * click-outside dismissal, and full ARIA combobox accessibility.
 */
export const GlideSelect = forwardRef<HTMLDivElement, GlideSelectProps>(
  function GlideSelect(
    {
      options,
      value: valueProp,
      defaultValue,
      onChange,
      placeholder = 'Select option...',
      disabled = false,
      name,
      id: idProp,
      className,
      buttonClassName,
      menuClassName,
      optionClassName,
      indicatorClassName,
      accentColor = '#ffffff',
      surfaceColor = '#09090b',
      highlightColor = '#27272a',
      textColor = '#ffffff',
      ariaLabel,
      'aria-label': ariaLabelAttr,
      variant = 'dropdown',
      size = 'md',
      defaultOpen = false,
      open: openProp,
      onOpenChange,
      style,
    },
    ref
  ) {
    const generatedId = useId();
    const id = idProp || `glide-select-${generatedId.replace(/:/g, '')}`;
    const listboxId = `${id}-listbox`;
    const effectiveAriaLabel = ariaLabelAttr || ariaLabel || placeholder;

    // Normalize options
    const normalizedOptions = normalizeOptions(options);

    // Controlled vs uncontrolled value
    const isControlledValue = valueProp !== undefined;
    const [internalValue, setInternalValue] = useState<string>(() => {
      if (defaultValue !== undefined) return defaultValue;
      return normalizedOptions[0]?.value ?? '';
    });
    const selectedValue = isControlledValue ? valueProp : internalValue;

    // Selected option metadata
    const selectedIndex = normalizedOptions.findIndex((opt) => opt.value === selectedValue);
    const selectedOption = selectedIndex >= 0 ? normalizedOptions[selectedIndex] : undefined;

    // Controlled vs uncontrolled open state
    const isControlledOpen = openProp !== undefined;
    const [internalOpen, setInternalOpen] = useState<boolean>(defaultOpen);
    const isOpen = isControlledOpen ? openProp : internalOpen;

    const setOpen = useCallback(
      (nextOpen: boolean) => {
        if (!isControlledOpen) {
          setInternalOpen(nextOpen);
        }
        onOpenChange?.(nextOpen);
      },
      [isControlledOpen, onOpenChange]
    );

    // Active index for keyboard focus and hover
    const [activeIndex, setActiveIndex] = useState<number>(() =>
      selectedIndex >= 0 ? selectedIndex : 0
    );
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    // Keep activeIndex synchronized when selectedIndex changes while closed
    useEffect(() => {
      if (!isOpen && selectedIndex >= 0) {
        setActiveIndex(selectedIndex);
      }
    }, [isOpen, selectedIndex]);

    // DOM references for measurement and click outside
    const containerRef = useRef<HTMLDivElement | null>(null);
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const menuRef = useRef<HTMLDivElement | null>(null);
    const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);

    // Typeahead buffer & timer
    const typeaheadBufferRef = useRef('');
    const typeaheadTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Track sliding indicator layout style
    const [indicatorStyle, setIndicatorStyle] = useState<React.CSSProperties>({
      opacity: 0,
    });

    const currentIndicatorIndex = hoveredIndex !== null ? hoveredIndex : activeIndex;

    // Calculate indicator geometry
    const updateIndicatorPosition = useCallback(() => {
      if (currentIndicatorIndex < 0 || currentIndicatorIndex >= normalizedOptions.length) {
        setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
        return;
      }

      const targetEl = optionRefs.current[currentIndicatorIndex];
      if (targetEl) {
        setIndicatorStyle({
          top: `${targetEl.offsetTop}px`,
          left: `${targetEl.offsetLeft}px`,
          width: `${targetEl.offsetWidth}px`,
          height: `${targetEl.offsetHeight}px`,
          opacity: 1,
        });
      } else {
        // Fallback for non-rendered/SSR DOM
        setIndicatorStyle({ opacity: 1 });
      }
    }, [currentIndicatorIndex, normalizedOptions.length]);

    // Recalculate indicator position on active index changes or opening
    useEffect(() => {
      if (variant === 'inline' || isOpen) {
        updateIndicatorPosition();
      }
    }, [variant, isOpen, currentIndicatorIndex, updateIndicatorPosition]);

    // Selection handler
    const handleSelect = useCallback(
      (option: GlideSelectOption) => {
        if (option.disabled || disabled) return;
        if (!isControlledValue) {
          setInternalValue(option.value);
        }
        onChange?.(option.value, option);
        if (variant === 'dropdown') {
          setOpen(false);
          buttonRef.current?.focus();
        }
      },
      [disabled, isControlledValue, onChange, variant, setOpen]
    );

    // Click outside handler for dropdown
    useEffect(() => {
      if (!isOpen || variant === 'inline') return;

      const handlePointerDown = (event: MouseEvent | TouchEvent) => {
        const target = event.target as Node;
        if (containerRef.current && !containerRef.current.contains(target)) {
          setOpen(false);
        }
      };

      document.addEventListener('mousedown', handlePointerDown);
      document.addEventListener('touchstart', handlePointerDown);

      return () => {
        document.removeEventListener('mousedown', handlePointerDown);
        document.removeEventListener('touchstart', handlePointerDown);
      };
    }, [isOpen, variant, setOpen]);

    // Cleanup typeahead timer
    useEffect(() => {
      return () => {
        if (typeaheadTimerRef.current) {
          clearTimeout(typeaheadTimerRef.current);
        }
      };
    }, []);

    // Navigate keyboard options
    const navigateOption = useCallback(
      (direction: 1 | -1) => {
        if (normalizedOptions.length === 0) return;
        let nextIndex = activeIndex;
        for (let i = 0; i < normalizedOptions.length; i++) {
          nextIndex = (nextIndex + direction + normalizedOptions.length) % normalizedOptions.length;
          if (!normalizedOptions[nextIndex].disabled) {
            setActiveIndex(nextIndex);
            optionRefs.current[nextIndex]?.scrollIntoView?.({ block: 'nearest' });
            break;
          }
        }
      },
      [activeIndex, normalizedOptions]
    );

    const jumpToBoundary = useCallback(
      (boundary: 'first' | 'last') => {
        if (boundary === 'first') {
          const first = normalizedOptions.findIndex((opt) => !opt.disabled);
          if (first !== -1) {
            setActiveIndex(first);
            optionRefs.current[first]?.scrollIntoView?.({ block: 'nearest' });
          }
        } else {
          for (let i = normalizedOptions.length - 1; i >= 0; i--) {
            if (!normalizedOptions[i].disabled) {
              setActiveIndex(i);
              optionRefs.current[i]?.scrollIntoView?.({ block: 'nearest' });
              break;
            }
          }
        }
      },
      [normalizedOptions]
    );

    const handleTypeahead = useCallback(
      (char: string) => {
        if (typeaheadTimerRef.current) {
          clearTimeout(typeaheadTimerRef.current);
        }
        typeaheadBufferRef.current += char;
        typeaheadTimerRef.current = setTimeout(() => {
          typeaheadBufferRef.current = '';
        }, 500);

        const match = findTypeaheadMatch(
          normalizedOptions,
          typeaheadBufferRef.current,
          activeIndex
        );
        if (match !== -1) {
          setActiveIndex(match);
          optionRefs.current[match]?.scrollIntoView?.({ block: 'nearest' });
        }
      },
      [activeIndex, normalizedOptions]
    );

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (disabled) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          if (!isOpen && variant === 'dropdown') {
            setOpen(true);
            navigateOption(1);
          } else {
            navigateOption(1);
          }
          break;
        case 'ArrowUp':
          e.preventDefault();
          if (!isOpen && variant === 'dropdown') {
            setOpen(true);
            navigateOption(-1);
          } else {
            navigateOption(-1);
          }
          break;
        case 'Home':
          if (isOpen || variant === 'inline') {
            e.preventDefault();
            jumpToBoundary('first');
          }
          break;
        case 'End':
          if (isOpen || variant === 'inline') {
            e.preventDefault();
            jumpToBoundary('last');
          }
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          if (!isOpen && variant === 'dropdown') {
            setOpen(true);
          } else if (
            activeIndex >= 0 &&
            normalizedOptions[activeIndex] &&
            !normalizedOptions[activeIndex].disabled
          ) {
            handleSelect(normalizedOptions[activeIndex]);
          }
          break;
        case 'Escape':
          if (isOpen && variant === 'dropdown') {
            e.preventDefault();
            setOpen(false);
            buttonRef.current?.focus();
          }
          break;
        case 'Tab':
          if (isOpen && variant === 'dropdown') {
            setOpen(false);
          }
          break;
        default:
          if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
            handleTypeahead(e.key);
          }
          break;
      }
    };

    // Size variants
    const sizeClasses = {
      sm: {
        trigger: 'px-2.5 py-1.5 text-xs',
        item: 'px-2.5 py-1 text-xs',
        inline: 'px-2.5 py-1 text-xs',
      },
      md: {
        trigger: 'px-3 py-2 text-sm',
        item: 'px-3 py-2 text-sm',
        inline: 'px-3 py-1.5 text-xs',
      },
      lg: {
        trigger: 'px-4 py-2.5 text-base',
        item: 'px-4 py-2.5 text-base',
        inline: 'px-4 py-2 text-sm',
      },
    }[size];

    // Combine external ref and internal containerRef
    const setContainerRef = useCallback(
      (node: HTMLDivElement | null) => {
        containerRef.current = node;
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }
      },
      [ref]
    );

    // RENDER: INLINE SEGMENTED TABS MODE
    if (variant === 'inline') {
      return React.createElement(
        'div',
        {
          ref: setContainerRef,
          role: 'radiogroup',
          'aria-label': effectiveAriaLabel,
          onKeyDown: handleKeyDown,
          style: {
            backgroundColor: surfaceColor,
            color: textColor,
            ...style,
          },
          className: cn(
            'relative inline-flex items-center p-1 rounded-xl border border-white/10 shadow-inner select-none',
            disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
            className
          ),
        },
        name
          ? React.createElement('input', {
              type: 'hidden',
              name,
              value: selectedValue,
            })
          : null,
        // Spring sliding backdrop indicator
        React.createElement('div', {
          'data-testid': 'glide-indicator',
          'aria-hidden': 'true',
          style: {
            ...indicatorStyle,
            backgroundColor: highlightColor,
          },
          className: cn(
            'absolute rounded-lg transition-all duration-200 ease-out pointer-events-none border border-white/5',
            indicatorClassName
          ),
        }),
        normalizedOptions.map((opt, index) => {
          const isSelected = opt.value === selectedValue;
          return React.createElement(
            'button',
            {
              key: opt.value,
              ref: (el: HTMLButtonElement | null) => {
                optionRefs.current[index] = el;
              },
              type: 'button',
              role: 'radio',
              'aria-checked': isSelected,
              'aria-disabled': opt.disabled,
              disabled: opt.disabled || disabled,
              onClick: () => handleSelect(opt),
              onMouseEnter: () => !opt.disabled && setHoveredIndex(index),
              onMouseLeave: () => setHoveredIndex(null),
              className: cn(
                'relative z-10 flex items-center justify-center gap-1.5 font-mono font-medium rounded-lg transition-colors duration-150',
                sizeClasses.inline,
                isSelected ? 'text-white' : 'text-zinc-400 hover:text-white',
                opt.disabled && 'opacity-40 cursor-not-allowed',
                optionClassName
              ),
            },
            opt.icon
              ? React.createElement('span', { className: 'shrink-0' }, opt.icon)
              : null,
            React.createElement('span', null, opt.label),
            opt.tag
              ? React.createElement(
                  'span',
                  {
                    className:
                      'text-[9px] uppercase px-1 py-0.5 rounded bg-white/10 text-zinc-300 border border-white/10',
                  },
                  opt.tag
                )
              : null
          );
        })
      );
    }

    // RENDER: DROPDOWN SELECT COMBOBOX MODE
    return React.createElement(
      'div',
      {
        ref: setContainerRef,
        style,
        className: cn('relative inline-block w-full min-w-[120px] select-none', className),
      },
      name
        ? React.createElement('input', {
            type: 'hidden',
            name,
            value: selectedValue,
          })
        : null,
      // Combobox Trigger Button
      React.createElement(
        'button',
        {
          ref: buttonRef,
          id,
          type: 'button',
          role: 'combobox',
          'aria-expanded': isOpen,
          'aria-haspopup': 'listbox',
          'aria-controls': listboxId,
          'aria-label': effectiveAriaLabel,
          'aria-activedescendant':
            isOpen && activeIndex >= 0 && normalizedOptions[activeIndex]
              ? `${id}-opt-${normalizedOptions[activeIndex].value}`
              : undefined,
          disabled,
          onClick: () => !disabled && setOpen(!isOpen),
          onKeyDown: handleKeyDown,
          style: {
            backgroundColor: surfaceColor,
            color: textColor,
          },
          className: cn(
            'relative flex items-center justify-between gap-2 w-full font-medium rounded-xl',
            'border border-white/10 hover:border-white/20 transition-all duration-200 shadow-sm',
            'focus:outline-none focus:ring-1 focus:ring-white/30',
            sizeClasses.trigger,
            disabled && 'opacity-50 cursor-not-allowed',
            buttonClassName
          ),
        },
        React.createElement(
          'span',
          { className: 'flex items-center gap-2 truncate' },
          selectedOption?.icon
            ? React.createElement('span', { className: 'shrink-0' }, selectedOption.icon)
            : null,
          React.createElement(
            'span',
            { className: 'truncate' },
            selectedOption ? selectedOption.label : placeholder
          )
        ),
        React.createElement(ChevronDown, {
          'data-testid': 'glide-chevron-down',
          className: cn(
            'w-4 h-4 shrink-0 transition-transform duration-200 text-zinc-400',
            isOpen && 'rotate-180 text-white'
          ),
        } as any)
      ),
      // Dropdown Listbox Menu
      isOpen
        ? React.createElement(
            'div',
            {
              ref: menuRef,
              id: listboxId,
              role: 'listbox',
              'aria-label': effectiveAriaLabel,
              tabIndex: -1,
              style: {
                backgroundColor: surfaceColor,
                color: textColor,
              },
              className: cn(
                'absolute z-50 left-0 right-0 mt-1.5 p-1 rounded-xl border border-white/10 shadow-2xl backdrop-blur-md',
                'overflow-hidden flex flex-col',
                menuClassName
              ),
            },
            // Sliding backdrop indicator
            React.createElement('div', {
              'data-testid': 'glide-indicator',
              'aria-hidden': 'true',
              style: {
                ...indicatorStyle,
                backgroundColor: highlightColor,
              },
              className: cn(
                'absolute rounded-lg transition-all duration-200 ease-out pointer-events-none border border-white/5',
                indicatorClassName
              ),
            }),
            normalizedOptions.map((opt, index) => {
              const isSelected = opt.value === selectedValue;

              return React.createElement(
                'button',
                {
                  key: opt.value,
                  ref: (el: HTMLButtonElement | null) => {
                    optionRefs.current[index] = el;
                  },
                  id: `${id}-opt-${opt.value}`,
                  role: 'option',
                  'aria-selected': isSelected,
                  'aria-disabled': opt.disabled,
                  type: 'button',
                  disabled: opt.disabled,
                  onClick: () => handleSelect(opt),
                  onMouseEnter: () => !opt.disabled && setHoveredIndex(index),
                  onMouseLeave: () => setHoveredIndex(null),
                  className: cn(
                    'relative z-10 flex items-center justify-between w-full font-medium rounded-lg text-left transition-colors duration-150',
                    sizeClasses.item,
                    isSelected ? 'text-white' : 'text-zinc-300 hover:text-white',
                    opt.disabled && 'opacity-40 cursor-not-allowed',
                    optionClassName
                  ),
                },
                React.createElement(
                  'span',
                  { className: 'flex items-center gap-2 truncate' },
                  opt.icon
                    ? React.createElement('span', { className: 'shrink-0' }, opt.icon)
                    : null,
                  React.createElement('span', { className: 'truncate' }, opt.label),
                  opt.tag
                    ? React.createElement(
                        'span',
                        {
                          className:
                            'text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-white/10 text-zinc-300 border border-white/10',
                        },
                        opt.tag
                      )
                    : null
                ),
                isSelected
                  ? React.createElement(Check, {
                      'data-testid': 'glide-check-icon',
                      className: 'w-4 h-4 shrink-0 ml-2',
                      style: { color: accentColor },
                    } as any)
                  : null
              );
            })
          )
        : null
    );
  }
);

GlideSelect.displayName = 'GlideSelect';
export default GlideSelect;
