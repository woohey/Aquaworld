import { describe, expect, it } from 'vitest';
import { fish } from '../fish';
import { habitats } from '../habitats';
import { fishColorTokens } from '../visualTheme';

const fishIds = new Set(fish.map((item) => item.id));
const habitatById = new Map(habitats.map((habitat) => [habitat.id, habitat]));

function isBlank(value: string) {
  return value.trim().length === 0;
}

function rangesOverlap(first: { min: number; max: number }, second: { min: number; max: number }) {
  return first.min <= second.max && second.min <= first.max;
}

describe('domain data integrity', () => {
  it('uses unique IDs for habitats and fish', () => {
    const habitatIds = habitats.map((habitat) => habitat.id);
    const allFishIds = fish.map((item) => item.id);

    expect(new Set(habitatIds).size).toBe(habitatIds.length);
    expect(new Set(allFishIds).size).toBe(allFishIds.length);
  });

  it('uses existing fish IDs for habitat representatives', () => {
    const missingRepresentativeIds = habitats.flatMap((habitat) =>
      habitat.representativeFishIds
        .filter((fishId) => !fishIds.has(fishId))
        .map((fishId) => `${habitat.id}:${fishId}`),
    );

    expect(missingRepresentativeIds).toEqual([]);
  });

  it('keeps habitat representatives inside their assigned habitat', () => {
    const representativeMismatches = habitats.flatMap((habitat) =>
      habitat.representativeFishIds.flatMap((fishId) => {
        const representative = fish.find((item) => item.id === fishId);
        if (!representative) return [];

        return representative.habitatId === habitat.id ? [] : [`${habitat.id}:${fishId}`];
      }),
    );

    expect(representativeMismatches).toEqual([]);
  });

  it('keeps each habitat populated for atlas browsing', () => {
    const sparseHabitats = habitats
      .map((habitat) => ({
        id: habitat.id,
        fishCount: fish.filter((item) => item.habitatId === habitat.id).length,
        representativeCount: habitat.representativeFishIds.length,
      }))
      .filter((habitat) => habitat.fishCount < 2 || habitat.representativeCount < 2)
      .map((habitat) => `${habitat.id}:fish-${habitat.fishCount}:representatives-${habitat.representativeCount}`);

    expect(sparseHabitats).toEqual([]);
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

  it('keeps water ranges internally valid', () => {
    const invalidRanges = [
      ...habitats.flatMap((habitat) => {
        const ranges = {
          temperature: habitat.temperatureRange,
          ph: habitat.phRange,
          hardness: habitat.hardnessRange,
        };

        return Object.entries(ranges)
          .filter(([, range]) => range.min > range.max)
          .map(([field]) => `${habitat.id}:${field}`);
      }),
      ...fish.flatMap((item) => {
        const ranges = {
          temperature: item.temperatureRange,
          ph: item.phRange,
          hardness: item.hardnessRange,
        };

        return Object.entries(ranges)
          .filter(([, range]) => range.min > range.max)
          .map(([field]) => `${item.id}:${field}`);
      }),
    ];

    expect(invalidRanges).toEqual([]);
  });

  it('uses fish colors backed by visual tokens', () => {
    const unsupportedColors = fish.flatMap((item) =>
      item.colors.filter((color) => !(color in fishColorTokens)).map((color) => `${item.id}:${color}`),
    );

    expect(unsupportedColors).toEqual([]);
  });

  it('keeps atlas-facing fish copy complete', () => {
    const incompleteFish = fish.flatMap((item) => {
      const missingFields = [
        isBlank(item.commonName) ? 'commonName' : null,
        isBlank(item.chineseName) ? 'chineseName' : null,
        isBlank(item.scientificName) ? 'scientificName' : null,
        isBlank(item.originRegion) ? 'originRegion' : null,
        isBlank(item.habitat) ? 'habitat' : null,
        isBlank(item.schooling) ? 'schooling' : null,
        isBlank(item.compatibility.notes) ? 'compatibility.notes' : null,
        isBlank(item.storyNote) ? 'storyNote' : null,
        item.visualTags.length === 0 ? 'visualTags' : null,
        item.colors.length === 0 ? 'colors' : null,
      ].filter(Boolean);

      return missingFields.map((field) => `${item.id}:${field}`);
    });

    expect(incompleteFish).toEqual([]);
  });

  it('keeps atlas-facing habitat copy complete', () => {
    const incompleteHabitats = habitats.flatMap((habitat) => {
      const missingFields = [
        isBlank(habitat.name) ? 'name' : null,
        isBlank(habitat.englishName) ? 'englishName' : null,
        isBlank(habitat.subtitle) ? 'subtitle' : null,
        isBlank(habitat.description) ? 'description' : null,
        isBlank(habitat.waterType) ? 'waterType' : null,
        isBlank(habitat.visualMood) ? 'visualMood' : null,
      ].filter(Boolean);

      return missingFields.map((field) => `${habitat.id}:${field}`);
    });

    expect(incompleteHabitats).toEqual([]);
  });
});
