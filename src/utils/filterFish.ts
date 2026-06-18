import type { Fish, FishFilters } from '../types/domain';

function includesRange(value: number | null, min: number, max: number) {
  return value === null || (value >= min && value <= max);
}

function matchesSearch(fish: Fish, searchQuery: string) {
  const query = searchQuery.trim().toLowerCase();
  if (!query) return true;

  return [
    fish.chineseName,
    fish.commonName,
    fish.scientificName,
    fish.originRegion,
    fish.habitat,
    ...fish.visualTags,
  ].some((value) => value.toLowerCase().includes(query));
}

export function filterFish(fish: Fish[], filters: FishFilters, searchQuery: string) {
  return fish.filter((item) => {
    if (filters.habitatId !== 'all' && item.habitatId !== filters.habitatId) return false;
    if (!includesRange(filters.temperature, item.temperatureRange.min, item.temperatureRange.max)) return false;
    if (!includesRange(filters.ph, item.phRange.min, item.phRange.max)) return false;
    if (filters.temperament !== 'all' && item.temperament !== filters.temperament) return false;
    if (filters.maxAdultSizeCm !== null && item.adultSizeCm > filters.maxAdultSizeCm) return false;
    if (filters.color !== 'all' && !item.colors.includes(filters.color)) return false;
    if (filters.careLevel !== 'all' && item.careLevel !== filters.careLevel) return false;
    return matchesSearch(item, searchQuery);
  });
}
