import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

test('Testa se a pagina possui um h2 com o texto correto', () => {
  renderWithRouter(<App />);
  const h2 = screen.getAllByRole('heading');
  expect(h2[1]).toHaveTextContent('Encountered pokémons');
});

test('Testa a funcionalidade do botao proximo pokemon', () => {
  const len = pokemons.length;
  renderWithRouter(<App />);
  const btnProximo = screen.getByRole('button', { name: 'Próximo pokémon' });
  expect(btnProximo).toBeInTheDocument();
  const firstPoke = pokemons[0].name;

  for (let i = 0; i < len; i += 1) {
    const { name } = pokemons[i];
    const element = screen.getByText(name);
    expect(element).toBeInTheDocument();
    fireEvent.click(btnProximo);
    if (i === len - 1) {
      expect(element.innerHTML).toMatch(firstPoke);
    }
  }
});

test('Teste se é mostrado apenas um Pokémon por vez', () => {
  const len = pokemons.length;
  renderWithRouter(<App />);
  const btnProximo = screen.getByRole('button', { name: 'Próximo pokémon' });

  for (let i = 0; i < len; i += 1) {
    const testIds = screen.getAllByTestId('pokemon-name');
    expect(testIds.length).toBe(1);
    fireEvent.click(btnProximo);
  }
});

test('Teste se a Pokédex tem os botões de filtro', () => {
  renderWithRouter(<App />);
  const testIds = screen.getAllByTestId('pokemon-type-button');
  expect(testIds[0]).toHaveTextContent('Electric');
  expect(testIds[1]).toHaveTextContent('Fire');
  expect(testIds[2]).toHaveTextContent('Bug');
  expect(testIds[3]).toHaveTextContent('Poison');
  expect(testIds[4]).toHaveTextContent('Psychic');
  expect(testIds[5]).toHaveTextContent('Normal');
  expect(testIds[6]).toHaveTextContent('Dragon');
});

test('Testa se existe o botao All', () => {
  renderWithRouter(<App />);
  const allBtn = screen.getByRole('button', { name: 'All' });
  expect(allBtn).toBeInTheDocument();
  fireEvent.click(allBtn);
});
