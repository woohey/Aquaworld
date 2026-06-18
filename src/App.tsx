import { useMemo, useState } from 'react';
import { CompatibilityBar } from './components/CompatibilityBar';
import { DetailPanel } from './components/DetailPanel';
import { FilterRail } from './components/FilterRail';
import { FishList } from './components/FishList';
import { HabitatMap } from './components/HabitatMap';
import { TopBar } from './components/TopBar';
import { fish } from './data/fish';
import { habitats } from './data/habitats';
import { defaultFilters, type FishFilters } from './types/domain';
import { filterFish } from './utils/filterFish';

const initialHabitatId = habitats[0].id;
const createHabitatFilters = (habitatId: string): FishFilters => ({ ...defaultFilters, habitatId });

export default function App() {
  const [selectedHabitatId, setSelectedHabitatId] = useState(initialHabitatId);
  const [selectedFishId, setSelectedFishId] = useState<string | null>(null);
  const [filters, setFilters] = useState<FishFilters>(() => createHabitatFilters(initialHabitatId));
  const [searchQuery, setSearchQuery] = useState('');

  const selectedHabitat = habitats.find((habitat) => habitat.id === selectedHabitatId) ?? habitats[0];
  const visibleFish = useMemo(() => filterFish(fish, filters, searchQuery), [filters, searchQuery]);
  const selectedFish = visibleFish.find((item) => item.id === selectedFishId) ?? null;
  const resetFilters = () => {
    const habitatId = habitats[0].id;

    setFilters(createHabitatFilters(habitatId));
    setSelectedHabitatId(habitatId);
    setSelectedFishId(null);
    setSearchQuery('');
  };

  return (
    <main className="app-shell">
      <TopBar selectedHabitat={selectedHabitat} searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <section className="atlas-layout" aria-label="观赏鱼原生地图谱">
        <FilterRail
          habitats={habitats}
          filters={filters}
          selectedHabitatId={selectedHabitatId}
          onFiltersChange={setFilters}
          onHabitatSelect={(habitatId) => {
            setSelectedHabitatId(habitatId);
            setSelectedFishId(null);
            setFilters((current) => ({ ...current, habitatId }));
          }}
          onReset={resetFilters}
        />
        <div className="map-column">
          <HabitatMap
            habitats={habitats}
            fish={visibleFish}
            selectedHabitatId={selectedHabitatId}
            selectedFishId={selectedFishId}
            onHabitatSelect={(habitatId) => {
              setSelectedHabitatId(habitatId);
              setSelectedFishId(null);
              setFilters((current) => ({ ...current, habitatId }));
            }}
            onFishSelect={setSelectedFishId}
          />
          <FishList
            fish={visibleFish}
            selectedFishId={selectedFishId}
            onFishSelect={setSelectedFishId}
            onReset={resetFilters}
          />
        </div>
        <DetailPanel habitat={selectedHabitat} fish={selectedFish} />
      </section>
      <CompatibilityBar fish={selectedFish} />
    </main>
  );
}
