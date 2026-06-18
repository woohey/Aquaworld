import { fishColorOptions } from '../data/colorTokens';
import type { CareLevel, FishFilters, Habitat, Temperament } from '../types/domain';

type FilterRailProps = {
  habitats: Habitat[];
  filters: FishFilters;
  selectedHabitatId: string;
  onFiltersChange: (filters: FishFilters) => void;
  onHabitatSelect: (habitatId: string) => void;
  onReset: () => void;
};

const temperamentOptions: Array<{ value: Temperament | 'all'; label: string }> = [
  { value: 'all', label: '全部' },
  { value: 'peaceful', label: '温和' },
  { value: 'semiAggressive', label: '半攻击' },
  { value: 'aggressive', label: '攻击性强' },
];

const careOptions: Array<{ value: CareLevel | 'all'; label: string }> = [
  { value: 'all', label: '全部' },
  { value: 'easy', label: '容易' },
  { value: 'moderate', label: '中等' },
  { value: 'advanced', label: '进阶' },
];

export function FilterRail({
  habitats,
  filters,
  selectedHabitatId,
  onFiltersChange,
  onHabitatSelect,
  onReset,
}: FilterRailProps) {
  return (
    <aside className="filter-rail">
      <div className="panel-heading">
        <p>Ecology Tuning</p>
        <h2>生态条件</h2>
      </div>

      <label>
        原生地
        <select value={selectedHabitatId} onChange={(event) => onHabitatSelect(event.target.value)}>
          {habitats.map((habitat) => (
            <option key={habitat.id} value={habitat.id} label={habitat.name} />
          ))}
        </select>
      </label>

      <div className="range-filter">
        <label>
          水温 {filters.temperature ?? '全部'}°C
          <input
            type="range"
            min="16"
            max="30"
            value={filters.temperature ?? 23}
            onChange={(event) => onFiltersChange({ ...filters, temperature: Number(event.target.value) })}
          />
        </label>
        <button
          type="button"
          className="filter-reset-button"
          onClick={() => onFiltersChange({ ...filters, temperature: null })}
        >
          全部水温
        </button>
      </div>

      <div className="range-filter">
        <label>
          pH {filters.ph ?? '全部'}
          <input
            type="range"
            min="4.5"
            max="8.8"
            step="0.1"
            value={filters.ph ?? 7}
            onChange={(event) => onFiltersChange({ ...filters, ph: Number(event.target.value) })}
          />
        </label>
        <button
          type="button"
          className="filter-reset-button"
          onClick={() => onFiltersChange({ ...filters, ph: null })}
        >
          全部 pH
        </button>
      </div>

      <label>
        性格
        <select
          value={filters.temperament}
          onChange={(event) => onFiltersChange({ ...filters, temperament: event.target.value as Temperament | 'all' })}
        >
          {temperamentOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <div className="range-filter">
        <label>
          最大体长 {filters.maxAdultSizeCm ?? '全部'} cm
          <input
            type="range"
            min="3"
            max="30"
            value={filters.maxAdultSizeCm ?? 30}
            onChange={(event) => onFiltersChange({ ...filters, maxAdultSizeCm: Number(event.target.value) })}
          />
        </label>
        <button
          type="button"
          className="filter-reset-button"
          onClick={() => onFiltersChange({ ...filters, maxAdultSizeCm: null })}
        >
          全部体长
        </button>
      </div>

      <label>
        色彩
        <select value={filters.color} onChange={(event) => onFiltersChange({ ...filters, color: event.target.value })}>
          {fishColorOptions.map((color) => (
            <option key={color} value={color}>
              {color === 'all' ? '全部' : color}
            </option>
          ))}
        </select>
      </label>

      <label>
        饲养难度
        <select
          value={filters.careLevel}
          onChange={(event) => onFiltersChange({ ...filters, careLevel: event.target.value as CareLevel | 'all' })}
        >
          {careOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <button type="button" className="secondary-button" onClick={onReset}>
        重置筛选
      </button>
    </aside>
  );
}
