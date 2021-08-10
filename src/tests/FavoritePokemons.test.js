import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Teste o componente <FavoritePokemons />', () => {
  beforeEach(() => {
    renderWithRouter(<FavoritePokemons />);
  });
  test('Exibir na tela a mensagem se a pessoa não tiver pokémons favoritos', () => {
    const notFavoritePoquemon = screen.getByText('No favorite pokemon found');
    expect(notFavoritePoquemon).toBeDefined();
  });
});
