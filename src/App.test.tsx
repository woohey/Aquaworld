import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from './App';

describe('App', () => {
  it('renders the product identity copy', () => {
    render(<App />);

    expect(screen.getByText('Aqua Biotope Atlas')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '观赏鱼原生地探索图谱' })).toBeInTheDocument();
  });
});
