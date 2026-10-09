import { describe, it, expect } from 'vitest';
import React from 'react';
import { AuthorSignature } from '@/modules/about/AuthorSignature';
import { AboutIntro } from '@/modules/about/AboutIntro';

describe('AuthorSignature and AboutIntro Components', () => {
  describe('AuthorSignature element generation', () => {
    it('creates AuthorSignature React element with default props', () => {
      const element = React.createElement(AuthorSignature);
      expect(element).toBeDefined();
      expect(element.type).toBe(AuthorSignature);
    });

    it('accepts custom signature name and className', () => {
      const element = React.createElement(AuthorSignature, {
        name: 'Rizkillah Ramanda',
        className: 'custom-signature-class',
      });
      expect(element.props.name).toBe('Rizkillah Ramanda');
      expect(element.props.className).toBe('custom-signature-class');
    });

    it('renders span element with signature font styling', () => {
      const rendered = AuthorSignature({ name: 'rizkillah' });
      expect(React.isValidElement(rendered)).toBe(true);
      const spanChild = (rendered.props as unknown as { children: React.ReactElement }).children;
      expect(spanChild.props.className).toContain('font-signature');
      expect(spanChild.props.className).toContain('text-amber-500');
      expect(spanChild.props.children).toBe('rizkillah');
    });
  });

  describe('AboutIntro component export', () => {
    it('exports AboutIntro functional component', () => {
      expect(AboutIntro).toBeDefined();
      expect(typeof AboutIntro).toBe('function');
    });
  });
});
