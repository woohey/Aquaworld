import { fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import App from '../../App';

describe('App', () => {
  it('renders the immersive scroll as the primary surface', () => {
    render(<App />);

    expect(screen.getByText('Aqua Biotope Atlas')).toBeInTheDocument();
    expect(screen.getByText('观赏鱼原生地探索图谱')).toBeInTheDocument();
    expect(screen.getByRole('region', { name: '沉浸式世界画卷' })).toBeInTheDocument();
    expect(document.querySelector('.app-shell')).toHaveClass('app-shell--immersive-scroll');
  });

  it('opens the biotope layer overlay from the world scroll and selects fish inside it', async () => {
    const user = userEvent.setup();
    render(<App />);

    const canvas = screen.getByRole('region', { name: '沉浸式世界画卷' });
    await user.click(within(canvas).getByRole('button', { name: '亚马逊黑水 流域' }));
    const overlay = screen.getByRole('dialog', { name: '亚马逊黑水 原生鱼层' });
    expect(overlay).toBeInTheDocument();
    expect(within(overlay).getByText('上层鱼类')).toBeInTheDocument();

    await user.click(within(overlay).getByRole('button', { name: '查看霓虹灯鱼层详情' }));
    expect(within(overlay).getByRole('heading', { name: '霓虹灯' })).toBeInTheDocument();
    expect(screen.getByText('Paracheirodon innesi')).toBeInTheDocument();
  });

  it('opens tuning drawer and updates search input', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: '调境' }));
    const search = screen.getByLabelText('搜索鱼种');
    await user.type(search, '白云');
    expect(search).toHaveValue('白云');
  });

  it('clears the fish detail when the selected fish is filtered out', async () => {
    const user = userEvent.setup();
    render(<App />);

    const canvas = screen.getByRole('region', { name: '沉浸式世界画卷' });
    await user.click(within(canvas).getByRole('button', { name: '霓虹灯 Neon Tetra 鱼影' }));
    expect(screen.getByRole('dialog', { name: '亚马逊黑水 原生鱼层' })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: '调境' }));
    await user.selectOptions(screen.getByLabelText('色彩'), 'orange');

    expect(screen.queryByRole('dialog', { name: '亚马逊黑水 原生鱼层' })).not.toBeInTheDocument();
  });

  it('clears search when resetting from the empty fish state in the tuning drawer', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: '调境' }));
    const search = screen.getByLabelText('搜索鱼种');
    fireEvent.change(search, { target: { value: 'zzzz-no-fish' } });

    expect(screen.getByText('当前条件下暂无鱼种')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: '重置筛选' }));

    expect(search).toHaveValue('');
    expect(screen.queryByText('当前条件下暂无鱼种')).not.toBeInTheDocument();
  });
});
