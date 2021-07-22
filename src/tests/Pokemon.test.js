import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import Pokemon from '../components/Pokemon';
import isPokemonFavoriteById from '../services/isPokemonFavoritById';
import pokemons from '../data';

describe('Test app `Pokemon` component', () => {
  pokemons.forEach((pokemon) => {
    const { id, name, type, image, averageWeight } = pokemon;
    const { value, measurementUnit } = averageWeight;

    test(`if renders a card of ${name}`, () => {
      const { history } = renderWithRouter(
        <Pokemon
          pokemon={ pokemon }
          isFavorite={ isPokemonFavoriteById[id] }
        />,
      );

      const pokeName = screen.getByTestId('pokemon-name');
      const pokeType = screen.getByTestId('pokemon-type');
      const pokeWeight = screen.getByTestId('pokemon-weight');

      expect(pokeName).toHaveTextContent(name);
      expect(pokeType).toHaveTextContent(type);
      expect(pokeWeight).toHaveTextContent(
        `Average weight: ${value} ${measurementUnit}`,
      );

      let pokeImg;
      if (isPokemonFavoriteById[id]) {
        pokeImg = screen.getAllByRole('img');
        expect(pokeImg[0].src).toBe(image);
        expect(pokeImg[0]).toHaveAttribute('alt', `${name} sprite`);
        expect(pokeImg[1].src).toBe('http://localhost/star-icon.svg');
        expect(pokeImg[1]).toHaveAttribute('alt', `${name} is marked as favorite`);
      } else {
        pokeImg = screen.getByRole('img');
        expect(pokeImg.src).toBe(image);
        expect(pokeImg).toHaveAttribute('alt', `${name} sprite`);
      }

      const pokeDetails = screen.getByRole('link');
      expect(pokeDetails).toHaveTextContent('More details');
      fireEvent.click(pokeDetails);

      const { location: { pathname } } = history;
      expect(pathname).toBe(`/pokemons/${id}`);
    });
  });
});
