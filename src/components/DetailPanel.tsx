import type { CSSProperties } from 'react';
import { getFishColorToken } from '../data/colorTokens';
import type { Fish, Habitat, Range } from '../types/domain';

type DetailPanelProps = {
  habitat: Habitat;
  fish: Fish | null;
};

const formatRange = (range: Range, suffix = '') => `${range.min}-${range.max}${suffix}`;
const getFishColor = (fish: Fish) => getFishColorToken(fish.colors[0]);

export function DetailPanel({ habitat, fish }: DetailPanelProps) {
  if (!fish) {
    return (
      <aside className="detail-panel detail-panel--habitat" aria-label={`${habitat.name} 原生地概览`}>
        <div className="panel-heading">
          <p>{habitat.englishName}</p>
          <h2>{habitat.name}</h2>
        </div>
        <h3>{habitat.subtitle}</h3>
        <p className="detail-copy">{habitat.description}</p>
        <dl className="stat-grid">
          <div>
            <dt>水质</dt>
            <dd>{habitat.waterType}</dd>
          </div>
          <div>
            <dt>水温</dt>
            <dd>{formatRange(habitat.temperatureRange, '°C')}</dd>
          </div>
          <div>
            <dt>pH</dt>
            <dd>{formatRange(habitat.phRange)}</dd>
          </div>
          <div>
            <dt>硬度</dt>
            <dd>{formatRange(habitat.hardnessRange, ' dGH')}</dd>
          </div>
        </dl>
        <p className="story-note">{habitat.visualMood}</p>
      </aside>
    );
  }

  return (
    <aside className="detail-panel detail-panel--specimen" aria-label={`${fish.chineseName} 鱼种详情`}>
      <div className="fish-art" aria-hidden="true">
        <span className="fish-art__body" style={{ '--fish-color': getFishColor(fish) } as CSSProperties} />
      </div>
      <div className="panel-heading">
        <p>{fish.commonName}</p>
        <h2>{fish.chineseName}</h2>
      </div>
      <p className="scientific-name">{fish.scientificName}</p>
      <p className="detail-copy">{fish.habitat}</p>
      <p className="story-note">{fish.storyNote}</p>
      <dl className="stat-grid">
        <div>
          <dt>原产</dt>
          <dd>{fish.originRegion}</dd>
        </div>
        <div>
          <dt>水温</dt>
          <dd>{formatRange(fish.temperatureRange, '°C')}</dd>
        </div>
        <div>
          <dt>pH</dt>
          <dd>{formatRange(fish.phRange)}</dd>
        </div>
        <div>
          <dt>成体</dt>
          <dd>{fish.adultSizeCm} cm</dd>
        </div>
        <div>
          <dt>泳层</dt>
          <dd>{fish.swimLayer}</dd>
        </div>
        <div>
          <dt>群游</dt>
          <dd>{fish.schooling}</dd>
        </div>
      </dl>
      <div className="tag-row tag-row--specimen" aria-label="视觉标签">
        {fish.visualTags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
    </aside>
  );
}
