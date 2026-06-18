import { render, screen } from '@testing-library/react';
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
});
