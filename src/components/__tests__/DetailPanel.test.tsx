import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { fish } from '../../data/fish';
import { habitats } from '../../data/habitats';
import { CompatibilityBar } from '../CompatibilityBar';
import { DetailPanel } from '../DetailPanel';

describe('DetailPanel', () => {
  it('renders habitat overview when no fish is selected', () => {
    render(<DetailPanel habitat={habitats[0]} fish={null} />);

    expect(screen.getByRole('heading', { name: '亚马逊黑水' })).toBeInTheDocument();
    expect(screen.getByText('酸性软水')).toBeInTheDocument();
  });

  it('renders selected fish details and compatibility notes', () => {
    const neonTetra = fish.find((item) => item.id === 'neon-tetra') ?? fish[0];

    render(
      <>
        <DetailPanel habitat={habitats[0]} fish={neonTetra} />
        <CompatibilityBar fish={neonTetra} />
      </>,
    );

    expect(screen.getByRole('heading', { name: '霓虹灯' })).toBeInTheDocument();
    expect(screen.getByText('Paracheirodon innesi')).toBeInTheDocument();
    expect(screen.getByText('通常适合')).toBeInTheDocument();
    expect(screen.getByText('cardinal-tetra')).toBeInTheDocument();
  });

  it('maps business color names to stable visual colors', () => {
    const shellDweller = fish.find((item) => item.id === 'shell-dweller') ?? fish[0];
    const { container } = render(<DetailPanel habitat={habitats[2]} fish={shellDweller} />);

    expect(container.querySelector('.fish-art span')).toHaveStyle({ '--fish-color': '#e5d2a8' });
  });

  it('uses specimen plate hooks for selected fish', () => {
    const neonTetra = fish.find((item) => item.id === 'neon-tetra') ?? fish[0];
    const { container } = render(<DetailPanel habitat={habitats[0]} fish={neonTetra} />);

    expect(container.querySelector('.detail-panel')).toHaveClass('detail-panel--specimen');
    expect(container.querySelector('.fish-art__body')).toHaveStyle({ '--fish-color': '#3f8fb9' });
    expect(screen.getByLabelText('视觉标签')).toHaveClass('tag-row tag-row--specimen');
  });
});
