import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

const favorites = { 4: true,
  10: false,
  23: false,
  25: true,
  65: false,
  78: false,
  143: false,
  148: true,
  151: false };

describe('Testa o componente Pokemon', () => {
  // beforeEach(() => {
  //   pokemons.forEach((pokemon) => {
  //     renderWithRouter(
  //       <Pokemon pokemon={ pokemon } isFavorite={ favorites[pokemon.id] } />,
  //     );
  //   });
  // });

  test('Teste o card com as informações do Pokemon', () => {
    pokemons.forEach((pokemon, index) => {
      const { history } = renderWithRouter(
        <Pokemon pokemon={ pokemon } isFavorite={ favorites[pokemon.id] } />,
      );
      const { averageWeight, id, name, type, image } = pokemon;
      expect(
        screen.getAllByTestId('pokemon-name')[index],
      ).toHaveTextContent(name);
      expect(
        screen.getAllByTestId('pokemon-type')[index],
      ).toHaveTextContent(type);
      const { value, measurementUnit } = averageWeight;
      const weightText = `Average weight: ${value} ${measurementUnit}`;
      expect(
        screen.getAllByTestId('pokemon-weight')[index],
      ).toHaveTextContent(weightText);
      expect(
        screen.getByRole('img', { name: `${name} sprite` }),
      ).toHaveProperty('src', image);
      if (favorites[id]) {
        expect(
          screen.getByRole('img', { name: `${name} is marked as favorite` }),
        ).toHaveProperty('src', 'http://localhost/star-icon.svg');
      }
      userEvent.click(screen.getAllByRole('link', { name: /More Details/i })[index]);
      const { pathname } = history.location;
      expect(pathname).toBe(`/pokemons/${id}`);
      history.goBack();
    });
  });
});
