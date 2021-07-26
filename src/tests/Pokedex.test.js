import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Verifica componente Pokedex', () => {
  beforeEach(() => renderWithRouter(<App />));
  test('Verifica heading h2', () => {
    const encountered = screen.getByRole('heading', { name: 'Encountered pokémons' });
    expect(encountered).toBeInTheDocument();
  });
  test('Verifica presença e funcionamento do botão "Próximo pokémon"', () => {
    const nextBtn = screen.getByTestId('next-pokemon');
    const pokeArray = [
      'Pikachu', 'Charmander', 'Caterpie', 'Ekans', 'Alakazam', 'Mew',
      'Rapidash', 'Snorlax', 'Dragonair'];
    pokeArray.forEach((crr) => {
      const currentPokemon = screen.getByTestId('pokemon-name');
      expect(currentPokemon).toHaveTextContent(crr);
      if (crr === 'Dragonair') {
        fireEvent.click(nextBtn);
        expect(currentPokemon).toHaveTextContent('Pikachu');
      } else {
        fireEvent.click(nextBtn);
      }
    });
  });
  test('Verifica funcionamento dos botões de filtro de pokemon', () => {
    const typeBtns = [
      'Electric', 'Fire', 'Bug', 'Poison', 'Psychic',
      'Normal', 'Dragon'];
    const allBtns = screen.getAllByTestId('pokemon-type-button');
    const numberOfBtns = 7;
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
  test('Verifica se existe botão "All" que reseta o filtro de tipos', () => {
    const allBtn = screen.getByRole('button', { name: 'All' });
    expect(allBtn).toBeInTheDocument();
    const currPokemon = screen.getByTestId('pokemon-name');
    expect(currPokemon).toHaveTextContent('Pikachu');
    fireEvent.click(screen.getByText('Próximo pokémon'));
    expect(currPokemon).toHaveTextContent('Charmander');
    const normalTypeBtn = screen.getByRole('button', { name: 'Normal' });
    fireEvent.click(normalTypeBtn);
    expect(currPokemon).toHaveTextContent('Snorlax');
    fireEvent.click(allBtn);
    expect(currPokemon).toHaveTextContent('Pikachu');
  });
});
