import { describe, it, expect } from 'vitest';
import React from 'react';
import { MicroSlats, SWELL_PRESETS, parseColor } from '@/common/components/reactbits/MicroSlats';
import * as ReactBits from '@/common/components/reactbits';

describe('MicroSlats component & presets', () => {
  it('should export MicroSlats component correctly from module and index', () => {
    expect(MicroSlats).toBeDefined();
    expect(typeof MicroSlats).toBe('function');
    expect(ReactBits.MicroSlats).toBe(MicroSlats);
    expect(ReactBits.default).toBe(MicroSlats);
  });

  it('should provide the 4 defined swell presets with valid wave properties', () => {
    const presetNames: (keyof typeof SWELL_PRESETS)[] = ['swell', 'tide', 'storm', 'signal'];
    expect(Object.keys(SWELL_PRESETS)).toEqual(expect.arrayContaining(presetNames));

    presetNames.forEach((preset) => {
      const values = SWELL_PRESETS[preset];
      expect(Number.isFinite(values.scale)).toBe(true);
      expect(Number.isFinite(values.speed)).toBe(true);
      expect(Number.isFinite(values.direction)).toBe(true);
      expect(Number.isFinite(values.chop)).toBe(true);
      expect(Number.isFinite(values.stretch)).toBe(true);
      expect(Number.isFinite(values.glint)).toBe(true);
      expect(Number.isFinite(values.contrast)).toBe(true);
      expect(Number.isFinite(values.perspective)).toBe(true);
      expect(Number.isFinite(values.fog)).toBe(true);
      expect(values.scale).toBeGreaterThan(0);
      expect(values.speed).toBeGreaterThan(0);
    });
  });

  it('should calibrate the default preset (swell) with high contrast and smooth glint', () => {
    const swell = SWELL_PRESETS.swell;
    expect(swell.scale).toBe(1.5);
    expect(swell.speed).toBe(0.6);
    expect(swell.direction).toBe(250);
    expect(swell.chop).toBe(0.55);
    expect(swell.contrast).toBe(1.25);
    expect(swell.glint).toBe(0.7);
  });

  it('should safely parse colors and fallback when document is unavailable in Node/SSR', () => {
    const fallback: [number, number, number, number] = [0.322, 0.322, 0.357, 1];
    const result = parseColor('#52525b', fallback);
    expect(result).toEqual(fallback);
  });

  it('should safely parse colors when DOM canvas context is mocked', () => {
    const fallback: [number, number, number, number] = [0, 0, 0, 1];
    const originalDocument = globalThis.document;

    try {
      (globalThis as unknown as { document: unknown }).document = {
        createElement: (tag: string) => {
          if (tag === 'canvas') {
            return {
              getContext: () => ({
                fillStyle: '',
              }),
            };
          }
          return null;
        },
      };

      const parsed = parseColor('#ffffff', fallback);
      expect(parsed).toEqual([1, 1, 1, 1]);
    } finally {
      (globalThis as unknown as { document: unknown }).document = originalDocument;
    }
  });

  it('should instantiate React element with pure OLED monochrome default props', () => {
    const element = React.createElement(MicroSlats, {
      className: 'fixed inset-0 pointer-events-none -z-10',
      backgroundColor: '#000000',
      color: '#52525b',
      glintColor: '#ffffff',
    });

    expect(React.isValidElement(element)).toBe(true);
    expect(element.type).toBe(MicroSlats);
    expect(element.props.backgroundColor).toBe('#000000');
    expect(element.props.color).toBe('#52525b');
    expect(element.props.glintColor).toBe('#ffffff');
    expect(element.props.className).toContain('pointer-events-none');
  });
});
