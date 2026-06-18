import { describe, expect, it } from 'vitest';
import { fish } from '../fish';
import { habitats } from '../habitats';

const fishIds = new Set(fish.map((item) => item.id));

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
});
