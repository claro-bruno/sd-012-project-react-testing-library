import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../help/renderWithRouter';
import { Pokedex, Pokemon } from '../components';
import pokemons from '../data';

describe('Test the Pokemon component', () => {
  const mokePokemon = {
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
    summary: 'This intelligent Pokémon roasts hard berries with electricity.',
  };

  it('Test if a card with the Pokémon information is rendered', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ {} }
    />);

    const $namePokemon = screen.getByTestId(/pokemon-name/i);
    expect($namePokemon).toBeInTheDocument('');

    const $typePokemon = screen.getByTestId('pokemon-type');
    expect($typePokemon).toBeInTheDocument('');

    const $averageWeightPokemon = screen.getByTestId(/pokemon-weight/i);
    expect($averageWeightPokemon).toBeInTheDocument('');

    const $imgPokemon = screen.getByRole('img');
    expect($imgPokemon).toBeInTheDocument();
    expect($imgPokemon).toHaveAttribute('src', mokePokemon.image);
    expect($imgPokemon).toHaveAttribute('alt', `${mokePokemon.name} sprite`);
  });

  it('tests whether the Pokédex card contains a link to view details', () => {
    const { history } = renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ {} }
    />);

    const $linkDetails = screen.getByRole('link', {
      name: /More details/i,
    });
    expect($linkDetails).toBeInTheDocument();
    userEvent.click($linkDetails);

    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${mokePokemon.id}`);
  });
  // consulta ao repositorio de Gabriel Bueno.
  it('Test if there is a star icon on favorite Pokemons.', () => {
    renderWithRouter(<Pokemon pokemon={ mokePokemon } isFavorite />);

    const $favIcon = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
    expect($favIcon).toBeInTheDocument();
    expect($favIcon).toHaveAttribute('src', '/star-icon.svg');
  });
});
