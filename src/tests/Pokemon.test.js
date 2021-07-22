import React from 'react';
import { screen, fireEvent } from '@testing-library/react';

import Pokemon from '../components/Pokemon';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

describe('Testa o componente Pokemon', () => {
  const mockedPokemon = pokemons[0];

  test('Testa se é renderizado um card com as informações de determinado pokémon.',
    () => {
      renderWithRouter(
        <Pokemon
          pokemon={ mockedPokemon }
          isFavorite={ false }
        />,
      );

      const name = screen.getByText(mockedPokemon.name);
      const type = screen.getByText(mockedPokemon.type);

      const { value, measurementUnit } = mockedPokemon.averageWeight;
      const weight = screen.getByText(`Average weight: ${value} ${measurementUnit}`);

      const imgAlt = mockedPokemon.name;
      const imgUrl = mockedPokemon.image;
      const image = screen.getByAltText(`${imgAlt} sprite`);

      expect(name).toBeInTheDocument();
      expect(type).toBeInTheDocument();
      expect(weight).toBeInTheDocument();
      expect(image).toHaveProperty('src', imgUrl);
    });

  test('Testa se o card contém um link de navegação para exibir detalhes deste Pokémon',
    () => {
      renderWithRouter(
        <Pokemon
          pokemon={ mockedPokemon }
          isFavorite={ false }
        />,
      );

      const linkToDetails = screen.getByRole('link', { name: 'More details' });
      const url = `/pokemons/${mockedPokemon.id}`;
      expect((linkToDetails.href).endsWith(url)).toBeTruthy();
    });

  test('Testa se a URL exibida no navegador muda para /pokemon/<id>',
    () => {
      const { history } = renderWithRouter(
        <Pokemon
          pokemon={ mockedPokemon }
          isFavorite={ false }
        />,
      );

      const linkToDetails = screen.getByRole('link', { name: 'More details' });
      const url = `/pokemons/${mockedPokemon.id}`;

      fireEvent.click(linkToDetails);
      expect(history.location.pathname).toBe(url);
    });

  test('Testa se existe um ícone de estrela nos Pokémons favoritados',
    () => {
      renderWithRouter(
        <Pokemon
          pokemon={ mockedPokemon }
          isFavorite
        />,
      );

      const imgUrl = '/star-icon.svg';
      const imgAlt = `${mockedPokemon.name} is marked as favorite`;
      const isFavorite = screen.getByAltText(imgAlt);
      expect((isFavorite.src).endsWith(imgUrl)).toBeTruthy();
    });
});
