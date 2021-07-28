import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import { FavoritePokemons } from '../components';

beforeEach(() => {
  renderWithRouter(<FavoritePokemons />);
});

describe('3- Teste o componente <FavoritePokemons.js />', () => {
  test('Verifica a mensagem No favorite pokemon found, sem pokémons favoritos ', () => {
    const msgFavPokemons = screen.getByText('No favorite pokemon found');
    expect(msgFavPokemons).toBeInTheDocument();
  });
});
