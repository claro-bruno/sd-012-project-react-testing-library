import React from 'react';
import { screen, render } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from './renderWithRouter';
import data from '../data';

describe('Testando o componente FavoritePokemons', () => {
  test('Testa se nao houver Pokemon Favorito', () => {
    render(<FavoritePokemons />);
    const messageDisplayed = screen.getByText('No favorite pokemon found');
    expect(messageDisplayed).toBeInTheDocument();
  });
  test('Testa se é exibido os pokémons favoritos', () => {
    renderWithRouter(<FavoritePokemons pokemons={ data } />);
    // ideia do forEach vi no repositorio do Thales
    data.forEach(({ name }) => {
      const pokemon = screen.getByText(name);
      expect(pokemon).toBeInTheDocument();
    });
  });
});
