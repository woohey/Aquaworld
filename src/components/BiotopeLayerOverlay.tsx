import type { CSSProperties } from 'react';
import { useState } from 'react';
import biotopeAmazon from '../assets/biotope-amazon.webp';
import biotopeSeasia from '../assets/biotope-seasia.webp';
import biotopeRiftlake from '../assets/biotope-riftlake.webp';
import biotopeAdaptable from '../assets/biotope-adaptable.webp';
import biotopeCentralam from '../assets/biotope-centralam.webp';
import biotopeCoralreef from '../assets/biotope-coralreef.webp';
import biotopeChina from '../assets/biotope-china.webp';
import neonTetraSprite from '../assets/fish/neon-tetra-sprite.webp';
import bettaSprite from '../assets/fish/betta-sprite.webp';
import clownfishSprite from '../assets/fish/clownfish-sprite.webp';
import discusSprite from '../assets/fish/discus-sprite.webp';
import firemouthSprite from '../assets/fish/firemouth-cichlid-sprite.webp';
import guppySprite from '../assets/fish/guppy-sprite.webp';
import mbunaSprite from '../assets/fish/mbuna-cichlid-sprite.webp';
import whiteCloudSprite from '../assets/fish/white-cloud-minnow-sprite.webp';
import cardinalSprite from '../assets/fish/cardinal-tetra-sprite.webp';
import harlequinSprite from '../assets/fish/harlequin-rasbora-sprite.webp';
import pearlGouramiSprite from '../assets/fish/pearl-gourami-sprite.webp';
import shellDwellerSprite from '../assets/fish/shell-dweller-sprite.webp';
import swordtailSprite from '../assets/fish/swordtail-sprite.webp';
import blueTangSprite from '../assets/fish/blue-tang-sprite.webp';
import cherryBarbSprite from '../assets/fish/cherry-barb-sprite.webp';
import paradiseFishSprite from '../assets/fish/paradise-fish-sprite.webp';
import convictSprite from '../assets/fish/convict-cichlid-sprite.webp';
import flameSprite from '../assets/fish/flame-angelfish-sprite.webp';
import apistogrammaSprite from '../assets/fish/apistogramma-sprite.webp';
import pencilfishSprite from '../assets/fish/pencilfish-sprite.webp';
import corydorasSprite from '../assets/fish/corydoras-sprite.webp';
import tigerBarbSprite from '../assets/fish/tiger-barb-sprite.webp';
import rainbowSharkSprite from '../assets/fish/rainbow-shark-sprite.webp';
import frontosaSprite from '../assets/fish/frontosa-sprite.webp';
import electricBlueHapSprite from '../assets/fish/electric-blue-hap-sprite.webp';
import blueDolphinSprite from '../assets/fish/blue-dolphin-cichlid-sprite.webp';
import platySprite from '../assets/fish/platy-sprite.webp';
import mollySprite from '../assets/fish/molly-sprite.webp';
import medakaSprite from '../assets/fish/medaka-sprite.webp';
import blueGouramiSprite from '../assets/fish/blue-gourami-sprite.webp';
import zebraDanioSprite from '../assets/fish/zebra-danio-sprite.webp';
import sailfinMollySprite from '../assets/fish/sailfin-molly-sprite.webp';
import texasCichlidSprite from '../assets/fish/texas-cichlid-sprite.webp';
import pearlscaleSprite from '../assets/fish/pearlscale-cichlid-sprite.webp';
import lyretailAnthiasSprite from '../assets/fish/lyretail-anthias-sprite.webp';
import damselfishSprite from '../assets/fish/damselfish-sprite.webp';
import reefGobySprite from '../assets/fish/reef-goby-sprite.webp';
import hillstreamLoachSprite from '../assets/fish/hillstream-loach-sprite.webp';
import chineseBitterlingSprite from '../assets/fish/chinese-bitterling-sprite.webp';
import chineseMedakaSprite from '../assets/fish/chinese-medaka-sprite.webp';
import streamGobySprite from '../assets/fish/stream-goby-sprite.webp';
import butterflyCichlidSprite from '../assets/fish/butterfly-cichlid-sprite.webp';
import { fishPhotoUrls } from '../data/fishMedia';
import type { Fish, Habitat, SwimLayer } from '../types/domain';

const fishSpriteUrls: Record<string, string> = {
  'neon-tetra': neonTetraSprite,
  betta: bettaSprite,
  clownfish: clownfishSprite,
  discus: discusSprite,
  'firemouth-cichlid': firemouthSprite,
  guppy: guppySprite,
  'mbuna-cichlid': mbunaSprite,
  'white-cloud-minnow': whiteCloudSprite,
  'cardinal-tetra': cardinalSprite,
  'harlequin-rasbora': harlequinSprite,
  'pearl-gourami': pearlGouramiSprite,
  'shell-dweller': shellDwellerSprite,
  swordtail: swordtailSprite,
  'blue-tang': blueTangSprite,
  'cherry-barb': cherryBarbSprite,
  'paradise-fish': paradiseFishSprite,
  'convict-cichlid': convictSprite,
  'flame-angelfish': flameSprite,
  apistogramma: apistogrammaSprite,
  pencilfish: pencilfishSprite,
  corydoras: corydorasSprite,
  'tiger-barb': tigerBarbSprite,
  'rainbow-shark': rainbowSharkSprite,
  frontosa: frontosaSprite,
  'electric-blue-hap': electricBlueHapSprite,
  'blue-dolphin-cichlid': blueDolphinSprite,
  platy: platySprite,
  molly: mollySprite,
  medaka: medakaSprite,
  'blue-gourami': blueGouramiSprite,
  'zebra-danio': zebraDanioSprite,
  'sailfin-molly': sailfinMollySprite,
  'texas-cichlid': texasCichlidSprite,
  'pearlscale-cichlid': pearlscaleSprite,
  'lyretail-anthias': lyretailAnthiasSprite,
  damselfish: damselfishSprite,
  goby: reefGobySprite,
  'hillstream-loach': hillstreamLoachSprite,
  'chinese-bitterling': chineseBitterlingSprite,
  'chinese-medaka': chineseMedakaSprite,
  'stream-goby': streamGobySprite,
  'butterfly-cichlid': butterflyCichlidSprite,
};

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
  yBase: number;
  yRange: number;
};

const swimLayers: LayerDefinition[] = [
  { key: 'top', label: '上层鱼类', detail: '表层活动鱼类', yBase: 10, yRange: 8 },
  { key: 'middle', label: '中层鱼类', detail: '中层游动鱼类', yBase: 48, yRange: 8 },
  { key: 'bottom', label: '底层鱼类', detail: '底栖活动鱼类', yBase: 85, yRange: 6 },
];

/* Stable numeric hash from fish id, used for both vertical and horizontal jitter */
function fishIdHash(fishId: string): number {
  let hash = 0;
  for (let i = 0; i < fishId.length; i++) {
    hash = ((hash << 5) - hash + fishId.charCodeAt(i)) | 0;
  }
  return hash;
}

function fishYOffset(hash: number, range: number) {
  return ((hash % 100) / 100) * range - range / 2;
}

function fishXJitter(hash: number) {
  return (((hash >> 4) % 100) / 100) * 6 - 3; // ±3%
}

/* Size scale: wider range for visible size differences, capped to avoid extremes */
function fishSizeMultiplier(fish: Fish) {
  const raw = 0.55 + fish.adultSizeCm * 0.07;
  return Math.min(Math.max(raw, 0.6), 2.2);
}

const biotopeBackgrounds: Record<string, string> = {
  'amazon-blackwater': biotopeAmazon,
  'southeast-asian-streams': biotopeSeasia,
  'african-rift-lakes': biotopeRiftlake,
  'south-asian-slow-waters': biotopeAdaptable,
  'central-american-rivers': biotopeCentralam,
  'coral-reef-shallows': biotopeCoralreef,
  'chinese-southern-streams': biotopeChina,
};

const habitatRegionLabels: Record<string, string> = {
  'amazon-blackwater': '南美洲',
  'central-american-rivers': '中美洲',
  'african-rift-lakes': '非洲',
  'south-asian-slow-waters': '适应型群落',
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
      className={`biotope-layer-overlay${selectedFish ? ' has-panel' : ''}`}
      role="dialog"
      aria-label={`${habitat.name} 原生鱼层`}
      aria-modal="false"
      style={
        {
          '--biotope-primary': habitat.colorPalette.primary,
          '--biotope-secondary': habitat.colorPalette.secondary,
          '--biotope-glow': habitat.colorPalette.glow,
          '--biotope-background': `url(${biotopeBackgrounds[habitat.id]})`,
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
              const baseSize = layer.key === 'top' ? 101 : layer.key === 'middle' ? 154 : 129;
              const multiplier = fishSizeMultiplier(item);
              const size = Math.round(baseSize * multiplier);
              const hash = fishIdHash(item.id);
              const xJitter = fishXJitter(hash);
              const totalFish = layerFish.length;
              // Center small groups, spread larger ones
              const startPct = totalFish <= 2 ? 28 : totalFish <= 3 ? 18 : 8;
              const endPct = totalFish <= 2 ? 72 : totalFish <= 3 ? 82 : 92;
              const left = totalFish <= 1
                ? 50 + xJitter
                : startPct + (index / (totalFish - 1)) * (endPct - startPct) + xJitter;
              const yOffset = fishYOffset(hash, layer.yRange);
              const top = layer.yBase + yOffset;
              const photoUrl = fishPhotoUrls[item.id];
              const spriteUrl = fishSpriteUrls[item.id];
              const imageBroken = brokenImages[item.id] === true;
              const useSprite = spriteUrl && multiplier < 1.3;

              return (
                <button
                  key={item.id}
                  type="button"
                  className={`biotope-fish-node biotope-fish-node--${layer.key} ${selectedFish?.id === item.id ? 'is-selected' : ''} ${useSprite ? 'has-sprite' : ''}`}
                  style={
                    {
                      left: `${left}%`,
                      top: `${top}%`,
                      '--fish-node-size': `${size}px`,
                      '--fish-drift-delay': `${index * -0.7}s`,
                      ...(spriteUrl ? { '--sprite-url': `url(${spriteUrl})` } : {}),
                    } as CSSProperties
                  }
                  onClick={() => onFishSelect(item.id)}
                  aria-label={`查看${item.chineseName}鱼层详情`}
                >
                  {useSprite ? (
                    <span className="biotope-fish-node__sprite" aria-hidden="true" />
                  ) : photoUrl && !imageBroken ? (
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

        {selectedFish ? (
          <div className="biotope-layer-overlay__panel">
            <button
              type="button"
              className="biotope-layer-overlay__panel-close"
              onClick={() => onFishSelect('')}
              aria-label="关闭鱼种详情"
            >
              ×
            </button>
            <div className="biotope-layer-overlay__panel-content">
              <div className="biotope-layer-overlay__panel-head">
                <div className="biotope-layer-overlay__panel-avatar">
                  {fishPhotoUrls[selectedFish.id] && brokenImages[selectedFish.id] !== true ? (
                    <img
                      src={fishPhotoUrls[selectedFish.id]}
                      alt={`${selectedFish.chineseName}鱼图`}
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
          </div>
        ) : null}
      </div>
    </aside>
  );
}
