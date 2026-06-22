import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { fish } from '../../data/fish';
import { habitats } from '../../data/habitats';
import { HabitatMap } from '../HabitatMap';

describe('HabitatMap', () => {
  it('selects habitat and fish from the map', async () => {
    const user = userEvent.setup();
    const onHabitatSelect = vi.fn();
    const onFishSelect = vi.fn();

    render(
      <HabitatMap
        habitats={habitats}
        fish={fish}
        selectedHabitatId="amazon-blackwater"
        selectedFishId={null}
        onHabitatSelect={onHabitatSelect}
        onFishSelect={onFishSelect}
      />,
    );

    await user.click(screen.getByRole('button', { name: '中国南方溪流与稻田水域' }));
    expect(onHabitatSelect).toHaveBeenCalledWith('chinese-southern-streams');

    await user.click(screen.getByRole('button', { name: '霓虹灯 Neon Tetra' }));
    expect(onFishSelect).toHaveBeenCalledWith('neon-tetra');
  });

  it('maps fish marker business colors to visual color tokens', () => {
    const shellDweller = fish.find((item) => item.id === 'shell-dweller');

    render(
      <HabitatMap
        habitats={habitats}
        fish={shellDweller ? [shellDweller] : []}
        selectedHabitatId="african-rift-lakes"
        selectedFishId={null}
        onHabitatSelect={() => undefined}
        onFishSelect={() => undefined}
      />,
    );

    expect(screen.getByRole('button', { name: '卷贝鱼 Shell Dweller' })).toHaveStyle({
      '--fish-color': '#e5d2a8',
    });
  });
});
