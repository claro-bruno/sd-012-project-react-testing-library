import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../components/NotFound';
import renderWithRouter from './RenderWithRouter';

describe('testando pagina NotFound', () => {
  it('testando o h2 na pagina NotFound', () => {
    renderWithRouter(<NotFound />);
    const h2 = screen.getByRole('heading', { level: 2 });
    expect(h2).toHaveTextContent(/Page requested not found 😭/i);
  });

  it('testando a tag img na pagina NotFound', () => {
    renderWithRouter(<NotFound />);
    const img = screen.getAllByRole('img');
    expect(img[1]).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
