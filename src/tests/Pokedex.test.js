import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';

import Pokedex from '../components/Pokedex';
import pokemons from '../data';

const mockFavoritePokemonIds = [parseInt('id', 25), parseInt('id', 10)];

const mockIsPokemonFavoriteById = pokemons.reduce((acc, { id }) => {
  acc[id] = mockFavoritePokemonIds.includes(id);
  return acc;
}, {});

describe('Pokedex tests', () => {
  it('Screen must have a specific subtitle', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ mockIsPokemonFavoriteById }
      />,
    );

    const subtitle = screen.getByRole('heading', { name: /encountered pokémons/i });
    expect(subtitle).toBeInTheDocument();
  });

  it('Test the next pokemon button', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ mockIsPokemonFavoriteById }
      />,
    );

    const btn = screen.getByRole('button', { name: /próximo pokémon/i });
    const [pikachu, charmander] = pokemons;

    expect(btn).toBeInTheDocument();
    expect(screen.queryByText(pikachu.name)).toBeInTheDocument();
    expect(screen.queryByText(charmander.name)).toBeNull();
    expect(screen.queryByText(pokemons[8].name)).toBeNull(); // pokemons[8] === dragonair.name;

    Array.from({ length: pokemons.length - 1 })
      .forEach(() => userEvent.click(btn));
    expect(screen.queryByText(pokemons[8].name)).toBeInTheDocument();
    expect(screen.queryByText(pikachu.name)).toBeNull();

    userEvent.click(btn);
    expect(screen.queryByText(pikachu.name)).toBeInTheDocument();
    expect(screen.queryByText(pokemons[8].name)).toBeNull();
  });

  it('Test filter buttons', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ mockIsPokemonFavoriteById }
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
    expect(actualName).toHaveTextContent(pikachu.name); // 100% mutants;
  });

  it('Test if Next Pokémon button is disabled when they`re filtred to only one', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ mockIsPokemonFavoriteById }
      />,
    );

    const electricBtn = screen.getByRole('button', { name: /electric/i });
    const nextBtn = screen.getByRole('button', { name: /próximo pokémon/i });

    expect(nextBtn).toBeEnabled();
    userEvent.click(electricBtn);
    expect(nextBtn).toBeDisabled();
  });
});
