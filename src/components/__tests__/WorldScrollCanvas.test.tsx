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

    expect(document.querySelector('.world-scroll-canvas__backdrop')).toBeInTheDocument();
    expect(within(canvas).getAllByRole('button', { name: /流域/ })).toHaveLength(7);
    expect(within(canvas).getByRole('button', { name: '亚马逊黑水 流域' })).toHaveStyle({
      '--basin-x': '28%',
      '--basin-y': '57%',
    });
    expect(within(canvas).getByRole('button', { name: '中美洲河流 流域' })).toHaveStyle({
      '--basin-x': '26%',
      '--basin-y': '48%',
    });
    expect(within(canvas).getByRole('button', { name: '东南亚溪流 流域' })).toHaveStyle({
      '--basin-x': '72%',
      '--basin-y': '55%',
    });
    expect(within(canvas).getByRole('button', { name: '浅水缓流与适应型水域 流域' })).toHaveStyle({
      '--basin-x': '62%',
      '--basin-y': '47%',
    });
    expect(within(canvas).getByRole('button', { name: '中国南方溪流与稻田水域 流域' })).toHaveStyle({
      '--basin-x': '72%',
      '--basin-y': '40%',
    });
    expect(within(canvas).getByRole('button', { name: '珊瑚礁浅滩 流域' })).toHaveStyle({
      '--basin-x': '81%',
      '--basin-y': '54%',
    });
    const overview = within(canvas).getByLabelText('亚马逊黑水 概述');
    expect(within(overview).getByText('酸性软水')).toBeInTheDocument();
    expect(within(overview).getByText('24-30°C')).toBeInTheDocument();
  });

  it('renders ambient motion layers for birds, clouds, and water ripples', () => {
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

    expect(document.querySelector('.scroll-bird--one')).toBeInTheDocument();
    expect(document.querySelector('.world-scroll-canvas__motion')).toBeInTheDocument();
    expect(document.querySelectorAll('.scroll-cloud')).toHaveLength(3);
    expect(document.querySelectorAll('.scroll-wave')).toHaveLength(3);
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
