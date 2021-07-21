import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import data from '../data';

describe('Testando o componente Favorite Pokemons', () => {
  it(('Testando mensagem se não existirem Pokemon favoritos'), () => {
    renderWithRouter(<FavoritePokemons />);
    const noFavorite = screen.getByText(/No favorite pokemon found/i);
    expect(noFavorite).toBeInTheDocument();
  });

  it(('Testando se são exibidos cards dos Pokemons favoritos'), () => {
    const favoritePokemons = [data[0], data[1]];
    renderWithRouter(<FavoritePokemons pokemons={ favoritePokemons } />);
    const pikachuName = screen.getByText(/Pikachu/i);
    const pikachuType = screen.getByText(/Electric/i);
    const charmName = screen.getByText(/Charmander/i);
    const charmType = screen.getByText(/Fire/i);
    expect(pikachuName).toBeInTheDocument();
    expect(pikachuType).toBeInTheDocument();
    expect(charmName).toBeInTheDocument();
    expect(charmType).toBeInTheDocument();
  });
});
