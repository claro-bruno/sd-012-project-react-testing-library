import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import historyRender from './GenericHistory';

const SETE = 7;

describe('Testes do componente Pokedex.js', () => {
  test('Testa se a página possui um heading com o texto "Encountered pokémons"', () => {
    historyRender(<App />);
    const testHeading = screen.getByRole('heading', { name: 'Encountered pokémons' });
    expect(testHeading).toBeInTheDocument();
  });

  test('Testa se tem apenas um pokemon na tela', () => {
    historyRender(<App />);
    const onlyPokemon = screen.getAllByText(/Average weight/i);
    expect(onlyPokemon).toHaveLength(1);
  });

  test('Testa botão próximo pokémon', () => {
    historyRender(<App />);
    const testButton = screen.getByRole('button', { name: 'Próximo pokémon' });
    expect(testButton).toBeInTheDocument();
    userEvent.click(testButton);
    const nextPokemon = screen.getByText(/charmander/i);
    expect(nextPokemon).toBeInTheDocument();
  });

  test('Testa se os botões de filtro por tipo', () => {
    historyRender(<App />);
    const testTypeBtn = screen.getAllByTestId('pokemon-type-button');
    expect(testTypeBtn).toHaveLength(SETE);
    const testNameBtn = screen.getAllByText(/Psychic/i);
    expect(testNameBtn).toHaveLength(1);
  });

  test('Testa se o botão all está visivel', () => {
    historyRender(<App />);
    const testAllButton = screen.getByRole('button', { name: 'All' });
    expect(testAllButton).toBeInTheDocument();
    userEvent.click(testAllButton);
    const firstPokemon = screen.getByText(/Pikachu/i);
    expect(firstPokemon).toBeInTheDocument();
  });
});
