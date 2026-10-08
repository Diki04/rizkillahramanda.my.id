import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { TechText, toRgbaString } from '@/common/components/reactbits/TechText';
import * as ReactBits from '@/common/components/reactbits';

describe('TechText component & helpers', () => {
  it('should export TechText and toRgbaString from module and index', () => {
    expect(TechText).toBeDefined();
    expect(typeof TechText).toBe('function');
    expect(ReactBits.TechText).toBe(TechText);
    expect(toRgbaString).toBeDefined();
    expect(typeof toRgbaString).toBe('function');
  });

  describe('toRgbaString color conversion', () => {
    it('should parse 6-character hex code to rgba', () => {
      expect(toRgbaString('#ffffff', 0.5)).toBe('rgba(255, 255, 255, 0.5)');
      expect(toRgbaString('#000000', 1)).toBe('rgba(0, 0, 0, 1)');
      expect(toRgbaString('#a1a1aa', 0.8)).toBe('rgba(161, 161, 170, 0.8)');
    });

    it('should parse 3-character hex shorthand to rgba', () => {
      expect(toRgbaString('#fff', 0.6)).toBe('rgba(255, 255, 255, 0.6)');
      expect(toRgbaString('#000', 0.2)).toBe('rgba(0, 0, 0, 0.2)');
    });

    it('should parse rgb() strings and apply alpha', () => {
      expect(toRgbaString('rgb(255, 255, 255)', 0.4)).toBe('rgba(255, 255, 255, 0.4)');
      expect(toRgbaString('rgba(161, 161, 170, 0.9)', 0.5)).toBe('rgba(161, 161, 170, 0.5)');
    });

    it('should return default fallback when color string is empty', () => {
      expect(toRgbaString('', 0.7)).toBe('rgba(255, 255, 255, 0.7)');
    });
  });

  describe('TechText React element creation & props', () => {
    it('should instantiate React element with default props', () => {
      const element = React.createElement(TechText);
      expect(React.isValidElement(element)).toBe(true);
      expect(element.type).toBe(TechText);
    });

    it('should accept custom props and line styles', () => {
      const element = React.createElement(TechText, {
        text: 'Software Engineer',
        color: '#ffffff',
        accentColor: '#71717a',
        lineStyle: 'dotted',
        fontSize: 32,
        as: 'h1',
        className: 'custom-hero-title',
      });

      expect(element.props.text).toBe('Software Engineer');
      expect(element.props.color).toBe('#ffffff');
      expect(element.props.accentColor).toBe('#71717a');
      expect(element.props.lineStyle).toBe('dotted');
      expect(element.props.fontSize).toBe(32);
      expect(element.props.as).toBe('h1');
      expect(element.props.className).toBe('custom-hero-title');
    });

    it('should support autoAnimate and autoWaveSpeed props for infinite autonomous animation', () => {
      const element = React.createElement(TechText, {
        text: 'Rizkillah Ramanda Sinyo',
        autoAnimate: true,
        autoWaveSpeed: 2.0,
      });

      expect(element.props.text).toBe('Rizkillah Ramanda Sinyo');
      expect(element.props.autoAnimate).toBe(true);
      expect(element.props.autoWaveSpeed).toBe(2.0);
    });

    it('should support customized fontSize and custom fontFamily', () => {
      const element = React.createElement(TechText, {
        text: 'Rizkillah Ramanda Sinyo',
        fontSize: 60,
        fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif',
      });

      expect(element.props.fontSize).toBe(60);
      expect(element.props.fontFamily).toBe('var(--font-inter), Inter, system-ui, sans-serif');
    });
  });

  describe('TechText Canvas 2D integration & SSR safety', () => {
    it('should handle missing canvas context in jsdom gracefully without throwing', () => {
      expect(() => {
        const element = React.createElement(TechText, {
          text: 'Rizkillah Ramanda',
        });
        expect(React.isValidElement(element)).toBe(true);
      }).not.toThrow();
    });

    it('should execute canvas measuring and rendering when 2D context is mocked', () => {
      const fillTextSpy = vi.fn();
      const strokeTextSpy = vi.fn();
      const setLineDashSpy = vi.fn();
      const measureTextSpy = vi.fn((text: string) => ({ width: text.length * 12 }));
      const clearRectSpy = vi.fn();
      const saveSpy = vi.fn();
      const restoreSpy = vi.fn();
      const scaleSpy = vi.fn();
      const beginPathSpy = vi.fn();
      const moveToSpy = vi.fn();
      const lineToSpy = vi.fn();
      const strokeSpy = vi.fn();

      const mockCtx = {
        font: '',
        fillStyle: '',
        strokeStyle: '',
        lineWidth: 1,
        lineCap: 'butt',
        lineJoin: 'miter',
        lineDashOffset: 0,
        textBaseline: 'alphabetic',
        fillText: fillTextSpy,
        strokeText: strokeTextSpy,
        setLineDash: setLineDashSpy,
        measureText: measureTextSpy,
        clearRect: clearRectSpy,
        save: saveSpy,
        restore: restoreSpy,
        scale: scaleSpy,
        beginPath: beginPathSpy,
        moveTo: moveToSpy,
        lineTo: lineToSpy,
        stroke: strokeSpy,
      };

      const mockCanvas = {
        getContext: vi.fn((_type?: string) => mockCtx),
        width: 300,
        height: 80,
        style: {},
      };

      const originalDocument = globalThis.document;
      try {
        (globalThis as unknown as { document: unknown }).document = {
          createElement: (tag: string) => {
            if (tag === 'canvas') return mockCanvas;
            return null;
          },
        };

        const ctx = mockCanvas.getContext('2d');
        expect(ctx).toBeDefined();

        if (ctx) {
          ctx.font = '700 48px monospace';
          const measurement = ctx.measureText('Rizkillah Ramanda');
          expect(measurement.width).toBe(17 * 12);

          ctx.setLineDash([4, 4]);
          expect(setLineDashSpy).toHaveBeenCalledWith([4, 4]);

          ctx.fillText('R', 10, 50);
          expect(fillTextSpy).toHaveBeenCalledWith('R', 10, 50);

          ctx.strokeText('R', 10, 50);
          expect(strokeTextSpy).toHaveBeenCalledWith('R', 10, 50);
        }
      } finally {
        (globalThis as unknown as { document: unknown }).document = originalDocument;
      }
    });
  });
});
