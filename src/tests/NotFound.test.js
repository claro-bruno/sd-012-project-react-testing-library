import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Testa o componente "NotFound"', () => {
  it('Testa se existe um heading h2', () => {
    render(<NotFound />);
    const header = screen.getByText('Page requested not found');
    expect(header).toBeInTheDocument();
  });
  it('Testa se a pagina mostra a imagem', () => {
    render(<NotFound />);
    const alttext = 'Pikachu crying because the page requested was not found';
    const image = screen.getByAltText(alttext);
    expect(image).toHaveProperty('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
