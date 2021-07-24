import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import FavoritePokemons from '../components/FavoritePokemons';

const mockedPokemonsList = [
  {
    averageWeight: {
      measurementUnit: 'kg',
      value: '6.0',
    },
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
    id: 25,
    image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
    name: 'Pikachu',
    summary: 'This intelligent Pokémon roasts hard berries '
      + 'with electricity to make them tender enough to eat.',
    type: 'Electric',
  },
  {
    averageWeight: {
      value: '8.5',
      measurementUnit: 'kg',
    },
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
    id: 4,
    image: 'https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Charmander_(Pok%C3%A9mon)',
    name: 'Charmander',
    summary: 'The flame on its tail shows the strength of its life force.'
      + 'If it is weak, the flame also burns weakly.',
  },
];

describe('Teste o componente FavoritePokemons', () => {
  test('Teste a mensagem quando não houver pokémons favoritados', () => {
    const emptyPokemonsList = [];
    render(<FavoritePokemons pokemons={ emptyPokemonsList } />);
    const notFound = screen.getByText('No favorite pokemon found');
    expect(notFound).toBeInTheDocument();
  });

  test('Teste se são exibidos todos os pokémons favoritados', () => {
    render(
      <BrowserRouter>
        <FavoritePokemons pokemons={ mockedPokemonsList } />
      </BrowserRouter>,
    );
    mockedPokemonsList.forEach((pokemon) => {
      const renderedList = screen.getAllByTestId('pokemon-name');
      renderedList.some((renderedPokemon) => (renderedPokemon.name === pokemon.name));
    });
  });
});
