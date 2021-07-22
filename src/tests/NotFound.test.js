import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import { NotFound } from '../components';

describe('Verifica NotFound.js', () => {
  it('Verifica se página contém um h2 com o texto Page requested not found', () => {
    renderWithRouter(<NotFound />);
    const headingNotFound = screen.getByRole('heading',
      { name: /Page requested not found/i });
    expect(headingNotFound).toBeInTheDocument();
  });

  it('Verifica se página mostra a imagem', () => {
    renderWithRouter(<NotFound />);
    const imageURL = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const imageAlt = 'Pikachu crying because the page requested was not found';
    const image = screen.getByAltText(imageAlt);
    expect(image).toHaveAttribute('src', imageURL);
  });
});
