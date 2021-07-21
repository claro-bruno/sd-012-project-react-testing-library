import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Testa o componente NotFound', () => {
  it('Verifica se a página contém um h2 com o texto Page requested not found', () => {
    render(<NotFound />);
    const h2Element = screen.getByText('Page requested not found');
    const emojiElement = screen.getAllByRole('img');
    expect(h2Element).toBeInTheDocument();
    expect(emojiElement[0]).toBeInTheDocument();
  });
  it('Verifica se possui a imagem na tela', () => {
    render(<NotFound />);
    const altText = 'Pikachu crying because the page requested was not found';
    const imageElement = screen.getByAltText(altText);
    expect(imageElement.src).toContain('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
