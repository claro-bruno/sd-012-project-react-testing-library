import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import { FavoritePokemons } from '../components';

const mockFavoritePokemons = [
  {
    id: 25,
    name: 'Pikachu',
    type: 'Electric',
    averageWeight: {
      value: '6.0',
      measurementUnit: 'kg',
    },
    image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
    foundAt: [
      {
        location: 'Kanto Viridian Forest',
        map: 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
      },
      {
        location: 'Kanto Power Plant',
        map: 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
      },
    ],
    summary: 'This intelligent Pokémon roasts hard berries with electricity...',
  }];

describe('Teste do componente FavoritePokemons.js', () => {
  test('Teste quando não existe pokemons favoritos', () => {
    const { history } = renderWithRouter(<App />);
    const favPokemons = screen.getByRole('link', { name: /favorite pokémons/i });
    fireEvent.click(favPokemons);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');

    const noFavorite = screen.getByText('No favorite pokemon found');
    expect(noFavorite).toBeInTheDocument();
  });

  test('Teste de exibição de todos pokemons favoritos', () => {
    renderWithRouter(<FavoritePokemons pokemons={ mockFavoritePokemons } />);
    const pokemonName = screen.getByText('Pikachu');
    expect(pokemonName).toBeInTheDocument();
  });
});
