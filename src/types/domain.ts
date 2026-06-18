export type Range = {
  min: number;
  max: number;
};

export type Temperament = 'peaceful' | 'semiAggressive' | 'aggressive';
export type CareLevel = 'easy' | 'moderate' | 'advanced';
export type SwimLayer = 'top' | 'middle' | 'bottom' | 'all';

export type Habitat = {
  id: string;
  name: string;
  englishName: string;
  subtitle: string;
  description: string;
  waterType: string;
  temperatureRange: Range;
  phRange: Range;
  hardnessRange: Range;
  visualMood: string;
  mapPosition: { x: number; y: number };
  colorPalette: {
    primary: string;
    secondary: string;
    glow: string;
  };
  representativeFishIds: string[];
};

export type Compatibility = {
  usuallySuitable: string[];
  useCaution: string[];
  notRecommended: string[];
  notes: string;
};

export type Fish = {
  id: string;
  commonName: string;
  chineseName: string;
  scientificName: string;
  originRegion: string;
  habitatId: string;
  habitat: string;
  temperatureRange: Range;
  phRange: Range;
  hardnessRange: Range;
  temperament: Temperament;
  adultSizeCm: number;
  swimLayer: SwimLayer;
  colors: string[];
  visualTags: string[];
  careLevel: CareLevel;
  schooling: string;
  compatibility: Compatibility;
  similarSpecies: string[];
  storyNote: string;
  markerPosition: { x: number; y: number };
};

export type FishFilters = {
  habitatId: string;
  temperature: number | null;
  ph: number | null;
  temperament: Temperament | 'all';
  maxAdultSizeCm: number | null;
  color: string;
  careLevel: CareLevel | 'all';
};

export const defaultFilters: FishFilters = {
  habitatId: 'all',
  temperature: null,
  ph: null,
  temperament: 'all',
  maxAdultSizeCm: null,
  color: 'all',
  careLevel: 'all',
};
