import React from 'react';
import { screen } from '@testing-library/react';

import NotFound from '../components/NotFound';
import renderWithRouter from '../helper/renderWithRouter';

describe('[ 4 ] Testa o componente NotFound.js', () => {
  test('Testa se página contém um h2 com o texto Page requested not found 😭', () => {
    renderWithRouter(<NotFound />);
    const message = screen.getByRole('heading', { name: /Page requested not found/i });
    const cryingEmoji = screen.getByRole('img', { name: /Crying emoji/i });
    expect(message).toBeInTheDocument();
    expect(cryingEmoji).toBeInTheDocument();
  });
  test('Testa se página mostra uma imagem específica', () => {
    renderWithRouter(<NotFound />);
    const message = 'Pikachu crying because the page requested was not found';
    const img = screen.getByAltText(message);
    const imgURL = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(img.src).toEqual(imgURL);
  });
});
