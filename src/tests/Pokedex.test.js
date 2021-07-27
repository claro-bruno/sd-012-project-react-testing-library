import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';

const isPokemonFavoriteById = {
  4: false,
  10: false,
  23: false,
  25: false,
  65: false,
  78: false,
  143: false,
  148: false,
  151: false,
};

const pokemonId = 'pokemon-name';
const nextPokemon = 'next-pokemon';

function renderWithRouter(
  ui,
  { route = '/', history = createMemoryHistory({ initialEntries: [route] }) } = {},
) {
  return {
    ...render(<Router history={ history }>{ui}</Router>),
    history,
  };
}

describe('Testa o componente <Pokedex.js />', () => {
  test('Testa se página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );
    const headingPokedex = screen.getByRole('heading', { name: 'Encountered pokémons' });
    expect(headingPokedex).toBeInTheDocument();
  });
  test('Testa funcionamento do botão próximo pokemon', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );
    const button = screen.getByTestId(nextPokemon);
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Próximo pokémon');

    const pokemonName = screen.getByTestId(pokemonId);
    pokemons.forEach((pokemon, i) => {
      expect(pokemonName).toHaveTextContent(pokemon.name);
      fireEvent.click(button);
      expect(pokemonName).not.toHaveTextContent(pokemons[i].name);
    });
    pokemons.forEach((pokemon, i) => {
      if (i < pokemons.length - 1) {
        fireEvent.click(button);
      }
    });
    expect(pokemonName).toHaveTextContent(pokemons[8].name);
    fireEvent.click(button);
    expect(pokemonName).toHaveTextContent(pokemons[0].name);
  });

  test('Testa se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );
    const allPokemonsInPage = screen.getAllByTestId(pokemonId);
    expect(allPokemonsInPage.length).toBe(1);
  });
  test('Testa botão de filtro por tipo', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );
    const allTypes = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    const filterButtons = screen.getAllByTestId('pokemon-type-button');
    filterButtons.forEach((button, i) => {
      expect(button).toBeInTheDocument();
      expect(filterButtons[i]).toHaveTextContent(allTypes[i]);
    });
    expect(filterButtons).toHaveLength(allTypes.length);
  });
  test('Testa se a Pokedex navega apenas pelos pokemons do filtro selecionado', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );
    const psychicButton = screen.getByRole('button', { name: 'Psychic' });
    fireEvent.click(psychicButton);
    const pokemonName = screen.getByTestId(pokemonId);
    expect(pokemonName).toHaveTextContent('Alakazam');
    const button = screen.getByTestId(nextPokemon);
    fireEvent.click(button);
    expect(pokemonName).toHaveTextContent('Mew');
    fireEvent.click(button);
    expect(pokemonName).toHaveTextContent('Alakazam');
  });
  test('Testa se o botão all está sempre visível', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );
    const buttonAll = screen.getByRole('button', { name: 'All' });
    expect(buttonAll).toBeInTheDocument();
  });
  test('Testa se a Pokedex contém um botão para resetar o filtro', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );
    const buttonAll = screen.getByRole('button', { name: 'All' });
    expect(buttonAll).toHaveTextContent('All');
    fireEvent.click(buttonAll);

    const button = screen.getByTestId(nextPokemon);

    pokemons.forEach((pokemon) => {
      expect(screen.getByTestId('pokemon-name')).toHaveTextContent(pokemon.name);
      fireEvent.click(button);
    });
  });
});
