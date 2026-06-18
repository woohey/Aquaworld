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
});
