import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import App from '../../App';

describe('App', () => {
  it('renders product identity and selected habitat', () => {
    render(<App />);

    expect(screen.getByText('Aqua Biotope Atlas')).toBeInTheDocument();
    expect(screen.getByText('观赏鱼原生地探索图谱')).toBeInTheDocument();
    expect(screen.getByText('亚马逊黑水')).toBeInTheDocument();
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

    await user.click(screen.getByRole('button', { name: '霓虹灯 Neon Tetra' }));
    expect(screen.getByRole('heading', { name: '霓虹灯' })).toBeInTheDocument();

    await user.selectOptions(screen.getByLabelText('色彩'), 'orange');

    expect(screen.queryByRole('heading', { name: '霓虹灯' })).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '酸性软水里的霓虹鱼群' })).toBeInTheDocument();
  });
});
