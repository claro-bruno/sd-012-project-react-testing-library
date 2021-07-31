import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

describe('Testando todo o meu componente NotFound', () => {
  it('Se página contém um heading h2 com o texto `Page requested not found`', () => {
    renderWithRouter(<NotFound />);

    const notFoundHead = screen.getByRole('heading');
    expect(notFoundHead).toBeInTheDocument();
    expect(notFoundHead.tagName).toBe('H2');
    expect(notFoundHead).toHaveTextContent(/Page requested not found/i);
  });

  it('Se página mostra a imagem de pikachu chorando', () => {
    renderWithRouter(<NotFound />);

    const notFoundImageAlt = 'Pikachu crying because the page requested was not found';
    const notFoundImage = screen.getByAltText(notFoundImageAlt);
    expect(notFoundImage).toBeInTheDocument();
    expect(notFoundImage.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
