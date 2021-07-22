import React from 'react';
import { screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
// import Pokedex from '../components/Pokedex';
import App from '../App';
import pokemons from '../data';

const pokemonTypesAmount = 7;

describe('Check if Pokedex.js is working as it should', () => {
  afterEach(cleanup);

  it('Check if there is a heading h2 with text "Encountered pokémons"', () => {
    renderWithRouter(<App />);
    const title = screen.getByRole('heading', { name: 'Encountered pokémons' });
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('Encountered pokémons');
    expect(title.tagName).toBe('H2');
  });
  it('Check if the "Próximo pokémon" is working as it should', () => {
    renderWithRouter(<App />);
    const nextButton = screen.getByRole('button', { name: 'Próximo pokémon' });
    expect(nextButton).toBeInTheDocument();
    pokemons.forEach((pokemon) => {
      const pokemonName = screen.getByText(pokemon.name);
      expect(pokemonName).toBeInTheDocument();
      userEvent.click(nextButton);
    });
  });
  it('Check if the filters are working as it should', () => {
    renderWithRouter(<App />);
    const filter = screen.getAllByTestId('pokemon-type-button');
    expect(filter.length).toBe(pokemonTypesAmount);
    const allButton = screen.getByRole('button', { name: 'All' });
    expect(allButton).toBeInTheDocument();
    filter.forEach((button) => {
      const nextButton = screen.getByRole('button', { name: 'Próximo pokémon' });
      expect(nextButton).toBeInTheDocument();
      userEvent.click(button);
      const currentType = button.innerHTML;
      const pokemonTypeString = 'pokemon-type';
      let type = screen.getByTestId(pokemonTypeString);
      expect(type.innerHTML).toBe(currentType);
      userEvent.click(nextButton);
      type = screen.getByTestId(pokemonTypeString);
      expect(type.innerHTML).toBe(currentType);
      userEvent.click(nextButton);
      type = screen.getByTestId(pokemonTypeString);
      expect(type.innerHTML).toBe(currentType);
      userEvent.click(nextButton);
      type = screen.getByTestId(pokemonTypeString);
      expect(type.innerHTML).toBe(currentType);
    });
    userEvent.click(allButton);
  });
  it('Check if the All type button is on the screen when App loads', () => {
    renderWithRouter(<App />);
    const allTypeButton = screen.getByRole('button', { name: 'All' });
    expect(allTypeButton).toBeInTheDocument();
    expect(allTypeButton).toHaveTextContent('All');
  });
});
