import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { habitats } from '../../data/habitats';
import { defaultFilters } from '../../types/domain';
import { TuningDrawer } from '../TuningDrawer';

describe('TuningDrawer', () => {
  it('updates search and ecological filters from the drawer', async () => {
    const user = userEvent.setup();
    const onSearchChange = vi.fn();
    const onFiltersChange = vi.fn();
    const onHabitatSelect = vi.fn();

    render(
      <TuningDrawer
        habitats={habitats}
        filters={defaultFilters}
        selectedHabitatId="amazon-blackwater"
        searchQuery=""
        onSearchChange={onSearchChange}
        onFiltersChange={onFiltersChange}
        onHabitatSelect={onHabitatSelect}
        onReset={() => undefined}
        onClose={() => undefined}
      />,
    );

    fireEvent.change(screen.getByLabelText('搜索鱼种'), { target: { value: '白云' } });
    expect(onSearchChange).toHaveBeenCalledWith('白云');

    await user.selectOptions(screen.getByLabelText('原生地'), 'chinese-southern-streams');
    expect(onHabitatSelect).toHaveBeenCalledWith('chinese-southern-streams');

    await user.selectOptions(screen.getByLabelText('色彩'), 'gold');
    expect(onFiltersChange).toHaveBeenCalledWith({ ...defaultFilters, color: 'gold' });
  });

  it('resets and closes the drawer', async () => {
    const user = userEvent.setup();
    const onReset = vi.fn();
    const onClose = vi.fn();

    render(
      <TuningDrawer
        habitats={habitats}
        filters={defaultFilters}
        selectedHabitatId="amazon-blackwater"
        searchQuery=""
        onSearchChange={() => undefined}
        onFiltersChange={() => undefined}
        onHabitatSelect={() => undefined}
        onReset={onReset}
        onClose={onClose}
      />,
    );

    expect(screen.getByRole('dialog', { name: '调境' })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: '重置筛选' }));
    expect(onReset).toHaveBeenCalledTimes(1);

    await user.click(screen.getByRole('button', { name: '关闭调境' }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
