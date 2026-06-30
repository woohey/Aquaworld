import { useMemo, useState } from 'react';
import { BiotopeLayerOverlay } from './components/BiotopeLayerOverlay';
import { TuningDrawer } from './components/TuningDrawer';
import { WorldScrollCanvas } from './components/WorldScrollCanvas';
import { fish } from './data/fish';
import { habitats } from './data/habitats';
import { defaultFilters, type FishFilters } from './types/domain';
import { filterFish } from './utils/filterFish';

const initialHabitatId = habitats[0].id;

type ActiveOverlay =
  | { type: 'biotope' }
  | { type: 'tuning' }
  | null;

export default function App() {
  const [selectedHabitatId, setSelectedHabitatId] = useState(initialHabitatId);
  const [selectedFishId, setSelectedFishId] = useState<string | null>(null);
  const [filters, setFilters] = useState<FishFilters>(defaultFilters);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeOverlay, setActiveOverlay] = useState<ActiveOverlay>(null);

  const selectedHabitat = habitats.find((habitat) => habitat.id === selectedHabitatId) ?? habitats[0];
  const visibleFish = useMemo(() => filterFish(fish, filters, searchQuery), [filters, searchQuery]);
  const selectedFish = visibleFish.find((item) => item.id === selectedFishId) ?? null;
  const resetFilters = () => {
    setFilters(defaultFilters);
    setSelectedHabitatId(initialHabitatId);
    setSelectedFishId(null);
    setSearchQuery('');
  };
  const handleHabitatSelect = (habitatId: string) => {
    setSelectedHabitatId(habitatId);
    setSelectedFishId(null);
    setActiveOverlay({ type: 'biotope' });
  };
  const handleFishSelect = (fishId: string) => {
    const nextFish = visibleFish.find((item) => item.id === fishId) ?? fish.find((item) => item.id === fishId);

    if (nextFish) {
      setSelectedHabitatId(nextFish.habitatId);
    }

    setSelectedFishId(fishId);
    setActiveOverlay({ type: 'biotope' });
  };
  const handleFiltersChange = (nextFilters: FishFilters) => {
    setFilters(nextFilters);
    setSelectedFishId((currentFishId) => {
      const nextVisibleFish = filterFish(fish, nextFilters, searchQuery);
      const nextFishStillVisible = nextVisibleFish.some((item) => item.id === currentFishId);
      const nextHabitatStillVisible = nextVisibleFish.some((item) => item.habitatId === selectedHabitatId);

      if ((!nextFishStillVisible || !nextHabitatStillVisible) && activeOverlay?.type === 'biotope') {
        setActiveOverlay(null);
      }

      return nextFishStillVisible ? currentFishId : null;
    });
  };
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setSelectedFishId((currentFishId) => {
      const nextVisibleFish = filterFish(fish, filters, query);
      const nextFishStillVisible = nextVisibleFish.some((item) => item.id === currentFishId);
      const nextHabitatStillVisible = nextVisibleFish.some((item) => item.habitatId === selectedHabitatId);

      if ((!nextFishStillVisible || !nextHabitatStillVisible) && activeOverlay?.type === 'biotope') {
        setActiveOverlay(null);
      }

      return nextFishStillVisible ? currentFishId : null;
    });
  };
  const habitatFish = visibleFish.filter((item) => item.habitatId === selectedHabitat.id);
  const overlayFish = habitatFish.find((item) => item.id === selectedFishId) ?? null;

  return (
    <main className="app-shell app-shell--immersive-scroll">
      <header className="immersive-title">
        <p>Aqua Biotope Atlas</p>
        <h1>观赏鱼原生地探索图谱</h1>
      </header>
      <button type="button" className="tuning-trigger" onClick={() => setActiveOverlay({ type: 'tuning' })}>
        调境
      </button>

      <WorldScrollCanvas
        habitats={habitats}
        fish={visibleFish}
        selectedHabitatId={selectedHabitatId}
        selectedFishId={selectedFish?.id ?? null}
        onHabitatSelect={handleHabitatSelect}
        onFishSelect={handleFishSelect}
      />

      {activeOverlay?.type === 'biotope' ? (
        <BiotopeLayerOverlay
          habitat={selectedHabitat}
          fish={habitatFish}
          selectedFish={overlayFish}
          onClose={() => setActiveOverlay(null)}
          onFishSelect={handleFishSelect}
        />
      ) : null}

      {visibleFish.length === 0 ? <p className="world-empty-state">当前条件下暂无鱼种</p> : null}

      {activeOverlay?.type === 'tuning' ? (
        <TuningDrawer
          habitats={habitats}
          filters={filters}
          selectedHabitatId={selectedHabitatId}
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          onFiltersChange={handleFiltersChange}
          onHabitatSelect={(habitatId) => {
            setSelectedHabitatId(habitatId);
            setFilters((current) => ({ ...current, habitatId }));
          }}
          onReset={resetFilters}
          onClose={() => setActiveOverlay(null)}
        />
      ) : null}
    </main>
  );
}
