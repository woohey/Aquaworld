import type { Fish, Habitat } from '../types/domain';

type Position = { x: number; y: number };

const worldHabitatPositions: Record<string, Position> = {
  'amazon-blackwater': { x: 30, y: 80 },
  'central-american-rivers': { x: 18, y: 66 },
  'african-rift-lakes': { x: 55, y: 80 },
  'south-asian-slow-waters': { x: 50, y: 28 },
  'southeast-asian-streams': { x: 75, y: 75 },
  'chinese-southern-streams': { x: 78, y: 65 },
  'coral-reef-shallows': { x: 90, y: 70 },
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
  const yOffset = clamp((item.markerPosition.y - habitat.mapPosition.y) * 0.45, -8, 8);

  return {
    x: clamp(habitatPosition.x + xOffset, 6, 94),
    y: clamp(habitatPosition.y + yOffset, 12, 88),
  };
}
