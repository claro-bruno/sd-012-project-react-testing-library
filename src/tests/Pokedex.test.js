import { screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testando o componente Pokedex', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  test('Testa se tem um h2 com o texto com o texto "Encountered pokémons"', () => {
    const checkH2Pokedex = screen.getByRole(
      'heading', { name: /Encountered pokémons/i },
    );
    expect(checkH2Pokedex).toBeInTheDocument();
  });

  test('Testa se é exibido o próximo Pokémon quando o botão "próximo" é clicado', () => {
    const checkBtPokedex = screen.getByRole('button', { name: /Próximo pokémon/i });
    expect(checkBtPokedex).toBeInTheDocument();
    const pokemon = 'pokemon-name';
    userEvent.click(checkBtPokedex);
    const nextPokemon = screen.getByTestId(pokemon);
    expect(nextPokemon).toHaveTextContent('Charmander');

    userEvent.click(checkBtPokedex);
    const continuousPokemon = screen.getByTestId(pokemon);
    expect(continuousPokemon).toHaveTextContent('Caterpie');
  });

  test('Testa se é exibido apenas 1 Pokemon ao clicar no botão', () => {
    const onePokemon = screen.getAllByTestId('pokemon-name');
    expect(onePokemon.length).toBe(1);
    expect(onePokemon[0]).toBeInTheDocument();
  });

  test('Testa se existe um botao para cada tipo de Pokemon', () => {
    const pokemonButton = screen.getAllByTestId('pokemon-type-button');
    expect(pokemonButton[0]).toHaveTextContent('Electric');
    expect(pokemonButton[1]).toHaveTextContent('Fire');
    expect(pokemonButton[2]).toHaveTextContent('Bug');
    expect(pokemonButton[3]).toHaveTextContent('Poison');
    expect(pokemonButton[4]).toHaveTextContent('Psychic');
    expect(pokemonButton[5]).toHaveTextContent('Normal');
    expect(pokemonButton[6]).toHaveTextContent('Dragon');
  });

  test('Testa se existe um botão para resetar o filtro', () => {
    const buttonpokemonButton = screen.getByRole('button', {
      name: /all/i,
    });
    userEvent.click(buttonpokemonButton);
    const resetpokemonButton = screen.getByTestId('pokemon-type');
    expect(resetpokemonButton).toHaveTextContent('Electric');
  });
});
