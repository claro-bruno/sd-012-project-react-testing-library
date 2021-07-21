import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithrouter';

describe('Verifica Pokedex.js', () => {
  it('Testa se página contém um heading.', () => {
    renderWithRouter(<App />);
    const pokedexTitle = screen.getByRole('heading', { name: /Encountered pokémons/i });
    expect(pokedexTitle).toBeInTheDocument();
  });

  it('Testa se é exibido o próximo Pokémon.', () => {
    renderWithRouter(<App />);
    const btnProximo = screen.getByRole('button', { name: /Próximo pokémon/i });
    userEvent.click(btnProximo);

    const nextPokemon = screen.getByText(/Charmander/i);
    expect(nextPokemon).toBeInTheDocument();
  });

  it('Testa se a Pokédex tem os botões de filtro.', () => {
    renderWithRouter(<App />);
    const filter = screen.getAllByTestId('pokemon-type-button');
    const length = 7;
    expect(filter.length).toBe(length);
  });

  it('Testa se os botões de filtro funcionam.', () => {
    renderWithRouter(<App />);
    const filterFire = screen.getByRole('button', { name: /Fire/i });
    userEvent.click(filterFire);

    const nextPokemon = screen.getByText(/Charmander/i);
    expect(nextPokemon).toBeInTheDocument();
  });

  it('Testa se os botões de filtro funcionam.', () => {
    renderWithRouter(<App />);
    const filterAll = screen.getByRole('button', { name: /All/i });
    const filterFire = screen.getByRole('button', { name: /Fire/i });
    userEvent.click(filterFire);
    userEvent.click(filterAll);

    const firstPokemon = screen.getByText(/Pikachu/i);
    expect(firstPokemon).toBeInTheDocument();
  });
});
