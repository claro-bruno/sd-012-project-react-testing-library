import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pokedex from '../components/Pokedex';
import renderWithRouter from './renderWithRouter';
import data from '../data';

describe('Test for Pokedex component.', () => {
  it('Test if renders the component.', () => {
    const mockFavoriteById = {
      4: false,
      10: false,
      23: false,
      25: true,
      65: false,
      78: false,
      143: false,
      148: false,
      151: false,
    };

    renderWithRouter(
      <Pokedex
        pokemons={ data }
        isPokemonFavoriteById={ mockFavoriteById }
      />,
    );

    const pokedexHeading = screen.getByRole(/heading/i, { name: /encountered pokémons/i });
    const pokemonName = screen.getAllByTestId(/pokemon-name/i);

    expect(pokedexHeading).toBeDefined();
    expect(pokemonName).toBeDefined();
    expect(pokemonName).toHaveLength(1);
  });

  it('Test the next pokemon button in pokedex', () => {
    const mockFavoriteById = {
      4: false,
      10: false,
      23: false,
      25: true,
      65: false,
      78: false,
      143: false,
      148: false,
      151: false,
    };

    renderWithRouter(
      <Pokedex
        pokemons={ data }
        isPokemonFavoriteById={ mockFavoriteById }
      />,
    );

    const nextPokemonButton = screen.getByRole(/button/i, { name: /próximo pokémon/i });
    const currentPokemon = screen.getByTestId(/pokemon-name/i);

    expect(currentPokemon).toHaveTextContent(data[0].name);

    userEvent.click(nextPokemonButton);

    expect(currentPokemon).toHaveTextContent(data[1].name);
  });

  it('Test the type buttons in Pokedex.', () => {
    const mockFavoriteById = {
      4: false,
      10: false,
      23: false,
      25: true,
      65: false,
      78: false,
      143: false,
      148: false,
      151: false,
    };

    renderWithRouter(
      <Pokedex
        pokemons={ data }
        isPokemonFavoriteById={ mockFavoriteById }
      />,
    );

    const pokedexTypeButtons = screen.getAllByTestId(/pokemon-type-button/i);
    const typeLength = 7;

    expect(pokedexTypeButtons).toBeDefined();
    expect(pokedexTypeButtons).toHaveLength(typeLength);

    const pokedexBugTypeButton = screen.getByRole(/button/i, { name: /bug/i });
    userEvent.click(pokedexBugTypeButton);

    const pokeCard = screen.getByTestId('pokemon-type');
    expect(pokeCard).toBeDefined();
  });

  it('Test the all button in pokedex', () => {
    const mockFavoriteById = {
      4: false,
      10: false,
      23: false,
      25: true,
      65: false,
      78: false,
      143: false,
      148: false,
      151: false,
    };

    renderWithRouter(
      <Pokedex
        pokemons={ data }
        isPokemonFavoriteById={ mockFavoriteById }
      />,
    );

    const pokedexAllButton = screen.getByRole(/button/i, { name: /all/i });

    expect(pokedexAllButton).toBeDefined();
    expect(pokedexAllButton).toHaveProperty('disabled', false);

    userEvent.click(pokedexAllButton);

    const pokeCard = screen.getByTestId(/pokemon-name/i);
    expect(pokeCard).toHaveTextContent(data[0].name);
  });
});
