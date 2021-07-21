import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

test('Testa page Favorite Pokemons quando não ha nenhum pokemon favorito', () => {
  const favoritePokemons = [];

  renderWithRouter(<FavoritePokemons pokemons={ favoritePokemons } />);

  const title = screen.getByRole('heading', { name: /Favorite pokémons/i });
  expect(title).toBeInTheDocument();

  const subtitle = screen.getByText('No favorite pokemon found');
  expect(subtitle).toBeInTheDocument();
});

test('Testa page Favorite Pokemons com pokemons favoritos', () => {
  const favoritePokemons = [
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
      summary: 'This intelligent Pokémon roasts hard berries with electricity ',
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
      summary: 'The flame on its tail shows the strength of its life force.',
    },
  ];

  renderWithRouter(<FavoritePokemons pokemons={ favoritePokemons } />);

  const title = screen.getByRole('heading', { name: /Favorite pokémons/i });
  expect(title).toBeInTheDocument();

  const pokemonsName = screen.getAllByTestId('pokemon-name');
  expect(pokemonsName[0].innerHTML).toBe(favoritePokemons[0].name);
  expect(pokemonsName[1].innerHTML).toBe(favoritePokemons[1].name);

  const pokemonsType = screen.getAllByTestId('pokemon-type');
  expect(pokemonsType.length).toBe(2);

  const pokemonsWeight = screen.getAllByTestId('pokemon-weight');
  expect(pokemonsWeight.length).toBe(2);
});
