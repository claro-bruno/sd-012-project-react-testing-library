import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import { NotFound } from '../components';

describe('Testes do componente NotFound.js', () => {
  it('Checa o texto do heading h2', () => {
    renderWithRouter(<NotFound />);

    const head = screen.getByText('Page requested not found');

    expect(head).toBeInTheDocument();
  });

  it('Checa a imagem do componente', () => {
    renderWithRouter(<NotFound />);

    const url = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const alt = 'Pikachu crying because the page requested was not found';
    const img = screen.getByAltText(alt);
    expect(img).toHaveProperty('src', url);
  });
});
