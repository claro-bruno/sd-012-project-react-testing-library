import React from 'react';
import { screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import Pokemon from '../components/Pokemon';

const pokemonSample = {
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
  summary: 'Text about it',
};

describe('Check if Pokemon.js is working as it should', () => {
  afterEach(cleanup);

  it('Check if pokemon card is displayed with correct info"', () => {
    const { history } = renderWithRouter(
      <Pokemon
        pokemon={ pokemonSample }
        isFavorite
      />,
    );
    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName.innerHTML).toBe(pokemonSample.name);
    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType.innerHTML).toBe(pokemonSample.type);
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    const { averageWeight: { value, measurementUnit } } = pokemonSample;
    expect(pokemonWeight.innerHTML)
      .toContain(value);
    expect(pokemonWeight.innerHTML)
      .toContain(measurementUnit);
    expect(pokemonWeight.innerHTML)
      .toBe(`Average weight: ${value} ${measurementUnit}`);
    const avatar = screen.getByRole('img', { name: `${pokemonSample.name} sprite` });
    expect(avatar).toBeInTheDocument();
    expect(avatar.src).toBe(pokemonSample.image);
    const linkWithDetails = screen.getByRole('link', { name: 'More details' });
    expect(linkWithDetails).toBeInTheDocument();
    expect(linkWithDetails.href).toContain(`/pokemons/${pokemonSample.id}`);
    userEvent.click(linkWithDetails);
    expect(history.location.pathname).toBe(`/pokemons/${pokemonSample.id}`);
    const favoriteIcon = screen
      .getByRole('img', { name: `${pokemonSample.name} is marked as favorite` });
    expect(favoriteIcon).toBeInTheDocument();
    expect(favoriteIcon.src).toContain('/star-icon.svg');
  });
});
