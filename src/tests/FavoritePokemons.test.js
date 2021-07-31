import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import { FavoritePokemons } from '../components';

// import BrowserRouter from 'react-router-dom';
// import userEvent from '@testing-library/user-event';

describe('Verifica About.test.js', () => {
  test('Verifica se o texto -No found- é encontrado quando não há favorite', () => {
    renderWithRouter(<FavoritePokemons />);

    const FavoriteP = screen.getByText(/No favorite pokemon found/i);
    expect(FavoriteP).toBeDefined();
  });
});
