import React from 'react';
import { screen } from '@testing-library/react';
// import event from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Testando o componente FavoritePokemons.js', () => {
  const mockFavoritePokemons = [{
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
  },
  {
    id: 4,
    name: 'Charmander',
    type: 'Fire',
    averageWeight: {
      value: '8.5',
      measurementUnit: 'kg',
    },
    image: 'https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Charmander_(Pok%C3%A9mon)',
    foundAt: [
      {
        location: 'Alola Route 3',
        map: 'https://cdn2.bulbagarden.net/upload/9/93/Alola_Route_3_Map.png',
      },
      {
        location: 'Kanto Route 3',
        map: 'https://cdn2.bulbagarden.net/upload/4/4a/Kanto_Route_3_Map.png',
      },
      {
        location: 'Kanto Route 4',
        map: 'https://cdn2.bulbagarden.net/upload/2/24/Kanto_Route_4_Map.png',
      },
      {
        location: 'Kanto Rock Tunnel',
        map: 'https://cdn2.bulbagarden.net/upload/6/6f/Kanto_Rock_Tunnel_Map.png',
      },
    ],
  }];

  test('Verifica se o componente FavoritePokemons é renderizado com conteúdo', () => {
    const expectedLength = 2;
    renderWithRouter(<FavoritePokemons pokemons={ mockFavoritePokemons } />);
    const listPokemons = screen.getAllByTestId('pokemon-name');
    expect(listPokemons).toHaveLength(expectedLength);

    mockFavoritePokemons.forEach(({ name }) => {
      const pokemonName = screen.getByText(name);
      expect(pokemonName).toHaveAttribute('data-testid', 'pokemon-name');
      // expect(pokemonName).toBeInTheDocument();
    });
  });

  test('Verifica FavoritePokemons é renderizado sem nenhum pokemon', () => {
    renderWithRouter(<FavoritePokemons pokemons={ [] } />);
    expect(screen.getByText(/No favorite pokemon found/i)).toBeInTheDocument();
  });
});
