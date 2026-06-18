import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import App from '../../App';

describe('App', () => {
  it('renders product identity and selected habitat', () => {
    render(<App />);

    expect(screen.getByText('Aqua Biotope Atlas')).toBeInTheDocument();
    expect(screen.getByText('观赏鱼原生地探索图谱')).toBeInTheDocument();
    expect(screen.getAllByText('亚马逊黑水').length).toBeGreaterThan(0);
  });

  it('updates search input', async () => {
    const user = userEvent.setup();
    render(<App />);

    const search = screen.getByLabelText('搜索鱼种');
    await user.type(search, '白云');

    expect(search).toHaveValue('白云');
  });

  it('clears the fish detail when the selected fish is filtered out', async () => {
    const user = userEvent.setup();
    render(<App />);

    const map = screen.getByRole('region', { name: '原生地生态图谱' });
    await user.click(within(map).getByRole('button', { name: '霓虹灯 Neon Tetra' }));
    expect(screen.getByRole('heading', { name: '霓虹灯' })).toBeInTheDocument();

    await user.selectOptions(screen.getByLabelText('色彩'), 'orange');

    expect(screen.queryByRole('heading', { name: '霓虹灯' })).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '酸性软水里的霓虹鱼群' })).toBeInTheDocument();
  });

  it('clears search when resetting from the empty fish state', async () => {
    const user = userEvent.setup();
    render(<App />);

    const search = screen.getByLabelText('搜索鱼种');
    await user.type(search, 'zzzz-no-fish');
    expect(screen.getByText('没有符合条件的鱼种')).toBeInTheDocument();

    const emptyState = screen.getByRole('region', { name: '鱼种筛选结果' });
    await user.click(within(emptyState).getByRole('button', { name: '重置筛选' }));

    expect(search).toHaveValue('');
    expect(screen.queryByText('没有符合条件的鱼种')).not.toBeInTheDocument();
    const fishList = screen.getByRole('region', { name: '鱼种列表' });
    expect(within(fishList).getByRole('button', { name: '霓虹灯 Neon Tetra' })).toBeInTheDocument();
  });
});
