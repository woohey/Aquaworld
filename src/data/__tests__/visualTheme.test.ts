import { describe, expect, it } from 'vitest';
import { fish } from '../fish';
import { habitats } from '../habitats';
import { fishColorTokens, getFishColorToken, getHabitatVisualStyle } from '../visualTheme';

describe('visualTheme', () => {
  it('backs every fish color with a visual token', () => {
    const unsupportedColors = fish.flatMap((item) =>
      item.colors.filter((color) => !(color in fishColorTokens)).map((color) => `${item.id}:${color}`),
    );

    expect(unsupportedColors).toEqual([]);
  });

  it('returns a stable fallback color for unknown fish colors', () => {
    expect(getFishColorToken('not-a-real-color')).toBe('#6f8f8d');
  });

  it('returns scroll-map style variables for every habitat', () => {
    const missingStyles = habitats.flatMap((habitat) => {
      const style = getHabitatVisualStyle(habitat);
      return style['--habitat-wash'] && style['--habitat-ink'] && style['--habitat-glow'] ? [] : [habitat.id];
    });

    expect(missingStyles).toEqual([]);
  });
});
