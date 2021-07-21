import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';
import isPokemonFavoriteById from '../services/isPokemonFavoritById';

const NEXT_BUTTON = 'next-pokemon';

describe('Test all `Pokédex` component', () => {
  test('if contains a heading h2 with `Encountered Pokémons` text', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );

    const heading = screen.getByRole('heading');
    expect(heading.tagName).toBe('H2');
    expect(heading).toHaveTextContent(/encountered pokémons/i);
  });

  test('if shows next pokemon after click in next button', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );

    const nextButton = screen.getByTestId(NEXT_BUTTON);
    expect(nextButton).toHaveTextContent('Próximo pokémon');
    pokemons.forEach((pokemon) => {
      expect(screen.getByText(pokemon.name)).toBeInTheDocument();
      fireEvent.click(nextButton);
    });

    const firstPokemon = screen.getByText('Pikachu');
    expect(firstPokemon).toBeInTheDocument();
  });

  test('if shows only one pokemon per time', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );

    const nextButton = screen.getByTestId(NEXT_BUTTON);

    pokemons.forEach((pokemon) => {
      const pokemonName = screen.getByText(pokemon.name);
      expect(pokemonName).toBeInTheDocument();

      const withOutThisPokemon = pokemons.filter(({ name }) => name !== pokemon.name);
      withOutThisPokemon.forEach(({ name }) => {
        expect(screen.queryByText(name)).toBeNull();
      });

      fireEvent.click(nextButton);
    });
  });

  test('if contains all types buttons for filter', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );

    const pokemonTypes = ['All', ...new Set(pokemons.map(({ type }) => type))];
    const buttons = screen.getAllByRole('button');

    pokemonTypes.forEach((type, i) => {
      expect(buttons[i].textContent).toBe(type);
      fireEvent.click(buttons[i]);
      expect(screen.getByText('All')).toBeInTheDocument();
    });
  });

  test('if shows only a certain type of pokemon after clink in a filter button', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );

    const pokemonTypes = [...new Set(pokemons.map(({ type }) => type))];
    const typeButtons = screen.getAllByTestId('pokemon-type-button');
    const nextButton = screen.getByTestId(NEXT_BUTTON);

    pokemonTypes.forEach((pokemonType, i) => {
      fireEvent.click(typeButtons[i]);
      const filteredPokemons = pokemons.filter(({ type }) => type === pokemonType);

      if (filteredPokemons.length !== 1) {
        expect(filteredPokemons.every(({ type }) => type === pokemonType)).toBeTruthy();

        filteredPokemons.forEach((pokemon) => {
          const typeText = screen.getAllByText(pokemon.type);
          expect(typeText[0].textContent).toBe(pokemonType);
          fireEvent.click(nextButton);
        });
      } else {
        expect(nextButton.disabled).toBeTruthy();
      }
    });
  });
});
