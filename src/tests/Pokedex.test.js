import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RenderWithRouter from './helpers/RenderWithRouter';

import Pokedex from '../components/Pokedex';
import data from '../data';

const isPokemonFavoriteById = {
  4: false,
  10: false,
  23: false,
  25: true,
  65: false,
  78: false,
  143: false,
  148: false,
  151: false,
};

const pokemonNames = data.map((current) => current.name);
const pokemonTypes = [];
data.forEach((current) => {
  const alreadyExists = pokemonTypes.find((element) => element === current.type);
  if (!alreadyExists) {
    pokemonTypes.push(current.type);
  }
});

const pokemonName = () => screen.getByTestId('pokemon-name');

describe('Testa o componente Pokedex', () => {
  beforeEach(() => (
    RenderWithRouter(<Pokedex
      pokemons={ data }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />)
  ));

  test('Verifica se renderiza o texto: Encountered pokémons', () => {
    const text = screen.getByText('Encountered pokémons');

    expect(text).toBeInTheDocument();
  });

  test('Verifica se muda o pokemon quando clicar em próximo', () => {
    const nextPokemon = screen.getByRole('button', { name: /Próximo pokémon/i });
    const nameArea = pokemonName();

    expect(nextPokemon).toBeInTheDocument();
    expect(nameArea).toHaveTextContent(pokemonNames[0]);
    userEvent.click(nextPokemon);
    expect(nameArea).toHaveTextContent(pokemonNames[1]);
    userEvent.click(nextPokemon);
    expect(nameArea).toHaveTextContent(pokemonNames[2]);
    userEvent.click(nextPokemon);
    expect(nameArea).toHaveTextContent(pokemonNames[3]);
    userEvent.click(nextPokemon);
    expect(nameArea).toHaveTextContent(pokemonNames[4]);
    userEvent.click(nextPokemon);
    expect(nameArea).toHaveTextContent(pokemonNames[5]);
    userEvent.click(nextPokemon);
    expect(nameArea).toHaveTextContent(pokemonNames[6]);
    userEvent.click(nextPokemon);
    expect(nameArea).toHaveTextContent(pokemonNames[7]);
    userEvent.click(nextPokemon);
    expect(nameArea).toHaveTextContent(pokemonNames[8]);
    userEvent.click(nextPokemon);
    expect(nameArea).toHaveTextContent(pokemonNames[0]);
  });

  test('Verifica se é renderizado apenas um pokemon por vez', () => {
    const PokemonName = screen.getAllByTestId('pokemon-type');

    expect(PokemonName).toHaveLength(1);
  });

  test('Verifica se possui os botões de filtro', () => {
    const button = screen.getAllByTestId('pokemon-type-button');

    expect(button.length).toBe(pokemonTypes.length);
  });

  test('Verifica se mostra apenas os pokemons filtrados', () => {
    const filteredPokemons = data.filter((current) => current.type === 'Fire');

    const nextPokemonButton = screen.getByTestId('next-pokemon');
    const pokemonNameArea = pokemonName();

    const filterButton = screen.getByRole('button', { name: 'Fire' });

    userEvent.click(filterButton);
    expect(pokemonNameArea).toHaveTextContent(filteredPokemons[0].name);
    userEvent.click(nextPokemonButton);
    expect(pokemonNameArea).toHaveTextContent(filteredPokemons[1].name);
    expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument();
  });

  test('Verifica se possui o botão para resetar o filtro', () => {
    const filterAll = screen.getByRole('button', { name: 'All' });
    expect(filterAll).toBeInTheDocument();

    const nextPokemon = screen.getByRole('button', { name: /Próximo pokémon/i });
    const nameArea = pokemonName();

    expect(nextPokemon).toBeInTheDocument();
    userEvent.click(filterAll);
    expect(nameArea).toHaveTextContent(pokemonNames[0]);
    userEvent.click(nextPokemon);
    userEvent.click(nextPokemon);
    userEvent.click(nextPokemon);
    userEvent.click(nextPokemon);
    userEvent.click(nextPokemon);
    userEvent.click(nextPokemon);
    userEvent.click(nextPokemon);
    userEvent.click(nextPokemon);
    userEvent.click(nextPokemon);
    expect(nameArea).toHaveTextContent(pokemonNames[0]);
  });
});
