import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import {
  SpecularButton,
  parseColorToVec3,
} from '@/common/components/reactbits/SpecularButton';
import * as ReactBits from '@/common/components/reactbits';

describe('SpecularButton component & WebGL shader button', () => {
  describe('Module and index exports', () => {
    it('should export SpecularButton and parseColorToVec3 from module and index barrel', () => {
      expect(SpecularButton).toBeDefined();
      expect(ReactBits.SpecularButton).toBe(SpecularButton);
      expect(parseColorToVec3).toBeDefined();
      expect(typeof parseColorToVec3).toBe('function');
      expect(ReactBits.parseColorToVec3).toBe(parseColorToVec3);
    });
  });

  describe('parseColorToVec3 color utility', () => {
    it('should parse 6-character hex colors to normalized [r, g, b] floats', () => {
      const white = parseColorToVec3('#ffffff');
      expect(white).toEqual([1, 1, 1]);

      const black = parseColorToVec3('#000000');
      expect(black).toEqual([0, 0, 0]);

      const zinc = parseColorToVec3('#52525b');
      expect(zinc[0]).toBeCloseTo(0.3215, 3);
      expect(zinc[1]).toBeCloseTo(0.3215, 3);
      expect(zinc[2]).toBeCloseTo(0.3568, 3);
    });

    it('should parse 3-character hex shorthand colors', () => {
      const white = parseColorToVec3('#fff');
      expect(white).toEqual([1, 1, 1]);

      const black = parseColorToVec3('#000');
      expect(black).toEqual([0, 0, 0]);
    });

    it('should parse rgb() format color strings', () => {
      const rgb = parseColorToVec3('rgb(255, 255, 255)');
      expect(rgb).toEqual([1, 1, 1]);

      const customRgb = parseColorToVec3('rgb(0, 0, 0)');
      expect(customRgb).toEqual([0, 0, 0]);
    });

    it('should return the provided fallback when color is undefined or invalid', () => {
      const fallback: [number, number, number] = [0.2, 0.4, 0.6];
      expect(parseColorToVec3(undefined, fallback)).toEqual(fallback);
      expect(parseColorToVec3('', fallback)).toEqual(fallback);
      expect(parseColorToVec3('invalid-color-string', fallback)).toEqual(fallback);
    });
  });

  describe('SpecularButton React element & prop handling', () => {
    it('should instantiate React element with pure OLED monochrome default props', () => {
      const element = React.createElement(
        SpecularButton,
        {
          lineColor: '#ffffff',
          baseColor: '#52525b',
          textColor: '#ffffff',
          radius: 14,
        },
        'Explore Projects'
      );

      expect(React.isValidElement(element)).toBe(true);
      expect(element.type).toBe(SpecularButton);
      expect(element.props.children).toBe('Explore Projects');
      expect(element.props.lineColor).toBe('#ffffff');
      expect(element.props.baseColor).toBe('#52525b');
      expect(element.props.textColor).toBe('#ffffff');
      expect(element.props.radius).toBe(14);
    });

    it('should support button sizes sm, md, and lg', () => {
      (['sm', 'md', 'lg'] as const).forEach((size) => {
        const element = React.createElement(
          SpecularButton,
          { size },
          `Button ${size}`
        );
        expect(element.props.size).toBe(size);
        expect(element.props.children).toBe(`Button ${size}`);
      });
    });

    it('should accept native HTML button attributes: type, disabled, onClick', () => {
      const handleClick = vi.fn();
      const element = React.createElement(
        SpecularButton,
        {
          type: 'submit',
          disabled: true,
          onClick: handleClick,
          className: 'custom-specular-cta',
          'aria-label': 'Submit contact message',
        },
        'Submit'
      );

      expect(element.props.type).toBe('submit');
      expect(element.props.disabled).toBe(true);
      expect(element.props.onClick).toBe(handleClick);
      expect(element.props.className).toBe('custom-specular-cta');
      expect(element.props['aria-label']).toBe('Submit contact message');
    });

    it('should support custom shader configuration props (borderWidth, proximity, intensity, gloss)', () => {
      const element = React.createElement(
        SpecularButton,
        {
          borderWidth: 2.0,
          proximity: 300,
          intensity: 2.5,
          gloss: 32.0,
          baseColor: '#3f3f46',
          lineColor: '#ffffff',
        },
        'Specular Action'
      );

      expect(element.props.borderWidth).toBe(2.0);
      expect(element.props.proximity).toBe(300);
      expect(element.props.intensity).toBe(2.5);
      expect(element.props.gloss).toBe(32.0);
      expect(element.props.baseColor).toBe('#3f3f46');
    });
  });

  describe('SSR and headless/non-WebGL environment resilience', () => {
    it('should render safely without throwing when window/document are absent or WebGL is unsupported', () => {
      expect(() => {
        const element = React.createElement(
          SpecularButton,
          {
            size: 'md',
            radius: 14,
            lineColor: '#ffffff',
            baseColor: '#52525b',
          },
          'Safe Button'
        );
        expect(React.isValidElement(element)).toBe(true);
      }).not.toThrow();
    });

    it('should handle unmounted and non-WebGL environments gracefully', () => {
      const originalWindow = globalThis.window;
      try {
        // Simulating node environment where window is undefined
        (globalThis as unknown as { window: unknown }).window = undefined;
        expect(() => {
          const el = React.createElement(SpecularButton, null, 'Click');
          expect(React.isValidElement(el)).toBe(true);
        }).not.toThrow();
      } finally {
        (globalThis as unknown as { window: unknown }).window = originalWindow;
      }
    });
  });
});
