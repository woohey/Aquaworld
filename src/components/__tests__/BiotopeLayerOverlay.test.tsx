import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { fish } from '../../data/fish';
import { habitats } from '../../data/habitats';
import { BiotopeLayerOverlay } from '../BiotopeLayerOverlay';

describe('BiotopeLayerOverlay', () => {
  const habitat = habitats[0];
  const habitatFish = fish.filter((item) => item.habitatId === habitat.id);

  it('renders a high fidelity fish layer for the selected basin', () => {
    render(
      <BiotopeLayerOverlay
        habitat={habitat}
        fish={habitatFish}
        selectedFish={null}
        onClose={() => undefined}
        onFishSelect={() => undefined}
      />,
    );

    const dialog = screen.getByRole('dialog', { name: '亚马逊黑水 原生鱼层' });

    expect(within(dialog).getAllByRole('heading', { name: '亚马逊黑水' })).toHaveLength(2);
    expect(within(dialog).getByText('上层鱼类')).toBeInTheDocument();
    expect(within(dialog).getByText('中层鱼类')).toBeInTheDocument();
    expect(within(dialog).getByText('底层鱼类')).toBeInTheDocument();
    expect(within(dialog).getAllByRole('button', { name: /鱼层详情/ }).length).toBeGreaterThan(3);
    expect(within(dialog).getByAltText('霓虹灯真实鱼图')).toBeInTheDocument();
  });

  it('selects a fish from the layer and shows its details', async () => {
    const user = userEvent.setup();
    const onFishSelect = vi.fn();

    render(
      <BiotopeLayerOverlay
        habitat={habitat}
        fish={habitatFish}
        selectedFish={null}
        onClose={() => undefined}
        onFishSelect={onFishSelect}
      />,
    );

    await user.click(screen.getByRole('button', { name: '查看霓虹灯鱼层详情' }));

    expect(onFishSelect).toHaveBeenCalledWith('neon-tetra');
  });

  it('renders selected fish detail metrics when provided', () => {
    const neonTetra = fish.find((item) => item.id === 'neon-tetra') ?? fish[0];

    render(
      <BiotopeLayerOverlay
        habitat={habitat}
        fish={habitatFish}
        selectedFish={neonTetra}
        onClose={() => undefined}
        onFishSelect={() => undefined}
      />,
    );

    expect(screen.getByRole('heading', { name: '霓虹灯' })).toBeInTheDocument();
    expect(screen.getByText('Paracheirodon innesi')).toBeInTheDocument();
    expect(screen.getByText('中层')).toBeInTheDocument();
  });
});
