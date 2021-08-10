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

  it('Testa se a página mostra a imagem', () => {
    const altText = 'Pikachu crying because the page requested was not found';
    const imagePikachuCrying = screen.getByAltText(altText);
    const pikachuGif = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(imagePikachuCrying.src).toBe(pikachuGif);
  });
});
