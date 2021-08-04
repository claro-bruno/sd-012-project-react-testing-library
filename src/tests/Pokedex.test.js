import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa o componente Pokedex', () => {
  test('Teste se contém um heading `h2` com o texto `Encountered pokémons`', () => {
    renderWithRouter(<App />);
    const heading = screen.getByRole('heading', {
      name: /encountered pokémons/i,
    });
    expect(heading).toBeDefined();
  });

  test('Testa se é exibido o próximo Pokémon da lista quando o botão é clicado', () => {
    renderWithRouter(<App />);
    const nextPokemon = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    userEvent.click(nextPokemon);
    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toHaveTextContent('Charmander');

    userEvent.click(nextPokemon);
    const lastPokemon = screen.getByTestId('pokemon-name');
    expect(lastPokemon).toHaveTextContent('Caterpie');
  });

  test('Testa a Pokédex tem os botões de filtro.', () => {
    renderWithRouter(<App />);
    const buttonType = screen.getByRole('button', {
      name: /psychic/i,
    });
    userEvent.click(buttonType);
    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toHaveTextContent('Psychic');
  });

  test('Testa a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const resetButton = screen.getByRole('button', {
      name: /all/i,
    });
    userEvent.click(resetButton);
    const resetAll = screen.getByTestId('pokemon-type');
    expect(resetAll).toHaveTextContent('Electric');
  });

  test('Botão de filtro para cada Pokémon', () => {
    renderWithRouter(<App />);
    const filter = screen.getAllByTestId('pokemon-type-button');
    expect(filter[0]).toHaveTextContent('Electric');
    expect(filter[1]).toHaveTextContent('Fire');
    expect(filter[2]).toHaveTextContent('Bug');
    expect(filter[3]).toHaveTextContent('Poison');
    expect(filter[4]).toHaveTextContent('Psychic');
    expect(filter[5]).toHaveTextContent('Normal');
    expect(filter[6]).toHaveTextContent('Dragon');
  });
});
