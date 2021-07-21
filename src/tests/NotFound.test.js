import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Testa o componente NotFound', () => {
  it('Contém um heading h2 com texto específico', () => {
    render(<NotFound />);
    expect(screen.getByText(/Page requested not found/i)).toBeInTheDocument();
  });

  it('Contém uma imagem com src path específico', () => {
    render(<NotFound />);
    expect(screen.getByAltText(/Pikachu/i).src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
