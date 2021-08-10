import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Testa o componente NotFound.js', () => {
  beforeEach(() => {
    render(<NotFound />);
  });

  it('Testa se o componente renderiza um h2 com o texto', () => {
    const componentHeader = screen.getByRole('heading',
      { level: 2, name: (content) => content.includes('Page requested not found') });
    expect(componentHeader).toBeInTheDocument();
  });
});
