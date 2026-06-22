import type { CSSProperties } from 'react';
import type { Habitat } from '../types/domain';

type HabitatVisualStyle = CSSProperties &
  Record<'--node-primary' | '--node-secondary' | '--node-glow' | '--habitat-ink' | '--habitat-wash' | '--habitat-glow', string>;

export const fishColorTokens = {
  black: '#1d2730',
  blue: '#3f8fb9',
  brown: '#816142',
  cream: '#e5d2a8',
  gold: '#d9b96a',
  gray: '#87969a',
  green: '#6e9f87',
  multicolor: '#7fb7aa',
  orange: '#d88d54',
  pink: '#d6a0af',
  purple: '#9b89b9',
  red: '#c85d5d',
  silver: '#c8d2ce',
  turquoise: '#5db8b1',
  white: '#f4efe3',
  yellow: '#d7bd65',
} as const;

export const fishColorOptions = ['all', ...Object.keys(fishColorTokens)] as const;

const habitatWashOverrides: Record<string, { ink: string; wash: string; glow: string }> = {
  'amazon-blackwater': { ink: '#7b5438', wash: '#3d2d22', glow: '#d7a66a' },
  'southeast-asian-streams': { ink: '#5b8f73', wash: '#284d3c', glow: '#9ccfae' },
  'african-rift-lakes': { ink: '#456d93', wash: '#263d58', glow: '#9cb8d9' },
  'south-asian-slow-waters': { ink: '#8a884f', wash: '#3d482d', glow: '#d8c982' },
  'central-american-rivers': { ink: '#7b684a', wash: '#354034', glow: '#d6a06c' },
  'coral-reef-shallows': { ink: '#5aa9ad', wash: '#284c56', glow: '#d6b08b' },
  'chinese-southern-streams': { ink: '#6d9f8d', wash: '#2f4f47', glow: '#d8c98a' },
};

export function getFishColorToken(color: string) {
  return fishColorTokens[color as keyof typeof fishColorTokens] ?? '#6f8f8d';
}

export function getHabitatVisualStyle(habitat: Habitat): HabitatVisualStyle {
  const visual = habitatWashOverrides[habitat.id] ?? {
    ink: habitat.colorPalette.primary,
    wash: habitat.colorPalette.secondary,
    glow: habitat.colorPalette.glow,
  };

  return {
    '--node-primary': habitat.colorPalette.primary,
    '--node-secondary': habitat.colorPalette.secondary,
    '--node-glow': habitat.colorPalette.glow,
    '--habitat-ink': visual.ink,
    '--habitat-wash': visual.wash,
    '--habitat-glow': visual.glow,
  };
}
