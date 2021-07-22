// requisito 6
import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

const mockPokemon = pokemons[5];

describe('Pokemon tests', () => {
  test('Pokémon card`s test', () => {
    renderWithRouter(
      <Pokemon
        pokemon={ mockPokemon }
        showDetailsLink
        isFavorite={ false }
      />,
    );

    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    const { value, measurementUnit } = mockPokemon.averageWeight;
    const pokemonImg = screen.getByAltText(`${mockPokemon.name} sprite`);
    const moreDetails = screen.getByText(/more details/i);
    const imageURL = 'https://cdn2.bulbagarden.net/upload/4/43/Spr_5b_151.png';

    expect(pokemonName).toHaveTextContent(mockPokemon.name);
    expect(pokemonType).toHaveTextContent(mockPokemon.type);
    expect(pokemonWeight)
      .toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);
    expect(pokemonImg.src).toBe(imageURL);
    expect(moreDetails).toBeInTheDocument();
  });

  test('Test details links', () => {
    const { history } = renderWithRouter(
      <Pokemon
        pokemon={ mockPokemon }
        showDetailsLink
        isFavorite={ false }
      />,
    );

    const detailsLink = screen.getByText(/more details/i);

    expect(history.location.pathname).toBe('/');
    userEvent.click(detailsLink);
    expect(history.location.pathname).toBe(`/pokemons/${mockPokemon.id}`);
  });

  test('Test favPokemons links', () => {
    renderWithRouter(
      <Pokemon
        pokemon={ mockPokemon }
        showDetailsLink
        isFavorite
      />,
    );

    const starImg = screen.getByAltText(`${mockPokemon.name} is marked as favorite`);

    expect(starImg).toBeInTheDocument();
    expect(starImg.src).toBe('http://localhost/star-icon.svg');
  });
});
