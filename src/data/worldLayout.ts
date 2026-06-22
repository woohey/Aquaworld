import type { Fish, Habitat } from '../types/domain';

type Position = { x: number; y: number };

const worldHabitatPositions: Record<string, Position> = {
  'amazon-blackwater': { x: 23, y: 60 },
  'central-american-rivers': { x: 18, y: 46 },
  'african-rift-lakes': { x: 48, y: 62 },
  'south-asian-slow-waters': { x: 66, y: 50 },
  'southeast-asian-streams': { x: 76, y: 53 },
  'chinese-southern-streams': { x: 78, y: 38 },
  'coral-reef-shallows': { x: 86, y: 58 },
};

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function getWorldHabitatPosition(habitat: Habitat): Position {
  return worldHabitatPositions[habitat.id] ?? habitat.mapPosition;
}

export function getWorldFishPosition(item: Fish, habitats: Habitat[]): Position {
  const habitat = habitats.find((candidate) => candidate.id === item.habitatId);

  if (!habitat) {
    return item.markerPosition;
  }

  const habitatPosition = getWorldHabitatPosition(habitat);
  const xOffset = clamp((item.markerPosition.x - habitat.mapPosition.x) * 0.45, -6, 6);
  const yOffset = clamp((item.markerPosition.y - habitat.mapPosition.y) * 0.45, -5, 5);

  return {
    x: clamp(habitatPosition.x + xOffset, 6, 94),
    y: clamp(habitatPosition.y + yOffset, 12, 88),
  };
}
