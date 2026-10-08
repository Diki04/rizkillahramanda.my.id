import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import {
  BorderGlow,
  parseHSL,
  buildGlowVars,
  buildGradientVars,
  getCenterOfElement,
  getEdgeProximity,
  getCursorAngle,
  animateValue,
  easeOutCubic,
  easeInCubic,
  BORDER_GLOW_STYLES,
  DEFAULT_COLORS,
} from '@/common/components/reactbits/BorderGlow';
import * as ReactBits from '@/common/components/reactbits';

describe('BorderGlow Dynamic Perimeter Component Suite', () => {
  describe('Module and barrel exports', () => {
    it('should export BorderGlow and all helpers from local module', () => {
      expect(BorderGlow).toBeDefined();
      expect(typeof BorderGlow).toBe('object'); // React.forwardRef object
      expect(parseHSL).toBeDefined();
      expect(typeof parseHSL).toBe('function');
      expect(buildGlowVars).toBeDefined();
      expect(typeof buildGlowVars).toBe('function');
      expect(buildGradientVars).toBeDefined();
      expect(typeof buildGradientVars).toBe('function');
      expect(getCenterOfElement).toBeDefined();
      expect(typeof getCenterOfElement).toBe('function');
      expect(getEdgeProximity).toBeDefined();
      expect(typeof getEdgeProximity).toBe('function');
      expect(getCursorAngle).toBeDefined();
      expect(typeof getCursorAngle).toBe('function');
      expect(animateValue).toBeDefined();
      expect(typeof animateValue).toBe('function');
      expect(easeOutCubic).toBeDefined();
      expect(typeof easeOutCubic).toBe('function');
      expect(easeInCubic).toBeDefined();
      expect(typeof easeInCubic).toBe('function');
      expect(BORDER_GLOW_STYLES).toBeDefined();
      expect(typeof BORDER_GLOW_STYLES).toBe('string');
      expect(DEFAULT_COLORS).toBeDefined();
      expect(Array.isArray(DEFAULT_COLORS)).toBe(true);
    });

    it('should export BorderGlow and helpers through reactbits barrel index', () => {
      expect(ReactBits.BorderGlow).toBe(BorderGlow);
      expect(ReactBits.parseHSL).toBe(parseHSL);
      expect(ReactBits.buildGlowVars).toBe(buildGlowVars);
      expect(ReactBits.buildGradientVars).toBe(buildGradientVars);
      expect(ReactBits.getCenterOfElement).toBe(getCenterOfElement);
      expect(ReactBits.getEdgeProximity).toBe(getEdgeProximity);
      expect(ReactBits.getCursorAngle).toBe(getCursorAngle);
      expect(ReactBits.BORDER_GLOW_STYLES).toBe(BORDER_GLOW_STYLES);
      expect(ReactBits.DEFAULT_COLORS).toBe(DEFAULT_COLORS);
    });
  });

  describe('parseHSL color parser', () => {
    it('should parse monochrome shorthand "0 0% 100%" (pure white)', () => {
      const parsed = parseHSL('0 0% 100%');
      expect(parsed).toEqual({ h: 0, s: 0, l: 100 });
    });

    it('should parse monochrome shorthand "0 0% 80%" (silver grey)', () => {
      const parsed = parseHSL('0 0% 80%');
      expect(parsed).toEqual({ h: 0, s: 0, l: 80 });
    });

    it('should parse degree formatted HSL "243deg 75% 65%"', () => {
      const parsed = parseHSL('243deg 75% 65%');
      expect(parsed).toEqual({ h: 243, s: 75, l: 65 });
    });

    it('should parse standard css function "hsl(0, 0%, 100%)"', () => {
      const parsed = parseHSL('hsl(0, 0%, 100%)');
      expect(parsed).toEqual({ h: 0, s: 0, l: 100 });
    });

    it('should parse hex color code "#ffffff" to white HSL', () => {
      const parsed = parseHSL('#ffffff');
      expect(parsed).toEqual({ h: 0, s: 0, l: 100 });
    });

    it('should parse 3-digit hex color code "#fff" to white HSL', () => {
      const parsed = parseHSL('#fff');
      expect(parsed).toEqual({ h: 0, s: 0, l: 100 });
    });

    it('should parse black hex color code "#000000" to black HSL', () => {
      const parsed = parseHSL('#000000');
      expect(parsed).toEqual({ h: 0, s: 0, l: 0 });
    });

    it('should parse rgb string "rgb(255, 255, 255)" to white HSL', () => {
      const parsed = parseHSL('rgb(255, 255, 255)');
      expect(parsed).toEqual({ h: 0, s: 0, l: 100 });
    });

    it('should fallback safely to monochrome white on undefined, empty, or invalid input', () => {
      expect(parseHSL(undefined)).toEqual({ h: 0, s: 0, l: 100 });
      expect(parseHSL('')).toEqual({ h: 0, s: 0, l: 100 });
      expect(parseHSL('invalid-color')).toEqual({ h: 0, s: 0, l: 100 });
    });
  });

  describe('buildGlowVars CSS variable builder', () => {
    it('should generate all 7 glow opacity tiers with pure white defaults', () => {
      const vars = buildGlowVars('0 0% 100%', 1.0);
      expect(vars['--glow-color']).toBe('hsl(0deg 0% 100% / 100%)');
      expect(vars['--glow-color-60']).toBe('hsl(0deg 0% 100% / 60%)');
      expect(vars['--glow-color-50']).toBe('hsl(0deg 0% 100% / 50%)');
      expect(vars['--glow-color-40']).toBe('hsl(0deg 0% 100% / 40%)');
      expect(vars['--glow-color-30']).toBe('hsl(0deg 0% 100% / 30%)');
      expect(vars['--glow-color-20']).toBe('hsl(0deg 0% 100% / 20%)');
      expect(vars['--glow-color-10']).toBe('hsl(0deg 0% 100% / 10%)');
    });

    it('should scale opacity proportionally according to glowIntensity', () => {
      const vars = buildGlowVars('0 0% 100%', 0.5);
      expect(vars['--glow-color']).toBe('hsl(0deg 0% 100% / 50%)');
      expect(vars['--glow-color-60']).toBe('hsl(0deg 0% 100% / 30%)');
      expect(vars['--glow-color-50']).toBe('hsl(0deg 0% 100% / 25%)');
      expect(vars['--glow-color-40']).toBe('hsl(0deg 0% 100% / 20%)');
      expect(vars['--glow-color-10']).toBe('hsl(0deg 0% 100% / 5%)');
    });

    it('should clamp maximum opacity to 100%', () => {
      const vars = buildGlowVars('0 0% 100%', 2.0);
      expect(vars['--glow-color']).toBe('hsl(0deg 0% 100% / 100%)');
      expect(vars['--glow-color-60']).toBe('hsl(0deg 0% 100% / 100%)');
    });

    it('should format custom glow color correctly', () => {
      const vars = buildGlowVars('0 0% 80%', 1.0);
      expect(vars['--glow-color']).toBe('hsl(0deg 0% 80% / 100%)');
      expect(vars['--glow-color-60']).toBe('hsl(0deg 0% 80% / 60%)');
    });
  });

  describe('buildGradientVars CSS variable builder', () => {
    it('should construct 7 radial gradients and linear base gradient', () => {
      const palette = ['#ffffff', '#a1a1aa', '#71717a'];
      const vars = buildGradientVars(palette);

      expect(vars['--gradient-one']).toContain('radial-gradient');
      expect(vars['--gradient-two']).toContain('radial-gradient');
      expect(vars['--gradient-three']).toContain('radial-gradient');
      expect(vars['--gradient-four']).toContain('radial-gradient');
      expect(vars['--gradient-five']).toContain('radial-gradient');
      expect(vars['--gradient-six']).toContain('radial-gradient');
      expect(vars['--gradient-seven']).toContain('radial-gradient');
      expect(vars['--gradient-base']).toBe('linear-gradient(#ffffff 0 100%)');
    });

    it('should use DEFAULT_COLORS fallback if passed empty array', () => {
      const vars = buildGradientVars([]);
      expect(vars['--gradient-base']).toBe('linear-gradient(#ffffff 0 100%)');
    });
  });

  describe('Geometric & angular perimeter calculations', () => {
    it('getCenterOfElement should calculate center point of element dimensions', () => {
      const center = getCenterOfElement({ width: 300, height: 200 });
      expect(center).toEqual([150, 100]);
    });

    it('getEdgeProximity should return 0 at element center', () => {
      const proximity = getEdgeProximity(200, 200, 100, 100);
      expect(proximity).toBe(0);
    });

    it('getEdgeProximity should return 1 at perimeter edges', () => {
      const rightEdge = getEdgeProximity(200, 200, 200, 100);
      expect(rightEdge).toBe(1);

      const topEdge = getEdgeProximity(200, 200, 100, 0);
      expect(topEdge).toBe(1);

      const corner = getEdgeProximity(200, 200, 200, 200);
      expect(corner).toBe(1);
    });

    it('getEdgeProximity should clamp proximity to 1 when outside boundary', () => {
      const outside = getEdgeProximity(200, 200, 350, 400);
      expect(outside).toBe(1);
    });

    it('getEdgeProximity should return 0 for zero or negative dimensions', () => {
      expect(getEdgeProximity(0, 0, 50, 50)).toBe(0);
      expect(getEdgeProximity(-10, -10, 50, 50)).toBe(0);
    });

    it('getCursorAngle should return 0deg at element center', () => {
      const angle = getCursorAngle(200, 200, 100, 100);
      expect(angle).toBe(0);
    });

    it('getCursorAngle should return 0deg at top edge (12 o clock)', () => {
      const angle = getCursorAngle(200, 200, 100, 0);
      expect(angle).toBe(0);
    });

    it('getCursorAngle should return 90deg at right edge (3 o clock)', () => {
      const angle = getCursorAngle(200, 200, 200, 100);
      expect(angle).toBe(90);
    });

    it('getCursorAngle should return 180deg at bottom edge (6 o clock)', () => {
      const angle = getCursorAngle(200, 200, 100, 200);
      expect(angle).toBe(180);
    });

    it('getCursorAngle should return 270deg at left edge (9 o clock)', () => {
      const angle = getCursorAngle(200, 200, 0, 100);
      expect(angle).toBe(270);
    });

    it('ease functions should satisfy boundary conditions', () => {
      expect(easeOutCubic(0)).toBe(0);
      expect(easeOutCubic(1)).toBe(1);
      expect(easeInCubic(0)).toBe(0);
      expect(easeInCubic(1)).toBe(1);
    });
  });

  describe('React element instantiation and SSR rendering', () => {
    it('should instantiate valid React element with children and defaults', () => {
      const element = React.createElement(
        BorderGlow,
        null,
        React.createElement('div', null, 'Featured Project Card')
      );

      expect(React.isValidElement(element)).toBe(true);
      expect(element.type).toBe(BorderGlow);
      expect(element.props.children).toBeDefined();
    });

    it('should render HTML with default monochrome OLED styling via SSR', () => {
      const html = renderToStaticMarkup(
        React.createElement(
          BorderGlow,
          { id: 'featured-card' },
          'Card Inner Content'
        )
      );

      expect(html).toContain('id="featured-card"');
      expect(html).toContain('Card Inner Content');
      expect(html).toContain('border-glow-card');
      expect(html).toContain('border-glow-inner');
      expect(html).toContain('data-testid="border-glow-edge-light"');
      expect(html).toContain('data-testid="border-glow-inner"');
      expect(html).toContain('--card-bg:#000000');
      expect(html).toContain('--border-radius:16px');
      expect(html).toContain('--glow-color:hsl(0deg 0% 100% / 100%)');
      expect(html).toContain('.border-glow-card');
    });

    it('should merge custom className and contentClassName', () => {
      const html = renderToStaticMarkup(
        React.createElement(
          BorderGlow,
          {
            className: 'custom-card-wrapper mb-8',
            contentClassName: 'p-6 flex flex-col',
          },
          'Inner Content'
        )
      );

      expect(html).toContain('custom-card-wrapper');
      expect(html).toContain('mb-8');
      expect(html).toContain('p-6');
      expect(html).toContain('flex flex-col');
    });

    it('should add border-glow-static class when noGlow is true', () => {
      const html = renderToStaticMarkup(
        React.createElement(
          BorderGlow,
          { noGlow: true },
          'Static Card'
        )
      );

      expect(html).toContain('border-glow-static');
    });

    it('should apply custom monochrome color props and radius', () => {
      const html = renderToStaticMarkup(
        React.createElement(
          BorderGlow,
          {
            backgroundColor: '#09090b',
            borderRadius: 24,
            glowColor: '0 0% 80%',
            glowIntensity: 0.8,
            glowRadius: 60,
            coneSpread: 35,
            fillOpacity: 0.6,
          },
          'Custom Options'
        )
      );

      expect(html).toContain('--card-bg:#09090b');
      expect(html).toContain('--border-radius:24px');
      expect(html).toContain('--glow-padding:60px');
      expect(html).toContain('--cone-spread:35');
      expect(html).toContain('--fill-opacity:0.6');
      expect(html).toContain('--glow-color:hsl(0deg 0% 80% / 80%)');
    });

    it('should support string borderRadius (e.g. 1.5rem)', () => {
      const html = renderToStaticMarkup(
        React.createElement(
          BorderGlow,
          { borderRadius: '1.5rem' },
          'Rem Radius'
        )
      );

      expect(html).toContain('--border-radius:1.5rem');
    });

    it('should forward standard HTML div attributes and accessibility props', () => {
      const html = renderToStaticMarkup(
        React.createElement(
          BorderGlow,
          {
            'data-testid': 'project-perimeter-card',
            'aria-label': 'Top Featured Project',
            role: 'region',
            tabIndex: 0,
          },
          'Accessible Card'
        )
      );

      expect(html).toContain('data-testid="project-perimeter-card"');
      expect(html).toContain('aria-label="Top Featured Project"');
      expect(html).toContain('role="region"');
      expect(html).toContain('tabindex="0"');
    });

    it('should support ref forwarding with callback ref', () => {
      let nodeRef: HTMLDivElement | null = null;
      const refCallback = (node: HTMLDivElement | null) => {
        nodeRef = node;
      };

      const element = React.createElement(
        BorderGlow,
        { ref: refCallback },
        'Ref Test'
      );

      expect(React.isValidElement(element)).toBe(true);
      expect(element.props.children).toBe('Ref Test');
    });

    it('should forward interaction events (pointer, mouse, focus, blur)', () => {
      const onPointerMove = vi.fn();
      const onMouseMove = vi.fn();
      const onMouseEnter = vi.fn();
      const onMouseLeave = vi.fn();
      const onFocus = vi.fn();
      const onBlur = vi.fn();

      const element = React.createElement(
        BorderGlow,
        {
          onPointerMove,
          onMouseMove,
          onMouseEnter,
          onMouseLeave,
          onFocus,
          onBlur,
        },
        'Interactive Card'
      );

      expect(element.props.onPointerMove).toBe(onPointerMove);
      expect(element.props.onMouseMove).toBe(onMouseMove);
      expect(element.props.onMouseEnter).toBe(onMouseEnter);
      expect(element.props.onMouseLeave).toBe(onMouseLeave);
      expect(element.props.onFocus).toBe(onFocus);
      expect(element.props.onBlur).toBe(onBlur);
    });

    it('animateValue should return a cleanup cancellation function', () => {
      const cleanup = animateValue({
        duration: 100,
        onUpdate: () => {},
      });
      expect(typeof cleanup).toBe('function');
      cleanup(); // Cancelling should execute cleanly without error
    });
  });
});
