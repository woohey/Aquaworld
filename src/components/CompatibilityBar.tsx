import type { Fish } from '../types/domain';

type CompatibilityBarProps = {
  fish: Fish | null;
};

export function CompatibilityBar({ fish }: CompatibilityBarProps) {
  if (!fish) {
    return null;
  }

  const groups = [
    { label: '通常适合', ids: fish.compatibility.usuallySuitable },
    { label: '需要谨慎', ids: fish.compatibility.useCaution },
    { label: '不建议尝试', ids: fish.compatibility.notRecommended },
  ];

  return (
    <aside className="compatibility-bar compatibility-bar--note-strip" aria-label={`${fish.chineseName} 混养提示`}>
      {groups.map((group) => (
        <section key={group.label}>
          <h3>{group.label}</h3>
          <p>{group.ids.length > 0 ? group.ids.join('、') : '暂无'}</p>
        </section>
      ))}
      <p className="compatibility-note">{fish.compatibility.notes}</p>
    </aside>
  );
}
