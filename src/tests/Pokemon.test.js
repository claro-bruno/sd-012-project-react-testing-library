import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';

import Pokemon from '../components/Pokemon';
import pokemons from '../data';

const mockPokemon = pokemons[8];

describe('Pokemon tests', () => {
  it('Pokémon card`s test', () => {
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
    const detailsLink = screen.getByText(/more details/i);

    const imageURL = 'https://cdn2.bulbagarden.net/upload/2/2c/Spr_5b_148.png';

    expect(pokemonName).toHaveTextContent(mockPokemon.name);
    expect(pokemonType).toHaveTextContent(mockPokemon.type);
    expect(pokemonWeight)
      .toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);
    expect(pokemonImg.src).toBe(imageURL);
    expect(detailsLink).toBeInTheDocument();
  });

  it('Details link`s test', () => {
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

  it('Favotited pokémon`s test', () => {
    renderWithRouter(
      <Pokemon
        pokemon={ mockPokemon }
        showDetailsLink
        isFavorite
      />,
    );

    const starImg = screen.getByAltText(`${mockPokemon.name} is marked as favorite`);

    expect(starImg).toBeInTheDocument();
    expect(starImg.src).toBe('http://localhost/star-icon.svg'); // 100% mutants;
  });
});
