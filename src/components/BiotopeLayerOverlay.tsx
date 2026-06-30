import type { CSSProperties } from 'react';
import { useState } from 'react';
import biotopeLayerBackground from '../assets/biotope-layer-background.png';
import { fishPhotoUrls } from '../data/fishMedia';
import type { Fish, Habitat, SwimLayer } from '../types/domain';

type BiotopeLayerOverlayProps = {
  habitat: Habitat;
  fish: Fish[];
  selectedFish: Fish | null;
  onClose: () => void;
  onFishSelect: (fishId: string) => void;
};

type LayerDefinition = {
  key: SwimLayer;
  label: string;
  detail: string;
  y: number;
};

const swimLayers: LayerDefinition[] = [
  { key: 'top', label: '上层鱼类', detail: '表层活动鱼类', y: 24 },
  { key: 'middle', label: '中层鱼类', detail: '中层游动鱼类', y: 50 },
  { key: 'bottom', label: '底层鱼类', detail: '底栖活动鱼类', y: 78 },
];

const habitatRegionLabels: Record<string, string> = {
  'amazon-blackwater': '南美洲',
  'central-american-rivers': '中美洲',
  'african-rift-lakes': '非洲',
  'south-asian-slow-waters': '适应型浅水',
  'southeast-asian-streams': '东南亚',
  'chinese-southern-streams': '东亚',
  'coral-reef-shallows': '大洋区',
};

function formatRange(range: { min: number; max: number }, unit = '') {
  return `${range.min}-${range.max}${unit}`;
}

function getLayerLabel(layer: SwimLayer) {
  if (layer === 'top') return '上层';
  if (layer === 'middle') return '中层';
  if (layer === 'bottom') return '底层';
  return '全层';
}

function getFishForLayer(fish: Fish[], layer: SwimLayer) {
  return fish.filter((item) => item.swimLayer === layer || item.swimLayer === 'all');
}

export function BiotopeLayerOverlay({ habitat, fish, selectedFish, onClose, onFishSelect }: BiotopeLayerOverlayProps) {
  const [brokenImages, setBrokenImages] = useState<Record<string, true>>({});
  const visibleFish = fish.length > 0 ? fish : [];

  return (
    <aside
      className="biotope-layer-overlay"
      role="dialog"
      aria-label={`${habitat.name} 原生鱼层`}
      aria-modal="false"
      style={
        {
          '--biotope-primary': habitat.colorPalette.primary,
          '--biotope-secondary': habitat.colorPalette.secondary,
          '--biotope-glow': habitat.colorPalette.glow,
          '--biotope-background': `url(${biotopeLayerBackground})`,
        } as CSSProperties
      }
    >
      <button type="button" className="biotope-layer-overlay__close" onClick={onClose} aria-label="关闭原生鱼层">
        ×
      </button>

      <div className="biotope-layer-overlay__topbar">
        <div className="biotope-layer-overlay__title">
          <p>{habitat.englishName}</p>
          <h2>{habitat.name}</h2>
        </div>
        <p className="biotope-layer-overlay__summary">{habitat.description}</p>
        <dl className="biotope-layer-overlay__metrics">
                <div>
                  <dt>所在地洲</dt>
                  <dd>{habitatRegionLabels[habitat.id] ?? habitat.englishName}</dd>
                </div>
          <div>
            <dt>主要水质</dt>
            <dd>{habitat.waterType}</dd>
          </div>
          <div>
            <dt>典型特征</dt>
            <dd>{habitat.visualMood}</dd>
          </div>
        </dl>
      </div>

      <div className="biotope-layer-overlay__stage">
        <div className="biotope-layer-overlay__background" aria-hidden="true" />
        <div className="biotope-layer-overlay__veil" aria-hidden="true" />

        <div className="biotope-layer-overlay__layers" aria-hidden="true">
          {swimLayers.map((layer) => (
            <div key={layer.key} className={`layer-rail layer-rail--${layer.key}`}>
              <span className="layer-rail__badge">{layer.label}</span>
              <small>{layer.detail}</small>
            </div>
          ))}
        </div>

        <div className="biotope-layer-overlay__fish-field">
          {swimLayers.flatMap((layer) => {
            const layerFish = getFishForLayer(visibleFish, layer.key);

            return layerFish.map((item, index) => {
              const left = 14 + (index * 68) / Math.max(layerFish.length, 1);
              const size = layer.key === 'top' ? 72 : layer.key === 'middle' ? 110 : 92;
              const photoUrl = fishPhotoUrls[item.id];
              const imageBroken = brokenImages[item.id] === true;

              return (
                <button
                  key={item.id}
                  type="button"
                  className={`biotope-fish-node biotope-fish-node--${layer.key} ${selectedFish?.id === item.id ? 'is-selected' : ''}`}
                  style={
                    {
                      left: `${left}%`,
                      top: `${layer.y}%`,
                      '--fish-node-size': `${size}px`,
                      '--fish-drift-delay': `${index * -0.7}s`,
                    } as CSSProperties
                  }
                  onClick={() => onFishSelect(item.id)}
                  aria-label={`查看${item.chineseName}鱼层详情`}
                >
                  {photoUrl && !imageBroken ? (
                    <img
                      src={photoUrl}
                      alt={`${item.chineseName}真实鱼图`}
                      loading="lazy"
                      onError={() => setBrokenImages((current) => ({ ...current, [item.id]: true }))}
                    />
                  ) : (
                    <span className="biotope-fish-node__fallback" aria-hidden="true" />
                  )}
                  <span className="biotope-fish-node__name">{item.chineseName}</span>
                </button>
              );
            });
          })}
        </div>

        <div className="biotope-layer-overlay__panel">
          {selectedFish ? (
            <div className="biotope-layer-overlay__panel-content">
              <div className="biotope-layer-overlay__panel-head">
                <div className="biotope-layer-overlay__panel-avatar">
                  {fishPhotoUrls[selectedFish.id] && brokenImages[selectedFish.id] !== true ? (
                    <img
                      src={fishPhotoUrls[selectedFish.id]}
                      alt={`${selectedFish.chineseName}真实鱼图`}
                      loading="lazy"
                      onError={() => setBrokenImages((current) => ({ ...current, [selectedFish.id]: true }))}
                    />
                  ) : (
                    <span className="biotope-fish-node__fallback" aria-hidden="true" />
                  )}
                </div>
                <div>
                  <h3>{selectedFish.chineseName}</h3>
                  <p>{selectedFish.scientificName}</p>
                  <span>{selectedFish.commonName}</span>
                </div>
              </div>

              <dl className="biotope-layer-overlay__detail-grid">
                <div>
                  <dt>体长</dt>
                  <dd>{selectedFish.adultSizeCm}cm</dd>
                </div>
                <div>
                  <dt>分布层</dt>
                  <dd>{getLayerLabel(selectedFish.swimLayer)}</dd>
                </div>
                <div>
                  <dt>温度</dt>
                  <dd>{formatRange(selectedFish.temperatureRange, '°C')}</dd>
                </div>
                <div>
                  <dt>pH 范围</dt>
                  <dd>{formatRange(selectedFish.phRange)}</dd>
                </div>
              </dl>

              <p className="biotope-layer-overlay__story">{selectedFish.storyNote}</p>
            </div>
          ) : (
            <div className="biotope-layer-overlay__panel-content">
              <h3>{habitat.name}</h3>
              <p>{habitat.subtitle}</p>
              <dl className="biotope-layer-overlay__detail-grid">
                <div>
                  <dt>水温</dt>
                  <dd>{formatRange(habitat.temperatureRange, '°C')}</dd>
                </div>
                <div>
                  <dt>pH 范围</dt>
                  <dd>{formatRange(habitat.phRange)}</dd>
                </div>
                <div>
                  <dt>硬度</dt>
                  <dd>{formatRange(habitat.hardnessRange)}</dd>
                </div>
                <div>
                  <dt>可见鱼种</dt>
                  <dd>{visibleFish.length}</dd>
                </div>
              </dl>
              <p className="biotope-layer-overlay__story">{habitat.description}</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
