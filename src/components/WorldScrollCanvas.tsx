import type { CSSProperties } from 'react';
import { getFishColorToken, getHabitatVisualStyle } from '../data/visualTheme';
import type { Fish, Habitat } from '../types/domain';

type WorldScrollCanvasProps = {
  habitats: Habitat[];
  fish: Fish[];
  selectedHabitatId: string;
  selectedFishId: string | null;
  onHabitatSelect: (habitatId: string) => void;
  onFishSelect: (fishId: string) => void;
};

export function WorldScrollCanvas({
  habitats,
  fish,
  selectedHabitatId,
  selectedFishId,
  onHabitatSelect,
  onFishSelect,
}: WorldScrollCanvasProps) {
  const habitatIdsWithFish = new Set(fish.map((item) => item.habitatId));

  return (
    <section className="world-scroll-canvas" aria-label="沉浸式世界画卷">
      <div className="world-scroll-canvas__mist" aria-hidden="true" />
      <div className="world-scroll-canvas__paper" aria-hidden="true">
        <svg className="world-scroll-canvas__terrain" viewBox="0 0 100 56" role="presentation" aria-hidden="true">
          <path className="terrain-shape terrain-shape--americas" d="M12 20 C18 13 26 16 30 24 C28 31 24 38 20 45 C16 41 14 32 12 20Z" />
          <path className="terrain-shape terrain-shape--africa" d="M42 21 C50 18 56 25 55 35 C54 44 47 49 42 40 C39 33 37 25 42 21Z" />
          <path className="terrain-shape terrain-shape--asia" d="M58 17 C70 10 86 16 90 28 C83 35 71 37 61 31 C57 27 54 21 58 17Z" />
          <path className="terrain-line" d="M9 34 C25 27 38 34 51 30 C64 25 74 24 92 31" />
          <path className="terrain-line terrain-line--gold" d="M18 43 C30 48 40 42 49 47 C61 54 76 46 88 50" />
        </svg>
      </div>
      <div className="world-scroll-canvas__scene" aria-hidden="true">
        <span className="scroll-bird scroll-bird--one" />
        <span className="scroll-bird scroll-bird--two" />
        <span className="scroll-bird scroll-bird--three" />
        <span className="scroll-pavilion scroll-pavilion--east" />
        <span className="scroll-pavilion scroll-pavilion--reef" />
      </div>
      <div className="world-scroll-canvas__flow" aria-hidden="true" />
      <div className="world-scroll-canvas__content">
        {habitats.map((habitat) => {
          const hasVisibleFish = habitatIdsWithFish.has(habitat.id);

          return (
            <button
              key={habitat.id}
              type="button"
              className={`basin-node ${habitat.id === selectedHabitatId ? 'is-selected' : ''} ${hasVisibleFish ? '' : 'is-dimmed'}`}
              style={
                {
                  '--basin-x': `${habitat.mapPosition.x}%`,
                  '--basin-y': `${habitat.mapPosition.y}%`,
                  left: `${habitat.mapPosition.x}%`,
                  top: `${habitat.mapPosition.y}%`,
                  ...getHabitatVisualStyle(habitat),
                } as CSSProperties
              }
              onClick={() => onHabitatSelect(habitat.id)}
              aria-label={`${habitat.name} 流域`}
              aria-pressed={habitat.id === selectedHabitatId}
            >
              <span className="basin-node__wash" aria-hidden="true" />
              <span className="basin-node__label">
                <strong>{habitat.name}</strong>
                <small>{habitat.englishName}</small>
              </span>
            </button>
          );
        })}

        {fish.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`fish-shadow-marker ${item.id === selectedFishId ? 'is-selected' : ''}`}
            style={
              {
                left: `${item.markerPosition.x}%`,
                top: `${item.markerPosition.y}%`,
                '--fish-color': getFishColorToken(item.colors[0]),
              } as CSSProperties
            }
            onClick={() => onFishSelect(item.id)}
            aria-label={`${item.chineseName} ${item.commonName} 鱼影`}
            aria-pressed={item.id === selectedFishId}
          >
            <span className="fish-shadow-marker__body" aria-hidden="true" />
            <span className="fish-shadow-marker__label">{item.chineseName}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
