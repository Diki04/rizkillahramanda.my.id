import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import {
  MagicBento,
  DEFAULT_CARDS,
  DEFAULT_PARTICLE_COUNT,
  DEFAULT_SPOTLIGHT_RADIUS,
  DEFAULT_GLOW_COLOR,
  MOBILE_BREAKPOINT,
  calculateSpotlightValues,
  calculateTiltAngles,
  calculateMagnetOffset,
  calculateGlowIntensity,
  calculateCardRelativeGlow,
  createParticleElement,
  useMobileDetection,
  ParticleCard,
  GlobalSpotlight,
  MAGIC_BENTO_STYLES,
} from '@/common/components/reactbits/MagicBento';
import * as ReactBits from '@/common/components/reactbits';
import { MagicBentoSection } from '@/modules/home/MagicBentoSection';

describe('MagicBento GSAP 3D Interactive Grid Suite', () => {
  describe('Module and Barrel Exports', () => {
    it('should export MagicBento and all math helpers from component module', () => {
      expect(MagicBento).toBeDefined();
      expect(typeof MagicBento).toBe('function');

      expect(DEFAULT_CARDS).toBeDefined();
      expect(Array.isArray(DEFAULT_CARDS)).toBe(true);

      expect(DEFAULT_PARTICLE_COUNT).toBe(12);
      expect(DEFAULT_SPOTLIGHT_RADIUS).toBe(300);
      expect(DEFAULT_GLOW_COLOR).toBe('255, 255, 255');
      expect(MOBILE_BREAKPOINT).toBe(768);

      expect(calculateSpotlightValues).toBeDefined();
      expect(typeof calculateSpotlightValues).toBe('function');

      expect(calculateTiltAngles).toBeDefined();
      expect(typeof calculateTiltAngles).toBe('function');

      expect(calculateMagnetOffset).toBeDefined();
      expect(typeof calculateMagnetOffset).toBe('function');

      expect(calculateGlowIntensity).toBeDefined();
      expect(typeof calculateGlowIntensity).toBe('function');

      expect(calculateCardRelativeGlow).toBeDefined();
      expect(typeof calculateCardRelativeGlow).toBe('function');

      expect(createParticleElement).toBeDefined();
      expect(typeof createParticleElement).toBe('function');

      expect(useMobileDetection).toBeDefined();
      expect(typeof useMobileDetection).toBe('function');

      expect(ParticleCard).toBeDefined();
      expect(typeof ParticleCard).toBe('function');

      expect(GlobalSpotlight).toBeDefined();
      expect(typeof GlobalSpotlight).toBe('function');

      expect(MAGIC_BENTO_STYLES).toBeDefined();
      expect(typeof MAGIC_BENTO_STYLES).toBe('string');
    });

    it('should export MagicBento and types through reactbits barrel index', () => {
      expect(ReactBits.MagicBento).toBe(MagicBento);
      expect(ReactBits.DEFAULT_CARDS).toBe(DEFAULT_CARDS);
      expect(ReactBits.DEFAULT_PARTICLE_COUNT).toBe(DEFAULT_PARTICLE_COUNT);
      expect(ReactBits.DEFAULT_SPOTLIGHT_RADIUS).toBe(DEFAULT_SPOTLIGHT_RADIUS);
      expect(ReactBits.DEFAULT_GLOW_COLOR).toBe(DEFAULT_GLOW_COLOR);
      expect(ReactBits.MOBILE_BREAKPOINT).toBe(MOBILE_BREAKPOINT);
      expect(ReactBits.calculateSpotlightValues).toBe(calculateSpotlightValues);
      expect(ReactBits.calculateTiltAngles).toBe(calculateTiltAngles);
      expect(ReactBits.calculateMagnetOffset).toBe(calculateMagnetOffset);
      expect(ReactBits.calculateGlowIntensity).toBe(calculateGlowIntensity);
      expect(ReactBits.calculateCardRelativeGlow).toBe(calculateCardRelativeGlow);
      expect(ReactBits.createParticleElement).toBe(createParticleElement);
      expect(ReactBits.ParticleCard).toBe(ParticleCard);
      expect(ReactBits.GlobalSpotlight).toBe(GlobalSpotlight);
      expect(ReactBits.MAGIC_BENTO_STYLES).toBe(MAGIC_BENTO_STYLES);
    });

    it('should export MagicBentoSection from home module', () => {
      expect(MagicBentoSection).toBeDefined();
      expect(typeof MagicBentoSection).toBe('function');
    });
  });

  describe('Default Cards and Portfolio Highlights', () => {
    it('should contain 6 highlight cards aligned with pure OLED styling', () => {
      expect(DEFAULT_CARDS).toHaveLength(6);
      DEFAULT_CARDS.forEach((card) => {
        expect(card.title).toBeDefined();
        expect(card.description).toBeDefined();
        expect(card.label).toBeDefined();
        expect(card.color).toMatch(/^#(09090b|121214)$/);
      });
    });

    it('should include Architecture Principles highlight', () => {
      const card = DEFAULT_CARDS.find((c) => c.title?.includes('Architecture'));
      expect(card).toBeDefined();
      expect(card?.description).toContain('Next.js');
      expect(card?.description).toContain('TypeScript');
    });

    it('should include Fullstack Core highlight', () => {
      const card = DEFAULT_CARDS.find((c) => c.title?.includes('Fullstack'));
      expect(card).toBeDefined();
      expect(card?.description).toContain('PostgreSQL');
      expect(card?.description).toContain('Supabase');
    });

    it('should include AI & Research highlight', () => {
      const card = DEFAULT_CARDS.find((c) => c.title?.includes('AI'));
      expect(card).toBeDefined();
      expect(card?.description).toContain('Agentic');
    });

    it('should include Quality Metrics highlight', () => {
      const card = DEFAULT_CARDS.find((c) => c.label?.includes('Quality'));
      expect(card).toBeDefined();
      expect(card?.description).toContain('100% test pass rate');
    });

    it('should include Live Availability Status highlight', () => {
      const card = DEFAULT_CARDS.find((c) => c.label?.includes('Availability'));
      expect(card).toBeDefined();
      expect(card?.title).toContain('Availability');
    });
  });

  describe('calculateSpotlightValues helper', () => {
    it('should calculate proximity and fade distance proportionally to radius', () => {
      const values = calculateSpotlightValues(300);
      expect(values.proximity).toBe(150);
      expect(values.fadeDistance).toBe(225);
    });

    it('should scale with custom radius values', () => {
      const values = calculateSpotlightValues(400);
      expect(values.proximity).toBe(200);
      expect(values.fadeDistance).toBe(300);
    });

    it('should handle zero radius safely', () => {
      const values = calculateSpotlightValues(0);
      expect(values.proximity).toBe(0);
      expect(values.fadeDistance).toBe(0);
    });
  });

  describe('calculateTiltAngles helper', () => {
    it('should return 0 rotation when cursor is exactly in the card center', () => {
      const tilt = calculateTiltAngles(100, 100, 200, 200, 10);
      expect(tilt.rotateX).toBeCloseTo(0);
      expect(tilt.rotateY).toBeCloseTo(0);
    });

    it('should tilt upward when cursor is at top', () => {
      const tilt = calculateTiltAngles(100, 0, 200, 200, 10);
      expect(tilt.rotateX).toBe(10);
      expect(tilt.rotateY).toBe(0);
    });

    it('should tilt downward when cursor is at bottom', () => {
      const tilt = calculateTiltAngles(100, 200, 200, 200, 10);
      expect(tilt.rotateX).toBe(-10);
      expect(tilt.rotateY).toBe(0);
    });

    it('should tilt rightward when cursor is at right edge', () => {
      const tilt = calculateTiltAngles(200, 100, 200, 200, 10);
      expect(tilt.rotateX).toBe(0);
      expect(tilt.rotateY).toBe(10);
    });

    it('should tilt leftward when cursor is at left edge', () => {
      const tilt = calculateTiltAngles(0, 100, 200, 200, 10);
      expect(tilt.rotateX).toBe(0);
      expect(tilt.rotateY).toBe(-10);
    });

    it('should return 0 when dimensions are invalid or zero', () => {
      const tilt = calculateTiltAngles(50, 50, 0, 0, 10);
      expect(tilt.rotateX).toBe(0);
      expect(tilt.rotateY).toBe(0);
    });
  });

  describe('calculateMagnetOffset helper', () => {
    it('should return 0 displacement when cursor is at element center', () => {
      const magnet = calculateMagnetOffset(150, 150, 300, 300, 0.05);
      expect(magnet.magnetX).toBe(0);
      expect(magnet.magnetY).toBe(0);
    });

    it('should calculate displacement based on distance from center and factor', () => {
      const magnet = calculateMagnetOffset(250, 250, 300, 300, 0.05);
      expect(magnet.magnetX).toBeCloseTo(5);
      expect(magnet.magnetY).toBeCloseTo(5);
    });

    it('should return 0 when width or height is zero', () => {
      const magnet = calculateMagnetOffset(50, 50, 0, 100, 0.05);
      expect(magnet.magnetX).toBe(0);
      expect(magnet.magnetY).toBe(0);
    });
  });

  describe('calculateGlowIntensity helper', () => {
    it('should return 1 when distance is within proximity', () => {
      const glow = calculateGlowIntensity(50, 150, 225);
      expect(glow).toBe(1);
    });

    it('should return 0 when distance exceeds fade distance', () => {
      const glow = calculateGlowIntensity(300, 150, 225);
      expect(glow).toBe(0);
    });

    it('should interpolate linearly between proximity and fadeDistance', () => {
      const glow = calculateGlowIntensity(187.5, 150, 225);
      expect(glow).toBeCloseTo(0.5);
    });

    it('should return 1 at proximity threshold', () => {
      const glow = calculateGlowIntensity(150, 150, 225);
      expect(glow).toBe(1);
    });

    it('should return 0 at fadeDistance threshold', () => {
      const glow = calculateGlowIntensity(225, 150, 225);
      expect(glow).toBe(0);
    });

    it('should handle inverted or equal proximity and fadeDistance safely', () => {
      const glow = calculateGlowIntensity(150, 150, 150);
      expect(glow).toBe(1);
    });
  });

  describe('calculateCardRelativeGlow helper', () => {
    it('should calculate relative percentage coordinates accurately', () => {
      const rect = { left: 100, top: 100, width: 200, height: 400 };
      const relative = calculateCardRelativeGlow(200, 300, rect);
      expect(relative.xPercent).toBe(50);
      expect(relative.yPercent).toBe(50);
    });

    it('should handle cursor at rect origin', () => {
      const rect = { left: 50, top: 50, width: 100, height: 100 };
      const relative = calculateCardRelativeGlow(50, 50, rect);
      expect(relative.xPercent).toBe(0);
      expect(relative.yPercent).toBe(0);
    });

    it('should fallback to 50% on zero dimensions', () => {
      const rect = { left: 0, top: 0, width: 0, height: 0 };
      const relative = calculateCardRelativeGlow(10, 10, rect);
      expect(relative.xPercent).toBe(50);
      expect(relative.yPercent).toBe(50);
    });
  });

  describe('createParticleElement helper', () => {
    it('should return null safely in Node environment without document', () => {
      const originalDoc = globalThis.document;
      // @ts-expect-error test override
      delete globalThis.document;
      const particle = createParticleElement(10, 20, '255, 255, 255');
      expect(particle).toBeNull();
      globalThis.document = originalDoc;
    });

    it('should create element when document mock is available', () => {
      const mockEl = {
        className: '',
        style: { cssText: '' },
      };
      const mockDoc = {
        createElement: vi.fn(() => mockEl),
      };
      // @ts-expect-error test mock
      globalThis.document = mockDoc;

      const particle = createParticleElement(10, 20, '255, 255, 255');
      expect(particle).toBeDefined();
      expect(mockDoc.createElement).toHaveBeenCalledWith('div');
      expect(mockEl.className).toBe('particle');
      expect(mockEl.style.cssText).toContain('left: 10px');
      expect(mockEl.style.cssText).toContain('top: 20px');
      expect(mockEl.style.cssText).toContain('rgba(255, 255, 255, 1)');

      // Cleanup mock
      // @ts-expect-error test cleanup
      delete globalThis.document;
    });
  });

  describe('MagicBento SSR Markup Rendering', () => {
    it('should render pure OLED monochrome bento grid HTML via SSR', () => {
      const html = renderToStaticMarkup(React.createElement(MagicBento, null));

      expect(html).toContain('bento-section');
      expect(html).toContain('card-responsive');
      expect(html).toContain('Architecture Principles');
      expect(html).toContain('Fullstack Core');
      expect(html).toContain('AI &amp; Research');
      expect(html).toContain('Quality Metrics');
      expect(html).toContain('Live Availability Status');
      expect(html).toContain('card--border-glow');
      expect(html).toContain('--glow-color:255, 255, 255');
      expect(html).toContain('ONLINE');
    });

    it('should render custom cards when provided', () => {
      const customCards = [
        {
          title: 'Custom Engine',
          description: 'High-performance WebGL graphics pipeline.',
          label: 'Graphics',
          color: '#09090b',
        },
        {
          title: 'Compiler Toolchain',
          description: 'Rust-based AST transform and bundling.',
          label: 'Compilers',
          color: '#121214',
        },
      ];

      const html = renderToStaticMarkup(
        React.createElement(MagicBento, { cards: customCards })
      );

      expect(html).toContain('Custom Engine');
      expect(html).toContain('Compiler Toolchain');
      expect(html).not.toContain('Fullstack Core');
    });

    it('should support disableBorderGlow and enableStars toggle options', () => {
      const html = renderToStaticMarkup(
        React.createElement(MagicBento, {
          enableBorderGlow: false,
          enableStars: false,
          textAutoHide: false,
        })
      );

      expect(html).not.toMatch(/class="[^"]*card--border-glow[^"]*"/);
      expect(html).not.toMatch(/class="[^"]*text-clamp-1[^"]*"/);
      expect(html).not.toMatch(/class="[^"]*text-clamp-2[^"]*"/);
    });

    it('should merge custom className and style props', () => {
      const html = renderToStaticMarkup(
        React.createElement(MagicBento, {
          className: 'custom-portfolio-grid',
          style: { zIndex: 40 },
        })
      );

      expect(html).toContain('custom-portfolio-grid');
      expect(html).toContain('z-index:40');
    });
  });

  describe('MagicBentoSection Homepage Wrapper Component', () => {
    it('should render full-width section with heading and embedded MagicBento grid', () => {
      const html = renderToStaticMarkup(React.createElement(MagicBentoSection, null));

      expect(html).toContain('id="magic-bento"');
      expect(html).toContain('System Architecture &amp; Engineering Highlights');
      expect(html).toContain('Engineering Matrix');
      expect(html).toContain('bento-section');
      expect(html).toContain('Architecture Principles');
      expect(html).toContain('bg-black');
    });

    it('should accept custom title, subtitle, badge, and section id', () => {
      const html = renderToStaticMarkup(
        React.createElement(MagicBentoSection, {
          id: 'custom-bento-section',
          title: 'Distributed Systems',
          subtitle: 'Event-driven microservices architecture',
          badge: 'High Scale',
          className: 'extra-padding',
        })
      );

      expect(html).toContain('id="custom-bento-section"');
      expect(html).toContain('Distributed Systems');
      expect(html).toContain('Event-driven microservices architecture');
      expect(html).toContain('High Scale');
      expect(html).toContain('extra-padding');
    });

    it('should pass down custom cards and bentoProps to MagicBento', () => {
      const testCards = [
        {
          title: 'Specialized Agent',
          description: 'LLM reasoning agent with autonomous tool execution.',
          label: 'AI Agent',
        },
      ];

      const html = renderToStaticMarkup(
        React.createElement(MagicBentoSection, {
          cards: testCards,
          bentoProps: { enableBorderGlow: false },
        })
      );

      expect(html).toContain('Specialized Agent');
      expect(html).not.toMatch(/class="[^"]*card--border-glow[^"]*"/);
    });
  });
});
