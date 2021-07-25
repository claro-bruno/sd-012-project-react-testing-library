import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PokemonDetails from '../components/PokemonDetails';
import renderWithRouter from './renderWithRouter';

describe('Testa o componente Pokemon.js', () => {
  const isPokemonFavoriteById = { 25: true, 4: false };
  const match = { params: { id: '4' } };
  const pokemons = [
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
      summary: 'This intelligent Pokémon roasts'
       + ' hard berries with electricity to make them tender enough to eat.',
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
      summary: 'The flame on its tail shows the strength of its life force.'
      + ' If it is weak, the flame also burns weakly.',
    },
  ];

  const onUpdateFavoritePokemons = (id, isFavorite) => {
    if (isFavorite) {
      isPokemonFavoriteById[id] = false;
    } else {
      isPokemonFavoriteById[id] = true;
    }
  };

  beforeEach(() => {
    renderWithRouter(<PokemonDetails
      isPokemonFavoriteById={ isPokemonFavoriteById }
      match={ match }
      pokemons={ pokemons }
      onUpdateFavoritePokemons={ () => (
        onUpdateFavoritePokemons(match.params.id, isPokemonFavoriteById[4])
      ) }
    />);
  });

  it('Teste se é renderizado as informações detalhadas do pokemon', () => {
    expect(screen.getByText('Charmander Details')).toBeDefined();
    expect(screen.queryByRole('link', { name: 'More details' })).toBeNull();
    expect(screen.getByRole('heading', { name: 'Summary' })).toBeDefined();
    expect(screen.getByText(pokemons[1].summary)).toBeDefined();
  });

  it('Teste se existe uma seção com os mapas da localização do pokemon', () => {
    const locationUrls = [
      'https://cdn2.bulbagarden.net/upload/9/93/Alola_Route_3_Map.png',
      'https://cdn2.bulbagarden.net/upload/4/4a/Kanto_Route_3_Map.png',
      'https://cdn2.bulbagarden.net/upload/2/24/Kanto_Route_4_Map.png',
      'https://cdn2.bulbagarden.net/upload/6/6f/Kanto_Rock_Tunnel_Map.png',
    ];
    expect(screen
      .getByRole('heading', { name: 'Game Locations of Charmander' })).toBeDefined();
    expect(screen.getByText('Alola Route 3')).toBeDefined();
    expect(screen.getByText('Kanto Route 3')).toBeDefined();
    expect(screen.getByText('Kanto Route 4')).toBeDefined();
    expect(screen.getByText('Kanto Rock Tunnel')).toBeDefined();
    screen.getAllByAltText('Charmander location').forEach((image) => {
      expect(locationUrls.find((location) => location === image.src)).toBeDefined();
    });
  });

  it('Teste se é possivel favoritar o pokemon', () => {
    const checkbox = screen.getByLabelText('Pokémon favoritado?');
    expect(checkbox).toBeDefined();
    userEvent.click(checkbox);
    expect(isPokemonFavoriteById[4]).toBe(true);
    userEvent.click(checkbox);
    expect(isPokemonFavoriteById[4]).toBe(false);
  });
});
