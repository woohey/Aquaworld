import type { Fish } from '../types/domain';

type FishListProps = {
  fish: Fish[];
  selectedFishId: string | null;
  onFishSelect: (fishId: string) => void;
  onReset: () => void;
};

export function FishList({ fish, selectedFishId, onFishSelect, onReset }: FishListProps) {
  if (fish.length === 0) {
    return (
      <section className="empty-state" aria-label="鱼种筛选结果">
        <h2>没有符合条件的鱼种</h2>
        <button type="button" className="secondary-button" onClick={onReset}>
          重置筛选
        </button>
      </section>
    );
  }

  return (
    <section className="fish-list" aria-label="鱼种列表">
      {fish.map((item) => (
        <button
          key={item.id}
          type="button"
          className={item.id === selectedFishId ? 'is-selected' : ''}
          onClick={() => onFishSelect(item.id)}
          aria-label={`${item.chineseName} ${item.commonName}`}
          aria-pressed={item.id === selectedFishId}
        >
          <span>{item.chineseName}</span>
          <small>{item.commonName}</small>
        </button>
      ))}
    </section>
  );
}
