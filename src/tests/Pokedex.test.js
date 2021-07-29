import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RenderWithRouter from './RenderWithRouter';
import App from '../App';

describe('Testa o componente Pokedex', () => {
  test('Teste se contém um heading `h2` com o texto `Encountered pokémons`', () => {
    RenderWithRouter(<App />);
    const heading = screen.getByRole('heading', {
      name: /encountered pokémons/i,
    });
    expect(heading).toBeDefined();
  });

  test('Testa se é exibido o próximo Pokémon da lista quando o botão é clicado', () => {
    RenderWithRouter(<App />);
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

  test('Testa se a Pokédex tem os botões de filtro.', () => {
    RenderWithRouter(<App />);
    const btnType = screen.getByRole('button', {
      name: /psychic/i,
    });
    userEvent.click(btnType);
    const pokemonType = screen.getByTestId('pokemon-type-button');
    expect(pokemonType).toHaveTextContent('Psychic');
  });

  test('Testa se a Pokédex contém um botão para resetar o filtro', () => {
    RenderWithRouter(<App />);
    const resetBtn = screen.getByRole('button', {
      name: /all/i,
    });
    userEvent.click(resetBtn);
    const resetAll = screen.getByTestId('pokemon-type');
    expect(resetAll).toHaveTextContent('Electric');
  });
});
