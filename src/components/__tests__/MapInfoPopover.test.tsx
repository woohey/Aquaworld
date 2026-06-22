import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { fish } from '../../data/fish';
import { habitats } from '../../data/habitats';
import { MapInfoPopover } from '../MapInfoPopover';

describe('MapInfoPopover', () => {
  it('renders basin information with representative fish actions', async () => {
    const user = userEvent.setup();
    const onFishSelect = vi.fn();

    render(
      <MapInfoPopover
        habitat={habitats[0]}
        fish={null}
        representativeFish={fish.filter((item) => habitats[0].representativeFishIds.includes(item.id))}
        onClose={() => undefined}
        onFishSelect={onFishSelect}
      />,
    );

    expect(screen.getByRole('dialog', { name: '亚马逊黑水 信息' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '亚马逊黑水' })).toBeInTheDocument();
    expect(screen.getByText('酸性软水')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: '查看霓虹灯' }));
    expect(onFishSelect).toHaveBeenCalledWith('neon-tetra');
  });

  it('renders fish details and compatibility summary', () => {
    const neonTetra = fish.find((item) => item.id === 'neon-tetra') ?? fish[0];

    render(
      <MapInfoPopover
        habitat={habitats[0]}
        fish={neonTetra}
        representativeFish={[]}
        onClose={() => undefined}
        onFishSelect={() => undefined}
      />,
    );

    expect(screen.getByRole('dialog', { name: '霓虹灯 信息' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '霓虹灯' })).toBeInTheDocument();
    expect(screen.getByText('Paracheirodon innesi')).toBeInTheDocument();
    expect(screen.getByText('通常适合')).toBeInTheDocument();
    expect(screen.getByText('cardinal-tetra')).toBeInTheDocument();
  });

  it('closes the popover from its close button', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(
      <MapInfoPopover
        habitat={habitats[0]}
        fish={null}
        representativeFish={[]}
        onClose={onClose}
        onFishSelect={() => undefined}
      />,
    );

    await user.click(screen.getByRole('button', { name: '关闭信息框' }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
