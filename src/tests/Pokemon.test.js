import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Pokemon from '../components/Pokemon';

test('Testa componente Pokemon', () => {
  const mockPokemon = {
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
  };

  const { history } = renderWithRouter(<Pokemon pokemon={ mockPokemon } isFavorite />);

  const pokemonName = screen.getByTestId('pokemon-name');
  expect(pokemonName.innerHTML).toBe('Pikachu');

  const pokemonType = screen.getByTestId('pokemon-type');
  expect(pokemonType.innerHTML).toBe('Electric');

  const pokemonWeight = screen.getByTestId('pokemon-weight');
  expect(pokemonWeight.innerHTML).toBe('Average weight: 6.0 kg');

  const favoriteIcon = screen.getAllByRole('img');
  expect(favoriteIcon[0]).toHaveProperty('src', mockPokemon.image);
  expect(favoriteIcon[0]).toHaveProperty('alt', 'Pikachu sprite');
  expect(favoriteIcon[1]).toHaveProperty('src', 'http://localhost/star-icon.svg');
  expect(favoriteIcon[1]).toHaveProperty('alt', 'Pikachu is marked as favorite');

  const detailsLink = screen.getByRole('link', { name: /More details/i });
  expect(detailsLink).toBeInTheDocument();
  userEvent.click(detailsLink);
  const path = history.location.pathname;
  expect(path).toBe('/pokemons/25');
});
