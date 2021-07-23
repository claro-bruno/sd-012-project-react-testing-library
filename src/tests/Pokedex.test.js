import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../etc/renderWithRouter';

import pokemons from '../data';

const testID = 'pokemon-name';

describe('Pokedex.js', () => {
  it('Heading', () => {
    renderWithRouter(<App />);
    const heading = screen.getByRole('heading', {
      name: /Encountered pokémons/i,
      level: 2,
    });
    expect(heading).toBeInTheDocument();
  });

  it('Próximo', () => {
    renderWithRouter(<App />);
    const btn = screen.getByRole('button', {
      name: /Próximo pokémon/i,
    });
    userEvent.click(btn);
    const pokemon = screen.getAllByTestId(testID);
    expect(pokemon.length).toBe(1);
  });

  it('Exibe um único pokémon', () => {
    renderWithRouter(<App />);
    const btn = screen.getByRole('button', {
      name: /Próximo pokémon/i,
    });

    // testa 3 cliques
    userEvent.click(btn);
    let pokemon = screen.getAllByTestId(testID);
    expect(pokemon.length).toBe(1);
    userEvent.click(btn);
    pokemon = screen.getAllByTestId(testID);
    expect(pokemon.length).toBe(1);
    userEvent.click(btn);
    pokemon = screen.getAllByTestId(testID);
    expect(pokemon.length).toBe(1);
  });

  it('Botões de Filtro', () => {
    renderWithRouter(<App />);
    const allBtn = screen.getByRole('button', { name: /All/i });
    expect(allBtn).toBeInTheDocument();

    pokemons.forEach((pokemon) => {
      const { type } = pokemon;
      const btn = screen.getByRole('button', { name: type });
      expect(btn).toBeInTheDocument();
    });
  });

  it('Botão Reset de filtros', () => {
    renderWithRouter(<App />);
    const allBtn = screen.getByRole('button', { name: /All/i });
    userEvent.click(allBtn);
  });
});
