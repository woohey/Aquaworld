import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { fish } from '../../data/fish';
import { habitats } from '../../data/habitats';
import { WorldScrollCanvas } from '../WorldScrollCanvas';

describe('WorldScrollCanvas', () => {
  it('renders the seven basin regions as accessible buttons', () => {
    render(
      <WorldScrollCanvas
        habitats={habitats}
        fish={fish.slice(0, 2)}
        selectedHabitatId="amazon-blackwater"
        selectedFishId={null}
        onHabitatSelect={() => undefined}
        onFishSelect={() => undefined}
      />,
    );

    const canvas = screen.getByRole('region', { name: '沉浸式世界画卷' });

    expect(within(canvas).getAllByRole('button', { name: /流域/ })).toHaveLength(7);
    expect(within(canvas).getByRole('button', { name: '亚马逊黑水 流域' })).toHaveStyle({
      '--basin-x': '22%',
      '--basin-y': '42%',
    });
  });

  it('selects a basin and a fish from the world scroll', async () => {
    const user = userEvent.setup();
    const onHabitatSelect = vi.fn();
    const onFishSelect = vi.fn();

    render(
      <WorldScrollCanvas
        habitats={habitats}
        fish={fish}
        selectedHabitatId="amazon-blackwater"
        selectedFishId={null}
        onHabitatSelect={onHabitatSelect}
        onFishSelect={onFishSelect}
      />,
    );

    await user.click(screen.getByRole('button', { name: '中国南方溪流与稻田水域 流域' }));
    expect(onHabitatSelect).toHaveBeenCalledWith('chinese-southern-streams');

    await user.click(screen.getByRole('button', { name: '霓虹灯 Neon Tetra 鱼影' }));
    expect(onFishSelect).toHaveBeenCalledWith('neon-tetra');
  });

  it('dims basins without visible fish while preserving the world structure', () => {
    render(
      <WorldScrollCanvas
        habitats={habitats}
        fish={fish.filter((item) => item.habitatId === 'amazon-blackwater')}
        selectedHabitatId="amazon-blackwater"
        selectedFishId={null}
        onHabitatSelect={() => undefined}
        onFishSelect={() => undefined}
      />,
    );

    expect(screen.getByRole('button', { name: '非洲裂谷湖 流域' })).toHaveClass('is-dimmed');
    expect(screen.getByRole('button', { name: '亚马逊黑水 流域' })).not.toHaveClass('is-dimmed');
  });
});
