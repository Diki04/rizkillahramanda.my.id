export { MicroSlats, default, SWELL_PRESETS, parseColor } from './MicroSlats';
export type { MicroSlatsProps, SwellPreset, WaveValues, Rgba } from './MicroSlats';

export { TechText, toRgbaString } from './TechText';
export type { TechTextProps, LineStyle } from './TechText';

export { SpecularButton, parseColorToVec3 } from './SpecularButton';
export type { SpecularButtonProps, SpecularButtonSize } from './SpecularButton';

export { SpotlightCard, calculateSpotlightOffset } from './SpotlightCard';
export type { SpotlightCardProps } from './SpotlightCard';

export { GlideSelect, normalizeOptions, findTypeaheadMatch } from './GlideSelect';
export type { GlideSelectOption, GlideSelectRawOption, GlideSelectProps } from './GlideSelect';

export {
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
} from './BorderGlow';
export type { BorderGlowProps, HslColor, AnimateValueOptions } from './BorderGlow';

export {
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
} from './MagicBento';
export type { BentoCardProps, BentoProps } from './MagicBento';
