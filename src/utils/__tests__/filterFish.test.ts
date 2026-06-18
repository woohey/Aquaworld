import { describe, expect, it } from 'vitest';
import { fish } from '../../data/fish';
import { defaultFilters } from '../../types/domain';
import { filterFish } from '../filterFish';

describe('filterFish', () => {
  it('filters fish by habitat', () => {
    const result = filterFish(fish, {
      ...defaultFilters,
      habitatId: 'chinese-southern-streams',
    }, '');

    expect(result.map((item) => item.id)).toEqual(['white-cloud-minnow', 'paradise-fish']);
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
    expect(filterFish(fish, defaultFilters, 'Macropodus').map((item) => item.id)).toEqual(['paradise-fish']);
  });
});
