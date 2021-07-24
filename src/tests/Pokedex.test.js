import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';

describe('Verifica o conteúdo do componente Pokedex', () => {
  const stringNextPokemon = 'Próximo pokémon';
  const stringPokemonName = 'pokemon-name';

  test('Verifica se página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const heading = screen.getByRole('heading', { name: 'Encountered pokémons' });
    expect(heading).toBeInTheDocument();
  });

  test('Verifica a funcionalidade do botão "Próximo pokémon"', () => {
    renderWithRouter(<App />);
    const nextPokemonButton = screen.getByRole('button', { name: stringNextPokemon });
    expect(nextPokemonButton).toBeInTheDocument();

    const pokemonName = screen.getByTestId(stringPokemonName);
    pokemons.forEach((pokemon, index) => {
      if (index !== pokemons.length - 1) {
        expect(pokemonName).toHaveTextContent(pokemon.name);
        userEvent.click(nextPokemonButton);
      } else {
        expect(pokemonName).toHaveTextContent(pokemon.name);
        userEvent.click(nextPokemonButton);
        expect(pokemonName).toHaveTextContent(pokemons[0].name);
      }
    });
  });

  test('Verifica se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);
    const nextPokemonButton = screen.getByRole('button', { name: stringNextPokemon });
    expect(nextPokemonButton).toBeInTheDocument();

    const pokemonName = screen.getAllByTestId(stringPokemonName);
    pokemons.forEach(() => {
      expect(pokemonName.length).toBe(1);
      userEvent.click(nextPokemonButton);
    });
  });

  test('Verifica a existência dos botões de filtro e suas funcionalidades', () => {
    renderWithRouter(<App />);
    pokemons.forEach((pokemon) => {
      const pokemonTypeButton = screen.getAllByRole('button', { name: pokemon.type });
      expect(pokemonTypeButton).toHaveLength(1);
    });

    const pokemonTypeButtons = screen.getAllByTestId('pokemon-type-button');
    pokemonTypeButtons.forEach((button) => {
      const pokemonType = screen.getByTestId('pokemon-type');
      const nextPokemonButton = screen.getByRole('button', { name: stringNextPokemon });
      userEvent.click(button);
      expect(pokemonType).toHaveTextContent(button.textContent);
      if (nextPokemonButton.disabled === false) {
        userEvent.click(nextPokemonButton);
        expect(pokemonType).toHaveTextContent(button.textContent);
        userEvent.click(nextPokemonButton);
        expect(pokemonType).toHaveTextContent(button.textContent);
      }
    });

    const allButton = screen.getByRole('button', { name: 'All' });
    expect(allButton).toBeVisible();
  });

  test('Verifica se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const allButton = screen.getByRole('button', { name: 'All' });
    const pokemonName = screen.getByTestId(stringPokemonName);
    const nextPokemonButton = screen.getByRole('button', { name: stringNextPokemon });
    expect(allButton).toBeInTheDocument();
    expect(pokemonName).toHaveTextContent(pokemons[0].name);
    userEvent.click(nextPokemonButton);
    expect(pokemonName).toHaveTextContent(pokemons[1].name);
    userEvent.click(allButton);
    expect(pokemonName).toHaveTextContent(pokemons[0].name);
  });
});
