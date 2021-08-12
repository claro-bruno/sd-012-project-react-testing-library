import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Requisito 4', () => {
  beforeEach(() => {
    render(<NotFound />);
  });

  it('Teste se página contém um heading h2 com o texto Page requested not found 😭;', () => {
    const componentHeader = screen.getByRole('heading',
      { level: 2, name: (content) => content.includes('Page requested not found') });
    expect(componentHeader).toBeInTheDocument();
  });

  it('Teste se a página mostra a imagem', () => {
    const altText = 'Pikachu crying because the page requested was not found';
    const imagePikachuCrying = screen.getByAltText(altText);
    const pikachuGif = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(imagePikachuCrying.src).toBe(pikachuGif);
  });
});