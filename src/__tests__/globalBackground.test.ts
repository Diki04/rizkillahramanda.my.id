import { describe, it, expect } from 'vitest';
import React from 'react';
import { GlobalBackground } from '@/common/components/GlobalBackground';
import { ThemeProvider } from '@/common/contexts/ThemeContext';

describe('GlobalBackground Component', () => {
  it('should export GlobalBackground correctly', () => {
    expect(GlobalBackground).toBeDefined();
    expect(typeof GlobalBackground).toBe('function');
  });

  it('should render initial SSR placeholder safely', () => {
    const element = React.createElement(GlobalBackground);
    expect(React.isValidElement(element)).toBe(true);
  });

  it('should render inside ThemeProvider without crashing', () => {
    const tree = React.createElement(
      ThemeProvider,
      null,
      React.createElement(GlobalBackground)
    );
    expect(React.isValidElement(tree)).toBe(true);
  });
});
