import { useMemo, useState } from 'react';
import { TopBar } from './components/TopBar';
import { fish } from './data/fish';
import { habitats } from './data/habitats';
import { defaultFilters, type FishFilters } from './types/domain';
import { filterFish } from './utils/filterFish';

export default function App() {
  const [selectedHabitatId, setSelectedHabitatId] = useState(habitats[0].id);
  const [selectedFishId, setSelectedFishId] = useState<string | null>(null);
  const [filters, setFilters] = useState<FishFilters>(defaultFilters);
  const [searchQuery, setSearchQuery] = useState('');

  const selectedHabitat = habitats.find((habitat) => habitat.id === selectedHabitatId) ?? habitats[0];
  const visibleFish = useMemo(() => filterFish(fish, filters, searchQuery), [filters, searchQuery]);
  const selectedFish = fish.find((item) => item.id === selectedFishId) ?? null;

  return (
    <main className="app-shell">
      <TopBar selectedHabitat={selectedHabitat} searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <section className="atlas-layout" aria-label="观赏鱼原生地图谱">
        <aside className="filter-rail">
          <h2>生态条件</h2>
          <button
            type="button"
            onClick={() => {
              setFilters(defaultFilters);
              setSelectedHabitatId(habitats[0].id);
              setSelectedFishId(null);
            }}
          >
            重置筛选
          </button>
        </aside>
        <section className="map-stage">
          <p>{selectedHabitat.description}</p>
          <p>当前可见鱼种：{visibleFish.length}</p>
        </section>
        <aside className="detail-panel">
          <h2>{selectedFish ? selectedFish.chineseName : selectedHabitat.subtitle}</h2>
        </aside>
      </section>
    </main>
  );
}
