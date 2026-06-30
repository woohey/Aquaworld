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
  const selectedHabitat = habitats.find((item) => item.id === selectedHabitatId) ?? habitats[0];

  return (
    <section className="world-scroll-canvas" aria-label="沉浸式世界画卷">
      <div className="world-scroll-canvas__mist" aria-hidden="true" />
      <div className="world-scroll-canvas__paper" aria-hidden="true">
        <div className="world-scroll-canvas__backdrop" />
      </div>
      <div className="world-scroll-canvas__scene" aria-hidden="true">
        <span className="scroll-bird scroll-bird--one" />
        <span className="scroll-bird scroll-bird--two" />
        <span className="scroll-bird scroll-bird--three" />
      </div>
      <div className="world-scroll-canvas__flow" aria-hidden="true" />
      <div className="world-scroll-canvas__motion" aria-hidden="true">
        <span className="scroll-cloud scroll-cloud--one" />
        <span className="scroll-cloud scroll-cloud--two" />
        <span className="scroll-cloud scroll-cloud--three" />
        <span className="scroll-wave scroll-wave--one" />
        <span className="scroll-wave scroll-wave--two" />
        <span className="scroll-wave scroll-wave--three" />
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

        <aside
          className="world-scroll-canvas__overview-card"
          style={{ ...getHabitatVisualStyle(selectedHabitat) } as CSSProperties}
          aria-label={`${selectedHabitat.name} 概述`}
        >
          <p>{selectedHabitat.englishName}</p>
          <h2>{selectedHabitat.name}</h2>
          <span>{selectedHabitat.subtitle}</span>
          <dl>
            <div>
              <dt>水体</dt>
              <dd>{selectedHabitat.waterType}</dd>
            </div>
            <div>
              <dt>温度</dt>
              <dd>
                {selectedHabitat.temperatureRange.min}-{selectedHabitat.temperatureRange.max}°C
              </dd>
            </div>
          </dl>
        </aside>
      </div>
    </section>
  );
}
