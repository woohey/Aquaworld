import type { CSSProperties } from 'react';
import type { Fish, Habitat } from '../types/domain';

type HabitatMapProps = {
  habitats: Habitat[];
  fish: Fish[];
  selectedHabitatId: string;
  selectedFishId: string | null;
  onHabitatSelect: (habitatId: string) => void;
  onFishSelect: (fishId: string) => void;
};

export function HabitatMap({
  habitats,
  fish,
  selectedHabitatId,
  selectedFishId,
  onHabitatSelect,
  onFishSelect,
}: HabitatMapProps) {
  return (
    <section className="map-stage" aria-label="原生地生态图谱">
      <div className="map-waterlines" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      {habitats.map((habitat) => (
        <button
          key={habitat.id}
          type="button"
          className={`habitat-node ${habitat.id === selectedHabitatId ? 'is-selected' : ''}`}
          style={
            {
              left: `${habitat.mapPosition.x}%`,
              top: `${habitat.mapPosition.y}%`,
              '--node-primary': habitat.colorPalette.primary,
              '--node-secondary': habitat.colorPalette.secondary,
              '--node-glow': habitat.colorPalette.glow,
            } as CSSProperties
          }
          onClick={() => onHabitatSelect(habitat.id)}
          aria-label={habitat.name}
        >
          <span className="habitat-node__orb" />
          <span className="habitat-node__name">
            <span className="habitat-node__name-text" aria-hidden="true">
              {Array.from(habitat.name).map((char, index) => (
                <span key={`${habitat.id}-${index}`}>{char}</span>
              ))}
            </span>
            <small>{habitat.englishName}</small>
          </span>
        </button>
      ))}

      {fish.map((item) => (
        <button
          key={item.id}
          type="button"
          className={`fish-marker ${item.id === selectedFishId ? 'is-selected' : ''}`}
          style={
            {
              left: `${item.markerPosition.x}%`,
              top: `${item.markerPosition.y}%`,
              '--fish-color': item.colors[0],
            } as CSSProperties
          }
          onClick={() => onFishSelect(item.id)}
          aria-label={`${item.chineseName} ${item.commonName}`}
        >
          <span className="fish-marker__shape" />
          <span className="fish-marker__label">{item.chineseName}</span>
        </button>
      ))}
    </section>
  );
}
