import React from 'react';
import { Router } from 'react-router-dom';
import { fireEvent, getByRole, getByTestId, render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import App from '../App';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(
      <Router history={ history }>
        {component}
      </Router>,
    ),
    history,
  });
};

beforeEach(() => {
  renderWithRouter(<App />);
});

test('Verifica heading h2', () => {
  const encountered = screen.getByRole('heading', { name: 'Encountered pokémons' });
  expect(encountered).toBeInTheDocument();
});

test('Verifica presença e funcionamento do botao "Próximo pokémon"', () => {
  const nextBtn = screen.getByRole('button', { name: 'Próximo pokémon' });
  const pokeArray = [
    'Pikachu', 'Charmander', 'Caterpie', 'Ekans', 'Alakazam', 'Mew',
    'Rapidash', 'Snorlax', 'Dragonair'];
  pokeArray.forEach((crr) => {
    const currentPokemon = screen.getByTestId('pokemon-name');
    expect(currentPokemon).toHaveTextContent(crr);
    if (crr === 'Dragonair') {
      fireEvent.click(nextBtn);
      expect(screen.getByTestId('pokemon-name')).toHaveTextContent('Pikachu');
    } else {
      fireEvent.click(nextBtn);
    }
  });
});

test('Verifica os botoes de filtro de pokemon', () => {
  const typeBtns = [
    'Electric', 'Fire', 'Bug', 'Poison', 'Psychic',
    'Normal', 'Dragon'];
  const allBtns = screen.getAllByRole('button');
  const numberOfBtns = 9;
  expect(allBtns.length).toEqual(numberOfBtns);
  typeBtns.forEach((crr) => {
    const filterBtn = screen.getByRole('button', { name: crr });
    fireEvent.click(filterBtn);
    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toHaveTextContent(crr);
    const allBtn = screen.getByRole('button', { name: 'All' });
    expect(allBtn).toBeEnabled();
  });
});

test('Verifica se existe botao "All" que reseta o filtro de tipos', () => {
  const allBtn = screen.getByRole('button', { name: 'All' });
  expect(allBtn).toBeInTheDocument();
  fireEvent.click(allBtn);
  fireEvent.click(screen.getByText('Próximo pokémon'));
  expect(screen.getByText('Pikachu')).toBeInTheDocument();
  fireEvent.click(screen.getByText('Próximo pokémon'));
  expect(screen.getByText('Charmander')).toBeInTheDocument();
});
