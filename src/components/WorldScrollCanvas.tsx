import type { CSSProperties } from 'react';
import { getFishColorToken, getHabitatVisualStyle } from '../data/visualTheme';
import { getWorldFishPosition, getWorldHabitatPosition } from '../data/worldLayout';
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
        <div className="world-scroll-canvas__backdrop" />
      </div>
      <div className="world-scroll-canvas__scene" aria-hidden="true">
        <span className="scroll-bird scroll-bird--one">
          <span className="scroll-bird__sprite" />
        </span>
        <span className="scroll-bird scroll-bird--two">
          <span className="scroll-bird__sprite" />
        </span>
        <span className="scroll-bird scroll-bird--three">
          <span className="scroll-bird__sprite" />
        </span>
      </div>
      <div className="world-scroll-canvas__flow" aria-hidden="true" />
      <div className="world-scroll-canvas__motion" aria-hidden="true">
        <svg className="scroll-waves" xmlns="http://www.w3.org/2000/svg" viewBox="0 24 150 28" preserveAspectRatio="none">
          <defs>
            <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
          </defs>
          <g className="scroll-waves__parallax">
            <use href="#gentle-wave" x="48" y="0" />
            <use href="#gentle-wave" x="48" y="2" />
            <use href="#gentle-wave" x="48" y="4" />
            <use href="#gentle-wave" x="48" y="6" />
          </g>
        </svg>
      </div>
      <div className="world-scroll-canvas__content">
        {habitats.map((habitat) => {
          const hasVisibleFish = habitatIdsWithFish.has(habitat.id);
          const position = getWorldHabitatPosition(habitat);
          const isSelected = habitat.id === selectedHabitatId;

          return (
            <button
              key={habitat.id}
              type="button"
              className={`basin-node ${isSelected ? 'is-selected' : ''} ${hasVisibleFish ? '' : 'is-dimmed'}`}
              style={
                {
                  '--basin-x': `${position.x}%`,
                  '--basin-y': `${position.y}%`,
                  left: `${position.x}%`,
                  top: `${position.y}%`,
                  ...getHabitatVisualStyle(habitat),
                } as CSSProperties
              }
              onClick={() => onHabitatSelect(habitat.id)}
              aria-label={`${habitat.name} 流域`}
              aria-pressed={isSelected}
            >
              <span className="basin-node__field" aria-hidden="true" />
              <span className="basin-node__wash" aria-hidden="true" />
              <span className="basin-node__label">
                <strong>{habitat.name}</strong>
                <small>{habitat.englishName}</small>
              </span>
              {isSelected ? (
                <span className="basin-node__summary">
                  <em>{habitat.waterType}</em>
                  <em>{habitat.temperatureRange.min}-{habitat.temperatureRange.max}°C</em>
                </span>
              ) : null}
            </button>
          );
        })}

        {fish.map((item) => {
          const position = getWorldFishPosition(item, habitats);

          return (
            <button
              key={item.id}
              type="button"
              className={`fish-shadow-marker ${item.id === selectedFishId ? 'is-selected' : ''}`}
              style={
                {
                  left: `${position.x}%`,
                  top: `${position.y}%`,
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
          );
        })}

      </div>
    </section>
  );
}
