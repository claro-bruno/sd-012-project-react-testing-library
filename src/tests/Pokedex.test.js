import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import pokemons from '../data';
import renderWithRouter from './renderWithRouter';

const pokemonTestId = 'pokemon-name';

function filterTypesHelper() {
  const allTypes = pokemons.map((pokemon) => pokemon.type);
  const types = allTypes.filter((type, index) => allTypes.indexOf(type) === index);
  return types;
}

function testAllPokemonsHelper() {
  const nextPokemonLink = screen.getByRole('button', { name: /Próximo pokémon/i });
  expect(nextPokemonLink).toBeInTheDocument();

  pokemons.forEach(() => {
    const pokemonsQuantity = screen.getAllByTestId(pokemonTestId).length;
    expect(pokemonsQuantity).toEqual(1);
    userEvent.click(nextPokemonLink);
  });
}

describe('5 - Testa o componente <Pokedex.js />', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  it('Verifica se página contém um heading h2 com o texto "Encountered pokémons"', () => {
    const titlePokedex = screen.getByRole(
      'heading',
      { name: /Encountered pokémons/i, level: 2 },
    );

    expect(titlePokedex).toBeInTheDocument();
  });

  it('Verifica se é exibido o próximo Pokémon da lista quando o botão Próximo pokémon'
      + ' é clicado', () => {
    const nextPokemonLink = screen.getByRole('button', { name: /Próximo pokémon/i });
    expect(nextPokemonLink).toBeInTheDocument();

    pokemons.forEach((pokemon) => {
      const pokemonName = screen.getByTestId(pokemonTestId);
      expect(pokemonName).toHaveTextContent(pokemon.name);
      userEvent.click(nextPokemonLink);
    });

    const pokemonName = screen.getByTestId(pokemonTestId);
    expect(pokemonName).toHaveTextContent(pokemons[0].name);
  });

  it('Verifica se é mostrado apenas um Pokémon por vez', () => {
    testAllPokemonsHelper();
  });

  it('Verifica se a Pokedéx tem os botões de filtro', () => {
    const filters = filterTypesHelper();

    const allTypesButton = screen.getByRole('button', { name: /All/i });
    expect(allTypesButton).toBeInTheDocument();

    filters.forEach((filter) => {
      const typeButtons = screen.getAllByTestId('pokemon-type-button');
      const filterTypeButton = typeButtons
        .filter((button) => button.textContent === filter);
      expect(filterTypeButton[0]).toBeInTheDocument();

      const pokemonsByType = pokemons.filter((pokemon) => pokemon.type === filter);
      pokemonsByType.forEach(() => {
        userEvent.click(filterTypeButton[0]);
        const type = screen.getByTestId('pokemon-type');
        expect(type).toHaveTextContent(filter);
        expect(allTypesButton).toBeInTheDocument();
        expect(allTypesButton).toBeEnabled();
      });
    });
  });

  it('Verifica se a Pokedéx contém um botão para resetar o filtro', () => {
    testAllPokemonsHelper();

    const resetTypeButton = screen.getByRole('button', { name: /All/i });
    expect(resetTypeButton).toBeInTheDocument();
    userEvent.click(resetTypeButton);

    testAllPokemonsHelper();
  });
});
