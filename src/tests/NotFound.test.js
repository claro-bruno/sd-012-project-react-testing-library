import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

describe('Testes para o componente NotFound', () => {
  beforeEach(() => {
    renderWithRouter(<NotFound />);
  });
  it('Testa se tem um h2 com texto definido', () => {
    const headingText = screen
      .getByRole('heading', { name: /Page requested not found/i });
    const headingEmote = screen.getByText('😭');
    expect(headingText).toBeInTheDocument();
    expect(headingEmote).toBeInTheDocument();
  });

  it('Testa se a pagina mostra o gif do pikachu', () => {
    const URL = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const image = screen
      .getByAltText('Pikachu crying because the page requested was not found');
    expect(image).toHaveAttribute('src', URL);
  });
});
