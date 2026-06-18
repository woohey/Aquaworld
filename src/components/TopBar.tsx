import type { Habitat } from '../types/domain';

type TopBarProps = {
  selectedHabitat: Habitat;
  searchQuery: string;
  onSearchChange: (value: string) => void;
};

export function TopBar({ selectedHabitat, searchQuery, onSearchChange }: TopBarProps) {
  return (
    <header className="top-bar">
      <div>
        <p className="product-name">Aqua Biotope Atlas</p>
        <h1>观赏鱼原生地探索图谱</h1>
      </div>
      <div className="top-bar__context">
        <span>{selectedHabitat.name}</span>
        <label>
          搜索鱼种
          <input
            aria-label="搜索鱼种"
            value={searchQuery}
            onChange={(event) => onSearchChange(event.target.value)}
            aria-describedby="fish-search-help"
          />
          <span id="fish-search-help" className="sr-only">可输入中文名、英文名或学名</span>
        </label>
      </div>
    </header>
  );
}
