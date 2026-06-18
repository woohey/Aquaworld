import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { habitats } from '../../data/habitats';
import { defaultFilters } from '../../types/domain';
import { FilterRail } from '../FilterRail';

describe('FilterRail', () => {
  it('changes selected habitat and ecological filters', async () => {
    const user = userEvent.setup();
    const onFiltersChange = vi.fn();
    const onHabitatSelect = vi.fn();

    render(
      <FilterRail
        habitats={habitats}
        filters={defaultFilters}
        selectedHabitatId="amazon-blackwater"
        onFiltersChange={onFiltersChange}
        onHabitatSelect={onHabitatSelect}
        onReset={() => undefined}
      />,
    );

    await user.selectOptions(screen.getByLabelText('原生地'), 'chinese-southern-streams');
    expect(onHabitatSelect).toHaveBeenCalledWith('chinese-southern-streams');

    await user.selectOptions(screen.getByLabelText('性格'), 'peaceful');
    expect(onFiltersChange).toHaveBeenCalledWith({ ...defaultFilters, temperament: 'peaceful' });
  });

  it('sets range filters to concrete values and clears individual range filters', async () => {
    const user = userEvent.setup();
    const onFiltersChange = vi.fn();
    const filters = { ...defaultFilters, temperature: 26, ph: 6.5, maxAdultSizeCm: 12 };

    const { rerender } = render(
      <FilterRail
        habitats={habitats}
        filters={defaultFilters}
        selectedHabitatId="amazon-blackwater"
        onFiltersChange={onFiltersChange}
        onHabitatSelect={() => undefined}
        onReset={() => undefined}
      />,
    );

    fireEvent.change(screen.getByLabelText('水温 全部°C'), { target: { value: '24' } });
    expect(onFiltersChange).toHaveBeenCalledWith({ ...defaultFilters, temperature: 24 });

    rerender(
      <FilterRail
        habitats={habitats}
        filters={filters}
        selectedHabitatId="amazon-blackwater"
        onFiltersChange={onFiltersChange}
        onHabitatSelect={() => undefined}
        onReset={() => undefined}
      />,
    );

    await user.click(screen.getByRole('button', { name: '全部水温' }));
    expect(onFiltersChange).toHaveBeenCalledWith({ ...filters, temperature: null });

    await user.click(screen.getByRole('button', { name: '全部 pH' }));
    expect(onFiltersChange).toHaveBeenCalledWith({ ...filters, ph: null });

    await user.click(screen.getByRole('button', { name: '全部体长' }));
    expect(onFiltersChange).toHaveBeenCalledWith({ ...filters, maxAdultSizeCm: null });
  });

  it('offers colors used by the seed fish data', () => {
    render(
      <FilterRail
        habitats={habitats}
        filters={defaultFilters}
        selectedHabitatId="amazon-blackwater"
        onFiltersChange={() => undefined}
        onHabitatSelect={() => undefined}
        onReset={() => undefined}
      />,
    );

    for (const color of ['purple', 'cream', 'brown', 'white', 'gold']) {
      expect(screen.getByRole('option', { name: color })).toBeInTheDocument();
    }
  });
});
