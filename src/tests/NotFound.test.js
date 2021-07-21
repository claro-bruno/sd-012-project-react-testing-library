import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

describe('Atendendo aos testes do Requisito 4', () => {

  test('Testando dos requirimentos', () => {
    renderWithRouter(<NotFound />);
    const notFoundHeading = screen.getByRole('heading', { level: 2 });
    expect(notFoundHeading).toBeInTheDocument();
    expect(notFoundHeading.textContent).toBe('Page requested not found 😭');

    const nFISrc = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const notFimgAlt = 'Pikachu crying because the page requested was not found';
    const notFImg = screen.getByAltText(notFimgAlt);
    expect(notFImg).toBeInTheDocument();
    expect(notFImg.src).toBe(nFISrc);
  });
});
