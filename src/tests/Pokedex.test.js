import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import Pokedex from '../components/Pokedex';
import renderWithRouter from '../etc/renderWithRouter';

import pokemons from '../data';

beforeEach(() => {
  renderWithRouter(<Pokedex
    pokemons={ pokemons }
    isPokemonFavoriteById={ App.setIsPokemonFavoriteById() }
  />);
});

describe('Pokedex.js', () => {
  it('Heading', () => {
    const heading = screen.getByRole('heading', {
      name: /Encountered pokémons/i,
      level: 2,
    });
    expect(heading).toBeInTheDocument();
  });

  it('Próximo', () => {
    const btn = screen.getByRole('button', { name: /Próximo pokémon/i });
    for (let index = 0; index < pokemons.length; index += 1) {
      userEvent.click(btn);
      if (index >= pokemons.length - 1) {
        const pokemon = screen.getByText(pokemons[0].name);
        expect(pokemon).toBeDefined();
      } else {
        const pokemon = screen.getByText(pokemons[index + 1].name);
        expect(pokemon).toBeDefined();
      }
    }
  });

  it('Exibe um único pokémon', () => {
    const btn = screen.getByRole('button', {
      name: /Próximo pokémon/i,
    });
    userEvent.click(btn);
    const pokemon = screen.getAllByTestId('pokemon-name');
    expect(pokemon.length).toBe(1);
  });

  it('Botões de Filtro', () => {
    const allBtn = screen.getByRole('button', { name: /All/i });
    expect(allBtn).toBeInTheDocument();

    pokemons.forEach((pokemon) => {
      const { type } = pokemon;
      const btn = screen.getByRole('button', { name: type });
      expect(btn).toBeInTheDocument();
    });
  });

  it('Botão Reset de filtros', () => {
    const allBtn = screen.getByRole('button', { name: /All/i });
    userEvent.click(allBtn);
    let pokemon = screen.getByText(pokemons[0].name);
    expect(pokemon).toBeDefined();
    const proxBtn = screen.getByRole('button', { name: /Próximo pokémon/i });
    for (let index = 0; index < pokemons.length - 1; index += 1) {
      userEvent.click(proxBtn);
      pokemon = screen.getByText(pokemons[index + 1].name);
      expect(pokemon).toBeDefined();
    }
  });
});
