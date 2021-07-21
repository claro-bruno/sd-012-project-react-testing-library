import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../components/NotFound';
import renderWithRouter from './renderWithRouter';

describe('Teste do componente <NotFound.js />', () => {
  beforeEach(() => {
    renderWithRouter(<NotFound />);
  });
  it('Teste se página contém um heading h2 com o texto Page requested not found 😭',
    () => {
      const pageRequest = screen.getByRole(
        'heading', { level: 2, name: /Page requested not found/i },
      );
      expect(pageRequest).toBeInTheDocument();
    });
  it('Teste se página mostra a imagem', () => {
    const altText = 'Pikachu crying because the page requested was not found';
    const image = screen.getByAltText(altText);
    expect(image.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
    // Mais de uma img no documento
  });
});
