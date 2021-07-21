import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderWithRouter from './renderWithRouter';
import App from '../App';

test('Testa se contém um heading com Encountered Pokémons', () => {
  renderWithRouter(<App />);
  const pokeHeading = screen.getByText(/Encountered pokémons/);
  expect(pokeHeading).toBeInTheDocument();
});

test('Se é exibido o próximo pokémon quando clica', () => {
  renderWithRouter(<App />);
  const firstPoke = screen.getByText(/Pikachu/);
  expect(firstPoke).toBeInTheDocument();
  const nextButton = screen.getByTestId(/next-pokemon/);
  expect(nextButton).toHaveTextContent('Próximo pokémon');
  userEvent.click(nextButton);
  const nextPoke = screen.getByText(/Charmander/);
  expect(nextPoke).toBeInTheDocument();
});

test('Se é exibido apenas um pokemon por vez', () => {
  renderWithRouter(<App />);
  const pokeLen = screen.getAllByTestId('pokemon-name');
  expect(pokeLen.length).toBe(1);
});

test('Se existem os botões de filtro', () => {
  renderWithRouter(<App />);
  const buttonLen = screen.getAllByTestId(/pokemon-type-button/);
  expect(buttonLen[0].innerHTML).toBe('Electric');
  expect(buttonLen[1].innerHTML).toBe('Fire');
  expect(buttonLen[2].innerHTML).toBe('Bug');
  expect(buttonLen[3].innerHTML).toBe('Poison');
  expect(buttonLen[4].innerHTML).toBe('Psychic');
  expect(buttonLen[5].innerHTML).toBe('Normal');
  expect(buttonLen[6].innerHTML).toBe('Dragon');

  const allButton = screen.getByText('All');
  expect(allButton).toBeInTheDocument();
});

test('Se contem um botao para resetar filtro', () => {
  renderWithRouter(<App />);
  const allButton = screen.getByText('All');
  expect(allButton).toBeInTheDocument();
  userEvent.click(allButton);
  const initialPokemon = screen.getByText(/Pikachu/);
  expect(initialPokemon).toBeInTheDocument();
});
