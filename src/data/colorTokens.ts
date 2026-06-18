export const fishColorTokens = {
  black: '#1d2730',
  blue: '#3ba7ff',
  brown: '#8b5d3d',
  cream: '#f1dfb5',
  gold: '#e9c46a',
  gray: '#8fa0a8',
  green: '#58c98f',
  multicolor: '#6ee7f7',
  orange: '#ff9a4f',
  pink: '#f4a6c2',
  purple: '#b58cff',
  red: '#ff5f6d',
  silver: '#d9e7ee',
  turquoise: '#35d4cf',
  white: '#ffffff',
  yellow: '#ffd166',
} as const;

export const fishColorOptions = ['all', ...Object.keys(fishColorTokens)] as const;

export function getFishColorToken(color: string) {
  return fishColorTokens[color as keyof typeof fishColorTokens] ?? '#6ee7f7';
}
