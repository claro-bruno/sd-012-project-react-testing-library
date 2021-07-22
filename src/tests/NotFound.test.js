import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import { NotFound } from '../components';

describe('Verifica requisitos do desafio 4', () => {
  test('Verifica se a pagina tem o texto "Page requested not found" e o emoji 😭', () => {
    renderWithRouter(<NotFound />);

    const heading = screen.getByText('Page requested not found');
    const emoji = screen.getByText('😭');

    expect(heading).toBeInTheDocument();
    expect(emoji).toBeInTheDocument();
  });

  test('Verifica se a página contém o gif do Pikachu', () => {
    const imageAlt = 'Pikachu crying because the page requested was not found';
    renderWithRouter(<NotFound />);

    const image = screen.getByAltText(imageAlt);

    expect(image).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
