import { describe, expect, it } from 'vitest';
import { fish } from '../../data/fish';
import { habitats } from '../../data/habitats';
import { defaultFilters } from '../../types/domain';
import { filterFish } from '../filterFish';

describe('filterFish', () => {
  it('filters fish by habitat', () => {
    const result = filterFish(fish, {
      ...defaultFilters,
      habitatId: 'chinese-southern-streams',
    }, '');

    expect(result.map((item) => item.id)).toEqual([
      'white-cloud-minnow',
      'paradise-fish',
      'roundtail-paradise-fish',
      'chinese-bitterling',
      'chinese-medaka',
      'stream-goby',
    ]);
  });

  it('filters fish by temperature and pH', () => {
    const result = filterFish(fish, {
      ...defaultFilters,
      temperature: 18,
      ph: 7,
    }, '');

    expect(result.some((item) => item.id === 'white-cloud-minnow')).toBe(true);
    expect(result.some((item) => item.id === 'clownfish')).toBe(false);
  });

  it('searches Chinese, common, and scientific names', () => {
    expect(filterFish(fish, defaultFilters, '白云').map((item) => item.id)).toEqual(['white-cloud-minnow']);
    expect(filterFish(fish, defaultFilters, 'Neon').map((item) => item.id)).toEqual(['neon-tetra']);
    expect(filterFish(fish, defaultFilters, 'Macropodus').map((item) => item.id)).toEqual([
      'paradise-fish',
      'roundtail-paradise-fish',
    ]);
  });

  it('filters fish by temperament', () => {
    const result = filterFish(fish, {
      ...defaultFilters,
      temperament: 'aggressive',
    }, '');

    expect(result.map((item) => item.id)).toEqual(['mbuna-cichlid']);
  });

  it('filters fish by maximum adult size', () => {
    const result = filterFish(fish, {
      ...defaultFilters,
      maxAdultSizeCm: 4,
    }, '');

    expect(result.map((item) => item.id)).toEqual(['neon-tetra', 'shell-dweller', 'white-cloud-minnow']);
  });

  it('filters fish by color', () => {
    const result = filterFish(fish, {
      ...defaultFilters,
      color: 'cream',
    }, '');

    expect(result.map((item) => item.id)).toEqual(['shell-dweller']);
  });

  it('filters fish by care level', () => {
    const result = filterFish(fish, {
      ...defaultFilters,
      careLevel: 'advanced',
    }, '');

    expect(result.map((item) => item.id)).toEqual(['blue-tang']);
  });

  it('trims search query and ignores case', () => {
    expect(filterFish(fish, defaultFilters, '  neon  ').map((item) => item.id)).toEqual(['neon-tetra']);
    expect(filterFish(fish, defaultFilters, 'MACROPODUS').map((item) => item.id)).toEqual([
      'paradise-fish',
      'roundtail-paradise-fish',
    ]);
  });

  it('has at least five fish for each MVP habitat', () => {
    for (const habitat of habitats) {
      const fishInHabitat = fish.filter((item) => item.habitatId === habitat.id);

      expect(fishInHabitat.length).toBeGreaterThanOrEqual(5);
    }
  });
});
