import type { CSSProperties } from 'react';
import { getFishColorToken, getHabitatVisualStyle } from '../data/visualTheme';
import type { Fish, Habitat } from '../types/domain';
import { ScrollMapFrame } from './ScrollMapFrame';

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
      <ScrollMapFrame>
        {habitats.map((habitat) => (
          <button
            key={habitat.id}
            type="button"
            className={`habitat-node ${habitat.id === selectedHabitatId ? 'is-selected' : ''}`}
            style={
              {
                left: `${habitat.mapPosition.x}%`,
                top: `${habitat.mapPosition.y}%`,
                ...getHabitatVisualStyle(habitat),
              } as CSSProperties
            }
            onClick={() => onHabitatSelect(habitat.id)}
            aria-label={habitat.name}
            aria-pressed={habitat.id === selectedHabitatId}
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
                '--fish-color': getFishColorToken(item.colors[0]),
              } as CSSProperties
            }
            onClick={() => onFishSelect(item.id)}
            aria-label={`${item.chineseName} ${item.commonName}`}
            aria-pressed={item.id === selectedFishId}
          >
            <span className="fish-marker__shape" />
            <span className="fish-marker__label">{item.chineseName}</span>
          </button>
        ))}
      </ScrollMapFrame>
    </section>
  );
}
