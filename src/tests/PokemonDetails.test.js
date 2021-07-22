import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import { PokemonDetails } from '../components';

const mockPokemons = [
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
  },
];
const mockFavorite = {
  4: false,
  10: false,
  23: false,
  25: true,
  65: false,
  78: false,
  143: false,
  148: false,
  151: false,
};

describe('Teste do componente PokemonDetails.js', () => {
  test('Teste de exibição das informações detalhadas', () => {
    const { name, id, foundAt, summary } = mockPokemons[0];
    const match = {
      params: {
        id: `${id}`,
      } };
    renderWithRouter(
      <PokemonDetails
        match={ match }
        pokemons={ mockPokemons }
        isPokemonFavoriteById={ mockFavorite }
      />,
    );
    const title = screen.getByRole('heading', { name: `${name} Details` });
    const summaryTitle = screen.getByRole('heading', { name: 'Summary' });
    const paragraph = screen.getByText(`${summary}`);
    const locTitle = screen.getByRole('heading', { name: `Game Locations of ${name}` });
    const locations = screen.getAllByRole('img', { name: `${name} location` });

    expect(title).toBeInTheDocument();
    expect(summaryTitle).toBeInTheDocument();
    expect(paragraph).toBeInTheDocument();
    expect(locTitle).toBeInTheDocument();
    expect(locations[0].src).toContain(foundAt[0].map);
    expect(locations[1].src).toContain(foundAt[1].map);
  });

  test('Teste de funcionalidade da marcação de favorito', () => {
    const { id } = mockPokemons[0];
    const match = {
      params: {
        id: `${id}`,
      } };
    renderWithRouter(
      <PokemonDetails
        match={ match }
        pokemons={ mockPokemons }
        isPokemonFavoriteById={ mockFavorite }
      />,
    );
    const isFavorite = screen.getByRole('checkbox', { name: 'Pokémon favoritado?' });
    expect(isFavorite).toBeInTheDocument();
  });
});
