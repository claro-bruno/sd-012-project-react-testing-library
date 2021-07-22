// requisito 5
import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';

const mockFavPokemonsIds = [parseInt('id', 25), parseInt('id', 10)];

const mockByIdFavPokemons = pokemons.reduce((acc, { id }) => {
  acc[id] = mockFavPokemonsIds.includes(id);
  return acc;
}, {});

describe('Pokedex tests:', () => {
  test('Must have a specific h2', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ mockByIdFavPokemons }
      />,
    );

    const content = screen.getByRole('heading', { name: /encountered pokémons/i });
    expect(content).toBeInTheDocument();
  });

  test('Test button "next pokémon" and when the list ends, start over from pokemon[0]',
    () => {
      renderWithRouter(
        <Pokedex
          pokemons={ pokemons }
          isPokemonFavoriteById={ mockByIdFavPokemons }
        />,
      );
      const btn = screen.getByRole('button', { name: /próximo pokémon/i });
      const [pikachu, charmander] = pokemons;

      expect(btn).toBeInTheDocument();
      expect(screen.queryByText(pikachu.name)).toBeInTheDocument();
      expect(screen.queryByText(charmander.name)).toBeNull();
      expect(screen.queryByText(pokemons[8].name)).toBeNull();

      Array.from({ length: pokemons.length - 1 })
        .forEach(() => userEvent.click(btn));
      expect(screen.queryByText(pokemons[8].name)).toBeInTheDocument();
      expect(screen.queryByText(pikachu.name)).toBeNull();

      userEvent.click(btn);
      expect(screen.queryByText(pikachu.name)).toBeInTheDocument();
      expect(screen.queryByText(pokemons[8].name)).toBeNull();
    });

  test('Test filter buttons', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ mockByIdFavPokemons }
      />,
    );
    const [pikachu] = pokemons;

    const allBtn = screen.getByRole('button', { name: /all/i });
    const typeBtns = screen.getAllByTestId('pokemon-type-button');

    typeBtns.forEach((typeBtn) => {
      userEvent.click(typeBtn);
      const actualName = screen.queryByTestId('pokemon-name');
      const { name } = pokemons.find(({ type }) => type === typeBtn.innerHTML);
      expect(actualName).toHaveTextContent(name);
    });

    userEvent.click(allBtn);
    const actualName = screen.queryByTestId('pokemon-name');
    expect(actualName).toHaveTextContent(pikachu.name);
  });

  test('Test if "next pokemon" is disabled when another type is filtered', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ mockByIdFavPokemons }
      />,
    );

    const electricBtn = screen.getByRole('button', { name: /electric/i });
    const nextBtn = screen.getByRole('button', { name: /próximo pokémon/i });

    expect(nextBtn).toBeEnabled();
    userEvent.click(electricBtn);
    expect(nextBtn).toBeDisabled();
  });
});
