import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

describe('Testes do componente NotFound', () => {
  beforeEach(() => {
    renderWithRouter(<NotFound />);
  });
  it('Testa se a página contém um h2 com um texto específico', () => {
    const notFoundText = screen.getByRole('heading', { level: 2 });
    expect(notFoundText).toBeInTheDocument();

    expect(notFoundText).toHaveTextContent('Page requested not found 😭');
  });

  it('Testa se a página mostra determinada imagem', () => {
    const imgAlt = screen
      .getByAltText('Pikachu crying because the page requested was not found');
    expect(imgAlt).toBeInTheDocument();
    expect(imgAlt.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
