import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

const nextPokemon = 'next-pokemon';
const pokemonName = 'pokemon-name';

describe('Testa informações do componente Pokedex.js', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  it('Testa se página contém heading h2 com o texto Page requested not found', () => {
    const heading = screen.getByRole('heading', { name: /Encountered pokémons/i });
    expect(heading.localName).toBe('h2');
  });

  it('Testa se botão all inicia selecionado', () => {
    const pokemonsNames = pokemons.map((pokemon) => pokemon.name);
    const pokemonRotation = [...pokemonsNames, ...pokemonsNames];
    const nextPokemonButton = screen.getByTestId(nextPokemon);

    expect(nextPokemonButton).toHaveTextContent(/Próximo pokémon/i);
    pokemonRotation.forEach((pokemon) => {
      expect(screen.getByTestId(pokemonName)).toHaveTextContent(pokemon);
      userEvent.click(nextPokemonButton);
    });
  });

  it('Testa se existe um botão para cada tipo', () => {
    expect(screen.getByRole('button', { name: /all/i })).toBeInTheDocument();

    const pokemonsTypes = pokemons.map((pokemon) => pokemon.type)
      .filter((type, index, array) => array.indexOf(type) === index);

    pokemonsTypes.forEach((type) => {
      expect(screen.getByRole('button', { name: type })).toBeInTheDocument();
    });
  });

  it('Testa se ao clicar no botão Fire, percorre pokémons daquele tipo', () => {
    const firePokemons = pokemons.filter((pokemon) => pokemon.type === 'Fire')
      .map((pokemon) => pokemon.name);

    userEvent.click(screen.getByRole('button', { name: 'Fire' }));
    const firePokemonsRotation = [...firePokemons, ...firePokemons];
    const nextPokemonButton = screen.getByTestId(nextPokemon);

    expect(nextPokemonButton).toHaveTextContent(/Próximo pokémon/i);
    firePokemonsRotation.forEach((pokemon) => {
      expect(screen.getByTestId(pokemonName)).toHaveTextContent(pokemon);
      userEvent.click(nextPokemonButton);
    });
  });

  it('Testa se botão all funciona', () => {
    expect(screen.getByRole('button', { name: /all/i })).toBeInTheDocument();
    userEvent.click(screen.getByRole('button', { name: /all/i }));

    const pokemonsNames = pokemons.map((pokemon) => pokemon.name);
    const newPokemonOrder = [...pokemonsNames.splice(1), 'Pikachu'];
    const nextPokemonButton = screen.getByTestId(nextPokemon);

    expect(nextPokemonButton).toHaveTextContent(/Próximo pokémon/i);
    newPokemonOrder.forEach((pokemon) => {
      userEvent.click(nextPokemonButton);
      expect(screen.getByTestId(pokemonName)).toHaveTextContent(pokemon);
    });
  });
});
