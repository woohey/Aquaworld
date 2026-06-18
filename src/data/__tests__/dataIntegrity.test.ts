import { describe, expect, it } from 'vitest';
import { fishColorTokens } from '../colorTokens';
import { fish } from '../fish';
import { habitats } from '../habitats';

const fishIds = new Set(fish.map((item) => item.id));
const habitatById = new Map(habitats.map((habitat) => [habitat.id, habitat]));

function rangesOverlap(first: { min: number; max: number }, second: { min: number; max: number }) {
  return first.min <= second.max && second.min <= first.max;
}

describe('domain data integrity', () => {
  it('uses existing fish IDs for habitat representatives', () => {
    const missingRepresentativeIds = habitats.flatMap((habitat) =>
      habitat.representativeFishIds
        .filter((fishId) => !fishIds.has(fishId))
        .map((fishId) => `${habitat.id}:${fishId}`),
    );

    expect(missingRepresentativeIds).toEqual([]);
  });

  it('uses existing fish IDs for compatibility and similar species links', () => {
    const missingFishReferences = fish.flatMap((item) => {
      const linkedIds = [
        ...item.compatibility.usuallySuitable,
        ...item.compatibility.useCaution,
        ...item.compatibility.notRecommended,
        ...item.similarSpecies,
      ];

      return linkedIds
        .filter((linkedId) => !fishIds.has(linkedId))
        .map((linkedId) => `${item.id}:${linkedId}`);
    });

    expect(missingFishReferences).toEqual([]);
  });

  it('keeps fish water ranges aligned with their assigned habitat', () => {
    const mismatchedFish = fish.flatMap((item) => {
      const habitat = habitatById.get(item.habitatId);
      if (!habitat) return [`${item.id}:missing-habitat`];

      const mismatches = [
        rangesOverlap(item.temperatureRange, habitat.temperatureRange) ? null : 'temperature',
        rangesOverlap(item.phRange, habitat.phRange) ? null : 'ph',
        rangesOverlap(item.hardnessRange, habitat.hardnessRange) ? null : 'hardness',
      ].filter(Boolean);

      return mismatches.map((field) => `${item.id}:${field}`);
    });

    expect(mismatchedFish).toEqual([]);
  });

  it('uses fish colors backed by visual tokens', () => {
    const unsupportedColors = fish.flatMap((item) =>
      item.colors.filter((color) => !(color in fishColorTokens)).map((color) => `${item.id}:${color}`),
    );

    expect(unsupportedColors).toEqual([]);
  });
});
