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

  test('Testa se é exibido o próximo Pokémon quando o botão "próximo Pokémon" é clicado', () => {
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
mudar variavel filter
  test('Testa se existe um botao para cada tipo de Pokemon', () => {
    const filter = screen.getAllByTestId('pokemon-type-button');
    expect(filter[0]).toHaveTextContent('Electric');
    expect(filter[1]).toHaveTextContent('Fire');
    expect(filter[2]).toHaveTextContent('Bug');
    expect(filter[3]).toHaveTextContent('Poison');
    expect(filter[4]).toHaveTextContent('Psychic');
    expect(filter[5]).toHaveTextContent('Normal');
    expect(filter[6]).toHaveTextContent('Dragon');
  });

  test('Testa se existe um botão para resetar o filtro', () => {
    const buttonFilter = screen.getByRole('button', {
      name: /all/i,
    });
    userEvent.click(buttonFilter);
    const resetFilter = screen.getByTestId('pokemon-type');
    expect(resetFilter).toHaveTextContent('Electric');
  });
});
