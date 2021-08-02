import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

describe('testa a pagina Pokedex', () => {
  it('Testa se existe H2, especifica', () => {
    renderWithRouter(<App />);
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toBeInTheDocument();
  });
  it('Testa exibicao espeicficada do botao', () => {
    renderWithRouter(<App />);
    const button = screen.getByRole('button', { name: 'Próximo pokémon' });
    expect(button).toBeInTheDocument();
    pokemons.forEach((pokemon) => {
      const poke = screen.getByTestId('pokemon-name');
      expect(poke.textContent).toBe(pokemon.name);
      userEvent.click(button);
    });
  });
  it('Testa se exibe 1 pokemon por vez', () => {
    renderWithRouter(<App />);
    const poke = screen.getAllByTestId('pokemon-name');
    expect(poke.length).toBe(1);
    expect(poke[0]).toBeInTheDocument();
  });
  it('Testa se existe um botao para cada tipo', () => {
    renderWithRouter(<App />);
    const filterPokemon = [...new Set(pokemons
      .reduce((types, { type }) => [...types, type], []))];
    filterPokemon.forEach((pokemon, index) => {
      const buttons = screen.getAllByTestId('pokemon-type-button')[index];
      expect(buttons.textContent).toBe(pokemon);
      userEvent.click(buttons);
      const nextButton = screen.getByRole('button', { name: 'Próximo pokémon' });
      const pokeType = screen.getByTestId('pokemon-type');
      userEvent.click(nextButton);
      expect(pokeType.textContent).toBe(pokemon);
      expect(pokeType).toBeInTheDocument();
    });
  });
  it('Testa se botao All esta presente', () => {
    renderWithRouter(<App />);
    const buttonAll = screen.getByRole('button', { name: 'All' });
    userEvent.click(buttonAll);
    const pokePikachu = screen.getByText('Pikachu');
    expect(pokePikachu.textContent).toBe('Pikachu');
  });
});
