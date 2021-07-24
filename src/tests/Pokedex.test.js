import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';

function checkPokemons(pokemon) {
  const nextButton = screen.getByRole('button', { name: /Próximo pokémon/i });
  const pokemonName = screen.getByText(pokemon.name);
  expect(pokemonName).toBeInTheDocument();
  userEvent.click(nextButton);
}

describe('Teste o componente Pokedex', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Pokedex
          pokemons={ pokemons }
          isPokemonFavoriteById={
            { 4: true,
              10: false,
              23: false,
              25: true,
              65: false,
              78: false,
              143: false,
              148: true,
              151: false }
          }
        />
      </BrowserRouter>,
    );
  });
  test('Teste se o texto título é apresentado', () => {
    const homeTitle = screen.getByRole('heading', { name: 'Encountered pokémons' });
    expect(homeTitle).toBeInTheDocument();
  });
  test('Teste o botão Próximo Pokémon', () => {
    pokemons.forEach((pokemon) => checkPokemons(pokemon));
    const firstPokemon = screen.getByText(pokemons[0].name);
    expect(firstPokemon).toBeInTheDocument();
  });
  test('Teste se é mostrado apenas um pokémon por vez', () => {
    const pokemonName = screen.getByTestId(/pokemon-name/i);
    expect(pokemonName).toBeInTheDocument();
  });
  test('Teste os botões de filtro', () => {
    pokemons.forEach((pokemon) => {
      const filterButtons = screen.getAllByTestId('pokemon-type-button');
      expect(filterButtons.some((button) => button.textContent === pokemon.type));
      // const filterButton = screen.getByRole('button', { name: pokemon.type });
      // const allButton = screen.getByText('All');
      // expect(filterButton).toHaveProperty('testIdAttribute', 'pokemon-type-button');
      // expect(allButton).toBeInTheDocument();
    });
    const firePokemons = pokemons.map((pokemon) => (pokemon.type === /Fire/i));
    const fireButton = screen.getByRole('button', { name: /Fire/i });
    userEvent.click(fireButton);
    firePokemons.forEach((pokemon) => {
      const pokemonType = screen.getByTestId('pokemon-type');
      userEvent.click(screen.getByTestId(/next-pokemon/i));
      expect(pokemonType).toHaveProperty('name', pokemon.type);
    });
  });
  test('Teste o botão de filtro All', () => {
    // Verifica se o filtro "all" está ativo ao carregar a página:
    pokemons.forEach((pokemon) => checkPokemons(pokemon));
    const fireButton = screen.getByRole('button', { name: /Fire/i });
    const allButton = screen.getByRole('button', { name: /All/i });
    userEvent.click(fireButton);
    userEvent.click(allButton);
    // Verifica o funcionamento do filtro após sua seleção:
    pokemons.forEach((pokemon) => checkPokemons(pokemon));
    const firstPokemon = screen.getByText(pokemons[0].name);
    expect(firstPokemon).toBeInTheDocument();
  });
});
