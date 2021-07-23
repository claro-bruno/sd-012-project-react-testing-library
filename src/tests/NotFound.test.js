import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

describe('Teste do Component NotFound.js.', () => {
  test('Verifica se página contém um heading h2 '
    + 'com o texto Page requested not found.', () => {
    renderWithRouter(<NotFound />);
    const headingNotFound = screen.getByText(/Page requested not found/);

    expect(headingNotFound).toBeInTheDocument();
  });

  test('Verifica se página mostra a imagem '
    + 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    renderWithRouter(<NotFound />);
    const imgUrl = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const altText = 'Pikachu crying because the page requested was not found';
    const imgNotFound = screen.getByAltText(altText);

    expect(imgNotFound).toBeInTheDocument();
    expect(imgNotFound.src).toBe(imgUrl);
  });
});
