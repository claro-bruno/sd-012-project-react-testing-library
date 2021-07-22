import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import data from '../data';

describe('Testa o componente Pokedex', () => {
  const pokeTypes = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
  const pokemonName = 'pokemon-name';
  it('Verifica se contém h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const h2Element = screen.getByText('Encountered pokémons');
    expect(h2Element).toBeInTheDocument();
  });
  it('Verifica quando clicado "Próximo pokémon", outro pokémon é exibido', () => {
    renderWithRouter(<App />);
    const buttonElement = screen.getByTestId('next-pokemon');
    expect(buttonElement).toBeInTheDocument();
    data.forEach((pokemon) => {
      expect(screen.getByTestId(pokemonName).innerHTML).toBe(pokemon.name);
      expect(screen.getByTestId('pokemon-type').innerHTML).toBe(pokemon.type);
      userEvent.click(buttonElement);
    });
  });
  it('Verifica se é mostrado apenas 1 pokemon por vez', () => {
    renderWithRouter(<App />);
    const pokeName = screen.getAllByTestId('pokemon-name');
    expect(pokeName.length).toBe(1);
  });
  it('Verifica os botões de filtro', () => {
    renderWithRouter(<App />);
    const dataId = 'pokemon-type-button';
    const filterBtns = screen.getAllByTestId(dataId);
    console.log(filterBtns);
    const expectedNumberLength = 7;
    expect(screen.getAllByTestId(dataId).length).toBe(expectedNumberLength);
    expect(filterBtns.forEach((btn, i) => {
      expect(btn.innerHTML).toBe(pokeTypes[i]);
    }));
  });
  it('Verifica o funcionamento do botão All', () => {
    renderWithRouter(<App />);
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokeName = screen.getByTestId(pokemonName);
    const btnFilterAll = screen.getByTestId('');
    userEvent.click(btnFilterAll);
    expect(pokeName).toHaveTextContent('Pikachu');
    expect(pokemonType).toHaveTextContent('Electric');
  });
});
