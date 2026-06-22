import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ScrollMapFrame } from '../ScrollMapFrame';

describe('ScrollMapFrame', () => {
  it('renders a labelled scroll-map frame and preserves children', () => {
    render(
      <ScrollMapFrame>
        <button type="button">鱼影</button>
      </ScrollMapFrame>,
    );

    expect(screen.getByRole('region', { name: '水域画卷图谱' })).toBeInTheDocument();
    expect(screen.getByText('鱼影')).toBeInTheDocument();
  });
});
