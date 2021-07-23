import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Teste do Component Pokedex.js', () => {
  const pokemonNameString = 'pokemon-name';

  test('Verifica se página contém um heading h2 '
    + 'com o texto "Encountered pokémons".', () => {
    renderWithRouter(<App />);
    const headingPokedex = screen.getByText('Encountered pokémons');

    expect(headingPokedex).toBeInTheDocument();
  });

  test('Verifica se é exibido o próximo Pokémon da lista '
    + 'quando o botão Próximo pokémon é clicado.', () => {
    renderWithRouter(<App />);
    const nextButton = screen.getByTestId('next-pokemon');

    expect(nextButton).toHaveTextContent('Próximo pokémon');

    let pokemonName = screen.getByTestId(pokemonNameString);

    pokemons.forEach((pokemon) => {
      pokemonName = screen.getByTestId(pokemonNameString);

      expect(pokemonName).toHaveTextContent(pokemon.name);

      fireEvent.click(nextButton);
    });

    expect(pokemonName).toHaveTextContent(pokemons[0].name);
  });

  test('Verifica se é mostrado apenas um Pokémon por vez.', () => {
    renderWithRouter(<App />);
    const pokemonNames = screen.getAllByTestId(pokemonNameString);

    expect(pokemonNames.length).toBe(1);
  });

  test('Verifica se a Pokédex tem os botões de filtro.', () => {
    renderWithRouter(<App />);
    const pokemonTypeButtons = screen.getAllByTestId('pokemon-type-button');
    const pokemonTypes = [
      'Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    const pokemonAllButton = screen.getByText('All');

    pokemonTypes.forEach((type, i) => {
      expect(pokemonTypeButtons[i]).toHaveTextContent(type);
      expect(pokemonAllButton).toBeInTheDocument();
    });
  });

  test('Verifica se a Pokédex contém um botão para resetar o filtro.', () => {
    renderWithRouter(<App />);
    const pokemonAllButton = screen.getByText('All');
    const nextButton = screen.getByTestId('next-pokemon');
    const pokemonName = screen.getByTestId(pokemonNameString);

    expect(pokemonAllButton).toBeInTheDocument();

    expect(pokemonName).toHaveTextContent('Pikachu');

    fireEvent.click(nextButton);

    expect(pokemonName).toHaveTextContent('Charmander');

    fireEvent.click(pokemonAllButton);

    expect(pokemonName).toHaveTextContent('Pikachu');
  });
});
