import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import {
  SpotlightCard as ReactBitsSpotlightCard,
  calculateSpotlightOffset,
} from '@/common/components/reactbits/SpotlightCard';
import * as ReactBits from '@/common/components/reactbits';
import { SpotlightCard as LegacySpotlightCard } from '@/common/components/SpotlightCard';

describe('SpotlightCard Monochrome Component Suite', () => {
  describe('Module and barrel exports', () => {
    it('should export ReactBits SpotlightCard and calculateSpotlightOffset from module and index barrel', () => {
      expect(ReactBitsSpotlightCard).toBeDefined();
      expect(typeof ReactBitsSpotlightCard).toBe('object'); // React.forwardRef object
      expect(ReactBits.SpotlightCard).toBe(ReactBitsSpotlightCard);

      expect(calculateSpotlightOffset).toBeDefined();
      expect(typeof calculateSpotlightOffset).toBe('function');
      expect(ReactBits.calculateSpotlightOffset).toBe(calculateSpotlightOffset);
    });

    it('should export legacy adapter SpotlightCard from common components', () => {
      expect(LegacySpotlightCard).toBeDefined();
      expect(typeof LegacySpotlightCard).toBe('function');
    });
  });

  describe('calculateSpotlightOffset coordinate calculator', () => {
    it('should accurately calculate local offset relative to bounding rect', () => {
      const rect = { left: 100, top: 150 };
      const coords = calculateSpotlightOffset(250, 300, rect);
      expect(coords).toEqual({ x: 150, y: 150 });
    });

    it('should handle zero offsets when client coordinates match rect origin', () => {
      const rect = { left: 40, top: 80 };
      const coords = calculateSpotlightOffset(40, 80, rect);
      expect(coords).toEqual({ x: 0, y: 0 });
    });

    it('should correctly handle negative offsets when pointer is outside left/top boundaries', () => {
      const rect = { left: 50, top: 50 };
      const coords = calculateSpotlightOffset(20, 10, rect);
      expect(coords).toEqual({ x: -30, y: -40 });
    });
  });

  describe('ReactBits SpotlightCard component', () => {
    it('should instantiate valid React element with children and default props', () => {
      const element = React.createElement(
        ReactBitsSpotlightCard,
        null,
        React.createElement('span', null, 'Monochrome Card')
      );

      expect(React.isValidElement(element)).toBe(true);
      expect(element.type).toBe(ReactBitsSpotlightCard);
      expect(element.props.children).toBeDefined();
    });

    it('should render HTML with default monochrome styling classes via SSR', () => {
      const html = renderToStaticMarkup(
        React.createElement(
          ReactBitsSpotlightCard,
          { id: 'featured-card' },
          'Card Content'
        )
      );

      expect(html).toContain('id="featured-card"');
      expect(html).toContain('Card Content');
      expect(html).toContain('relative');
      expect(html).toContain('rounded-3xl');
      expect(html).toContain('border');
      expect(html).toContain('border-white/10');
      expect(html).toContain('bg-zinc-950/80');
      expect(html).toContain('overflow-hidden');
      expect(html).toContain('p-6');
      expect(html).toContain('md:p-8');
      expect(html).toContain('rgba(255, 255, 255, 0.15)');
    });

    it('should merge custom className with default classes', () => {
      const html = renderToStaticMarkup(
        React.createElement(
          ReactBitsSpotlightCard,
          { className: 'custom-bento-glow col-span-2' },
          'Bento Item'
        )
      );

      expect(html).toContain('custom-bento-glow');
      expect(html).toContain('col-span-2');
      expect(html).toContain('rounded-3xl');
      expect(html).toContain('bg-zinc-950/80');
    });

    it('should respect custom spotlightColor prop in radial gradient', () => {
      const customColor = 'rgba(255, 255, 255, 0.4)';
      const html = renderToStaticMarkup(
        React.createElement(
          ReactBitsSpotlightCard,
          { spotlightColor: customColor },
          'High Intensity Spotlight'
        )
      );

      expect(html).toContain(customColor);
      expect(html).toContain('radial-gradient');
    });

    it('should forward standard HTML div attributes', () => {
      const html = renderToStaticMarkup(
        React.createElement(
          ReactBitsSpotlightCard,
          {
            'data-testid': 'spotlight-wrapper',
            'aria-label': 'Featured engineering highlight',
            tabIndex: 0,
            role: 'article',
          },
          'Accessible Card'
        )
      );

      expect(html).toContain('data-testid="spotlight-wrapper"');
      expect(html).toContain('aria-label="Featured engineering highlight"');
      expect(html).toContain('tabindex="0"');
      expect(html).toContain('role="article"');
    });

    it('should support ref forwarding to DOM element', () => {
      let capturedNode: HTMLDivElement | null = null;
      const refCallback = (node: HTMLDivElement | null) => {
        capturedNode = node;
      };

      const element = React.createElement(
        ReactBitsSpotlightCard,
        { ref: refCallback },
        'Ref Test'
      );

      expect(React.isValidElement(element)).toBe(true);
      expect(element.props.children).toBe('Ref Test');
    });

    it('should forward interaction events (onMouseEnter, onMouseLeave, onFocus, onBlur, onMouseMove)', () => {
      const onMouseEnter = vi.fn();
      const onMouseLeave = vi.fn();
      const onFocus = vi.fn();
      const onBlur = vi.fn();
      const onMouseMove = vi.fn();

      const element = React.createElement(
        ReactBitsSpotlightCard,
        {
          onMouseEnter,
          onMouseLeave,
          onFocus,
          onBlur,
          onMouseMove,
        },
        'Interactive Card'
      );

      expect(element.props.onMouseEnter).toBe(onMouseEnter);
      expect(element.props.onMouseLeave).toBe(onMouseLeave);
      expect(element.props.onFocus).toBe(onFocus);
      expect(element.props.onBlur).toBe(onBlur);
      expect(element.props.onMouseMove).toBe(onMouseMove);
    });
  });

  describe('Legacy adapter SpotlightCard component', () => {
    it('should instantiate legacy SpotlightCard with children', () => {
      const element = React.createElement(
        LegacySpotlightCard,
        { className: 'p-4' },
        React.createElement('div', null, 'Legacy Content')
      );

      expect(React.isValidElement(element)).toBe(true);
      expect(element.props.className).toBe('p-4');
    });

    it('should render legacy adapter with monochrome dark styling and default spotlight color', () => {
      const html = renderToStaticMarkup(
        React.createElement(LegacySpotlightCard, null, 'Monochrome Adapter')
      );

      expect(html).toContain('Monochrome Adapter');
      expect(html).toContain('dark:border-white/10');
      expect(html).toContain('dark:hover:border-white/20');
      expect(html).toContain('dark:hover:shadow-white/5');
      expect(html).toContain('dark:bg-zinc-950/80');
    });

    it('should support custom className and spotlightColor in legacy adapter', () => {
      const html = renderToStaticMarkup(
        React.createElement(
          LegacySpotlightCard,
          {
            className: 'custom-card-override',
            spotlightColor: 'rgba(255, 255, 255, 0.25)',
          },
          'Custom Prop Card'
        )
      );

      expect(html).toContain('custom-card-override');
      expect(html).toContain('Custom Prop Card');
    });
  });
});
