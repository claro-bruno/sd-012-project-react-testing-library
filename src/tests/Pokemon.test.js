import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

const nextButtonName = 'Próximo pokémon';
const moreDetailsName = 'More details';

describe('Testes do componente Pokemon', () => {
  test('Verifica se é renderizado um card com as informações de um pokemon', () => {
    renderWithRouter(<App />);

    const nextButton = screen.getByRole('button', { name: nextButtonName });

    pokemons.forEach((pokemon) => {
      const pokemonName = screen.getByTestId('pokemon-name');
      const pokemonType = screen.getByTestId('pokemon-type');
      const pokemonWeigth = screen.getByTestId('pokemon-weight');
      const pokemonImage = screen.getByAltText(`${pokemon.name} sprite`);

      const imageURL = pokemon.image;
      const { value, measurementUnit } = pokemon.averageWeight;

      expect(pokemonName).toHaveTextContent(pokemon.name);
      expect(pokemonType).toHaveTextContent(pokemon.type);
      expect(pokemonWeigth).toHaveTextContent(
        `Average weight: ${value} ${measurementUnit}`,
      );
      expect(pokemonImage).toHaveProperty('src', imageURL);
      userEvent.click(nextButton);
    });
  });

  test('Verifica se o card contém um link de detalhes', () => {
    renderWithRouter(<App />);

    const nextButton = screen.getByRole('button', { name: nextButtonName });

    pokemons.forEach((pokemon) => {
      const detailsLink = screen.getByRole('link', { name: moreDetailsName });
      expect(detailsLink.getAttribute('href')).toBe(`/pokemons/${pokemon.id}`);
      userEvent.click(nextButton);
    });
  });

  test('Verifica se ao clicar no link de detalhes, é redirecionado', () => {
    const { history } = renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', { name: moreDetailsName });
    const firstPokemon = pokemons[0];

    userEvent.click(detailsLink);

    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${firstPokemon.id}`);
  });

  test('Verifica se existe um icone de favoritos', () => {
    renderWithRouter(<App />);

    const { name } = pokemons[0];

    const detailsLink = screen.getByRole('link', { name: moreDetailsName });
    userEvent.click(detailsLink);

    const favoriteBox = screen.getByRole('checkbox');
    userEvent.click(favoriteBox);

    const homeLink = screen.getByRole('link', { name: 'Home' });
    userEvent.click(homeLink);

    const favoriteImage = screen.getByAltText(`${name} is marked as favorite`);
    expect(favoriteImage.getAttribute('src')).toBe('/star-icon.svg');
  });
});
