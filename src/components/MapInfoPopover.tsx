import type { Fish, Habitat } from '../types/domain';

type MapInfoPopoverProps = {
  habitat: Habitat;
  fish: Fish | null;
  representativeFish: Fish[];
  onClose: () => void;
  onFishSelect: (fishId: string) => void;
};

function formatRange(range: { min: number; max: number }, unit = '') {
  return `${range.min}-${range.max}${unit}`;
}

function CompatibilitySummary({ fish }: { fish: Fish }) {
  return (
    <dl className="compatibility-summary">
      <div>
        <dt>通常适合</dt>
        <dd>{fish.compatibility.usuallySuitable.join('、') || '暂无'}</dd>
      </div>
      <div>
        <dt>需要谨慎</dt>
        <dd>{fish.compatibility.useCaution.join('、') || '暂无'}</dd>
      </div>
      <div>
        <dt>不建议</dt>
        <dd>{fish.compatibility.notRecommended.join('、') || '暂无'}</dd>
      </div>
    </dl>
  );
}

export function MapInfoPopover({ habitat, fish, representativeFish, onClose, onFishSelect }: MapInfoPopoverProps) {
  const title = fish?.chineseName ?? habitat.name;

  return (
    <aside className="map-info-popover" role="dialog" aria-label={`${title} 信息`} aria-modal="false">
      <button type="button" className="map-info-popover__close" onClick={onClose} aria-label="关闭信息框">
        ×
      </button>

      {fish ? (
        <div className="map-info-popover__content map-info-popover__content--fish">
          <p className="map-info-popover__eyebrow">{fish.commonName}</p>
          <h2>{fish.chineseName}</h2>
          <p className="scientific-name">{fish.scientificName}</p>
          <p>{fish.storyNote}</p>

          <dl className="metric-grid metric-grid--compact">
            <div>
              <dt>水温</dt>
              <dd>{formatRange(fish.temperatureRange, '°C')}</dd>
            </div>
            <div>
              <dt>pH</dt>
              <dd>{formatRange(fish.phRange)}</dd>
            </div>
            <div>
              <dt>体长</dt>
              <dd>{fish.adultSizeCm}cm</dd>
            </div>
            <div>
              <dt>泳层</dt>
              <dd>{fish.swimLayer}</dd>
            </div>
          </dl>

          <div className="tag-row" aria-label="视觉标签">
            {fish.visualTags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <CompatibilitySummary fish={fish} />
        </div>
      ) : (
        <div className="map-info-popover__content map-info-popover__content--habitat">
          <p className="map-info-popover__eyebrow">{habitat.englishName}</p>
          <h2>{habitat.name}</h2>
          <p>{habitat.subtitle}</p>
          <p>{habitat.description}</p>

          <dl className="metric-grid metric-grid--compact">
            <div>
              <dt>水体</dt>
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
              <dd>{formatRange(habitat.hardnessRange)}</dd>
            </div>
          </dl>

          <div className="representative-fish" aria-label="代表鱼种">
            {representativeFish.map((item) => (
              <button key={item.id} type="button" onClick={() => onFishSelect(item.id)} aria-label={`查看${item.chineseName}`}>
                {item.chineseName}
              </button>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}
