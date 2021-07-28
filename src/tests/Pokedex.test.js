import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

test('Teste se página contém um heading `h2` com o texto', () => {
  renderWithRouter(<App />);
  const headingTypeDex = screen.getByRole('heading', { level: 2 });
  expect(headingTypeDex).toHaveTextContent(/Encountered pokémons/i);
});

test('Teste é exibido o próximo Pokémon da lista quando o botão é clicado', () => {
  renderWithRouter(<App />);
  const proximoPok = screen.getByRole('button', { name: 'Próximo pokémon' });
  userEvent.click(proximoPok);
  const pokChar = screen.getAllByText('Charmander');
  expect(pokChar[0]).toBeInTheDocument();
});

test('Teste se é mostrado apenas um Pokémon por vez', () => {
  renderWithRouter(<App />);
  const valor = screen.getAllByTestId('pokemon-name');
  expect(valor.length).toBe(1);
});

test('Teste se a Pokédex tem os botões de filtro', () => {
  renderWithRouter(<App />);
  const FButton = screen.getAllByTestId('pokemon-type-button');
  expect(FButton).toBeDefined();
  const psyButton = screen.getByRole('button', { name: 'Psychic' });
  userEvent.click(psyButton);
  expect(psyButton).toBeDefined();
});

test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
  renderWithRouter(<App />);
  const resetF = screen.getByRole('button', { name: 'All' });
  userEvent.click(resetF);
  const pokedexPok = screen.getByTestId('pokemon-name');
  expect(pokedexPok).toHaveTextContent('Pikachu');
});
