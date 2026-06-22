import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { fish } from '../../data/fish';
import { FishList } from '../FishList';

describe('FishList', () => {
  it('shows an empty state and resets filters', async () => {
    const user = userEvent.setup();
    const onReset = vi.fn();

    render(<FishList fish={[]} selectedFishId={null} onFishSelect={vi.fn()} onReset={onReset} />);

    expect(screen.getByText('没有符合条件的鱼种')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: '重置筛选' }));

    expect(onReset).toHaveBeenCalledTimes(1);
  });

  it('selects a fish from the compact list', async () => {
    const user = userEvent.setup();
    const onFishSelect = vi.fn();

    render(<FishList fish={fish} selectedFishId={null} onFishSelect={onFishSelect} onReset={vi.fn()} />);

    await user.click(screen.getByRole('button', { name: '霓虹灯 Neon Tetra' }));

    expect(onFishSelect).toHaveBeenCalledWith('neon-tetra');
  });

  it('uses fish tag visual hooks', () => {
    render(
      <FishList
        fish={fish.slice(0, 2)}
        selectedFishId="neon-tetra"
        onFishSelect={() => undefined}
        onReset={() => undefined}
      />,
    );

    expect(screen.getByRole('region', { name: '鱼种列表' })).toHaveClass('fish-list fish-list--tags');
    expect(screen.getByRole('button', { name: '霓虹灯 Neon Tetra' })).toHaveClass('fish-tag is-selected');
  });
});
