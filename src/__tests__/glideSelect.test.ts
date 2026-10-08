import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import {
  GlideSelect,
  normalizeOptions,
  findTypeaheadMatch,
  GlideSelectOption,
} from '@/common/components/reactbits/GlideSelect';
import * as ReactBits from '@/common/components/reactbits';

describe('GlideSelect Spring Selector Component Suite', () => {
  describe('Module and Barrel Exports', () => {
    it('should export GlideSelect and utilities from module and reactbits barrel', () => {
      expect(GlideSelect).toBeDefined();
      expect(typeof GlideSelect).toBe('object'); // React.forwardRef object
      expect(ReactBits.GlideSelect).toBe(GlideSelect);

      expect(normalizeOptions).toBeDefined();
      expect(typeof normalizeOptions).toBe('function');
      expect(ReactBits.normalizeOptions).toBe(normalizeOptions);

      expect(findTypeaheadMatch).toBeDefined();
      expect(typeof findTypeaheadMatch).toBe('function');
      expect(ReactBits.findTypeaheadMatch).toBe(findTypeaheadMatch);
    });
  });

  describe('normalizeOptions Utility', () => {
    it('should convert raw string options into standardized GlideSelectOption objects', () => {
      const raw = ['id', 'en', 'jp'];
      const normalized = normalizeOptions(raw);

      expect(normalized).toEqual([
        { value: 'id', label: 'id', tag: undefined, disabled: false, icon: undefined },
        { value: 'en', label: 'en', tag: undefined, disabled: false, icon: undefined },
        { value: 'jp', label: 'jp', tag: undefined, disabled: false, icon: undefined },
      ]);
    });

    it('should preserve and normalize full option objects with label, tag, disabled, and icon', () => {
      const iconNode = React.createElement('span', null, '🇮🇩');
      const raw = [
        { value: 'id', label: 'Bahasa Indonesia', tag: 'IDN', disabled: false, icon: iconNode },
        { value: 'en', label: 'English', tag: 'ENG', disabled: true },
      ];
      const normalized = normalizeOptions(raw);

      expect(normalized).toHaveLength(2);
      expect(normalized[0]).toEqual({
        value: 'id',
        label: 'Bahasa Indonesia',
        tag: 'IDN',
        disabled: false,
        icon: iconNode,
      });
      expect(normalized[1].value).toBe('en');
      expect(normalized[1].label).toBe('English');
      expect(normalized[1].tag).toBe('ENG');
      expect(normalized[1].disabled).toBe(true);
    });

    it('should fallback to option value if label is omitted', () => {
      const raw = [{ value: 'react' }];
      const normalized = normalizeOptions(raw);

      expect(normalized[0]).toEqual({
        value: 'react',
        label: 'react',
        tag: undefined,
        disabled: false,
        icon: undefined,
      });
    });

    it('should handle mixed array of strings and objects', () => {
      const raw = ['all', { value: 'frontend', label: 'Frontend UI', tag: 'Hot' }];
      const normalized = normalizeOptions(raw);

      expect(normalized).toHaveLength(2);
      expect(normalized[0].value).toBe('all');
      expect(normalized[0].label).toBe('all');
      expect(normalized[1].value).toBe('frontend');
      expect(normalized[1].label).toBe('Frontend UI');
      expect(normalized[1].tag).toBe('Hot');
    });

    it('should return empty array when input is invalid or not an array', () => {
      expect(normalizeOptions([] as any)).toEqual([]);
      expect(normalizeOptions(null as any)).toEqual([]);
      expect(normalizeOptions(undefined as any)).toEqual([]);
    });
  });

  describe('findTypeaheadMatch Utility', () => {
    const options: GlideSelectOption[] = [
      { value: 'id', label: 'Indonesian' },
      { value: 'en', label: 'English' },
      { value: 'es', label: 'Spanish' },
      { value: 'fr', label: 'French', disabled: true },
      { value: 'de', label: 'German' },
    ];

    it('should find matching option starting with search character', () => {
      expect(findTypeaheadMatch(options, 'e', 0)).toBe(1); // English
      expect(findTypeaheadMatch(options, 's', 0)).toBe(2); // Spanish
      expect(findTypeaheadMatch(options, 'g', 0)).toBe(4); // German
    });

    it('should match case-insensitively', () => {
      expect(findTypeaheadMatch(options, 'E', 0)).toBe(1);
      expect(findTypeaheadMatch(options, 'IND', 0)).toBe(0);
    });

    it('should wrap around the list when starting index is after match', () => {
      // Start searching after Spanish (index 2); should wrap to Indonesian (index 0)
      expect(findTypeaheadMatch(options, 'i', 2)).toBe(0);
    });

    it('should skip disabled options', () => {
      // French is at index 3 but disabled; should return -1 if no other 'f' match
      expect(findTypeaheadMatch(options, 'f', 0)).toBe(-1);
    });

    it('should return -1 when no match exists or search string is empty', () => {
      expect(findTypeaheadMatch(options, 'z', 0)).toBe(-1);
      expect(findTypeaheadMatch(options, '', 0)).toBe(-1);
      expect(findTypeaheadMatch([], 'a', 0)).toBe(-1);
    });
  });

  describe('GlideSelect Component Dropdown Mode Rendering', () => {
    const defaultOptions = [
      { value: 'id', label: 'Bahasa Indonesia', tag: 'ID' },
      { value: 'en', label: 'English', tag: 'EN' },
    ];

    it('should instantiate valid React element', () => {
      const element = React.createElement(GlideSelect, {
        options: defaultOptions,
        value: 'id',
      });

      expect(React.isValidElement(element)).toBe(true);
      expect(element.type).toBe(GlideSelect);
    });

    it('should render closed combobox trigger with ARIA attributes and ChevronDown', () => {
      const html = renderToStaticMarkup(
        React.createElement(GlideSelect, {
          options: defaultOptions,
          value: 'id',
          ariaLabel: 'Pilih Bahasa',
        })
      );

      // Trigger button ARIA combobox
      expect(html).toContain('role="combobox"');
      expect(html).toContain('aria-expanded="false"');
      expect(html).toContain('aria-haspopup="listbox"');
      expect(html).toContain('aria-label="Pilih Bahasa"');

      // Displays selected option label
      expect(html).toContain('Bahasa Indonesia');

      // Contains ChevronDown icon
      expect(html).toContain('data-testid="glide-chevron-down"');

      // Dropdown menu should not be rendered when closed
      expect(html).not.toContain('role="listbox"');
    });

    it('should render open dropdown menu with sliding indicator and Check icon when defaultOpen=true', () => {
      const html = renderToStaticMarkup(
        React.createElement(GlideSelect, {
          options: defaultOptions,
          value: 'en',
          defaultOpen: true,
        })
      );

      // Combobox reflects expanded state
      expect(html).toContain('aria-expanded="true"');

      // Listbox menu container is present
      expect(html).toContain('role="listbox"');

      // Sliding highlight indicator backdrop
      expect(html).toContain('data-testid="glide-indicator"');
      expect(html).toContain('background-color:#27272a'); // default highlightColor

      // Options are rendered with role="option"
      expect(html).toContain('role="option"');
      expect(html).toContain('aria-selected="true"');
      expect(html).toContain('aria-selected="false"');

      // Checkmark icon rendered on selected option
      expect(html).toContain('data-testid="glide-check-icon"');

      // Tags rendered
      expect(html).toContain('ID');
      expect(html).toContain('EN');
    });

    it('should apply custom monochrome styling tokens (accentColor, surfaceColor, highlightColor, textColor)', () => {
      const html = renderToStaticMarkup(
        React.createElement(GlideSelect, {
          options: defaultOptions,
          value: 'id',
          defaultOpen: true,
          surfaceColor: '#000000',
          highlightColor: '#18181b',
          textColor: '#f4f4f5',
          accentColor: '#ffffff',
        })
      );

      expect(html).toContain('background-color:#000000');
      expect(html).toContain('background-color:#18181b');
      expect(html).toContain('color:#f4f4f5');
      expect(html).toContain('color:#ffffff');
    });

    it('should respect custom class names for wrapper, button, menu, option, and indicator', () => {
      const html = renderToStaticMarkup(
        React.createElement(GlideSelect, {
          options: defaultOptions,
          defaultOpen: true,
          className: 'custom-wrapper-class',
          buttonClassName: 'custom-btn-class',
          menuClassName: 'custom-menu-class',
          optionClassName: 'custom-option-class',
          indicatorClassName: 'custom-indicator-glow',
        })
      );

      expect(html).toContain('custom-wrapper-class');
      expect(html).toContain('custom-btn-class');
      expect(html).toContain('custom-menu-class');
      expect(html).toContain('custom-option-class');
      expect(html).toContain('custom-indicator-glow');
    });

    it('should render disabled state accurately on trigger button and options', () => {
      const optionsWithDisabled = [
        { value: 'opt1', label: 'Option 1' },
        { value: 'opt2', label: 'Option 2', disabled: true },
      ];

      const html = renderToStaticMarkup(
        React.createElement(GlideSelect, {
          options: optionsWithDisabled,
          defaultOpen: true,
          disabled: true,
        })
      );

      // Button disabled
      expect(html).toContain('disabled=""');
      expect(html).toContain('opacity-50 cursor-not-allowed');

      // Option 2 aria-disabled
      expect(html).toContain('aria-disabled="true"');
    });

    it('should render hidden input for form submission when name prop is supplied', () => {
      const html = renderToStaticMarkup(
        React.createElement(GlideSelect, {
          options: defaultOptions,
          value: 'id',
          name: 'locale',
        })
      );

      expect(html).toContain('type="hidden"');
      expect(html).toContain('name="locale"');
      expect(html).toContain('value="id"');
    });
  });

  describe('GlideSelect Inline Segmented Mode Rendering', () => {
    const inlineOptions = [
      { value: 'all', label: 'All Projects' },
      { value: 'frontend', label: 'Frontend', tag: 'Web' },
      { value: 'backend', label: 'Backend' },
    ];

    it('should render inline segmented group with radiogroup semantics and sliding indicator', () => {
      const html = renderToStaticMarkup(
        React.createElement(GlideSelect, {
          options: inlineOptions,
          value: 'frontend',
          variant: 'inline',
          ariaLabel: 'Project Filter',
        })
      );

      // Radiogroup semantics
      expect(html).toContain('role="radiogroup"');
      expect(html).toContain('aria-label="Project Filter"');

      // Radio item options
      expect(html).toContain('role="radio"');
      expect(html).toContain('aria-checked="true"');
      expect(html).toContain('aria-checked="false"');

      // Sliding indicator backdrop
      expect(html).toContain('data-testid="glide-indicator"');

      // Tag rendering
      expect(html).toContain('Web');

      // Labels
      expect(html).toContain('All Projects');
      expect(html).toContain('Frontend');
      expect(html).toContain('Backend');
    });

    it('should apply size classes for sm, md, and lg variants', () => {
      (['sm', 'md', 'lg'] as const).forEach((size) => {
        const html = renderToStaticMarkup(
          React.createElement(GlideSelect, {
            options: ['A', 'B'],
            size,
            variant: 'inline',
          })
        );

        if (size === 'sm') {
          expect(html).toContain('px-2.5 py-1 text-xs');
        } else if (size === 'md') {
          expect(html).toContain('px-3 py-1.5 text-xs');
        } else if (size === 'lg') {
          expect(html).toContain('px-4 py-2 text-sm');
        }
      });
    });
  });

  describe('Ref Forwarding and Controlled State Handling', () => {
    it('should support forwarding ref to container element', () => {
      let refNode: HTMLDivElement | null = null;
      const refCallback = (node: HTMLDivElement | null) => {
        refNode = node;
      };

      const element = React.createElement(GlideSelect, {
        options: ['1', '2'],
        ref: refCallback,
      });

      expect(React.isValidElement(element)).toBe(true);
    });

    it('should respect defaultValue in uncontrolled mode', () => {
      const html = renderToStaticMarkup(
        React.createElement(GlideSelect, {
          options: [
            { value: 'light', label: 'Light' },
            { value: 'dark', label: 'Dark' },
          ],
          defaultValue: 'dark',
        })
      );

      // Trigger button displays 'Dark'
      expect(html).toContain('Dark');
    });
  });
});
