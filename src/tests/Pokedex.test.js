import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';
import mockFavPokemonById from '../helpers/mockIsFavoritePokemonById';

describe('Tests Pokedex.js', () => {
  beforeEach(() => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ mockFavPokemonById }
      />,
    );
  });

  it('tests if there is one heading with the text "Encountered pokémons"', () => {
    const headingText = screen.getByRole('heading', { name: 'Encountered pokémons' });
    expect(headingText).toBeDefined();
  });

  it('tests if a new pokemon appear when "Next Pokemon" button is clicked', () => {
    const nextPokemonButton = screen.getByRole('button', { name: 'Próximo pokémon' });
    expect(nextPokemonButton).toBeDefined();

    const firstPokemon = screen.getByText('Pikachu');
    expect(firstPokemon).toBeDefined();

    pokemons.forEach((pokemon) => {
      expect(screen.getByText(pokemon.name)).toBeInTheDocument();
      userEvent.click(nextPokemonButton);
    });
    const lastPokemonAfterForEach = screen.getByText('Pikachu');
    expect(lastPokemonAfterForEach).toBeDefined();

    userEvent.click(nextPokemonButton);

    const secondPokemon = screen.getByText('Charmander');
    expect(secondPokemon).toBeDefined();
  });

  it('tests if there are filter buttons', () => {
    const typeButtons = screen.getAllByTestId('pokemon-type-button');
    const buttonAll = screen.getByRole('button', { name: 'All' });
    const screenButtons = [buttonAll, ...typeButtons];

    expect(screenButtons).toBeDefined();

    const pokemonsType = ['All', ...new Set(pokemons.map(({ type }) => type))];
    expect(pokemonsType.length).toStrictEqual(screenButtons.length);
  });

  it('tests if the filter buttons works correctly', () => {
    const screenButtons = screen.getAllByTestId('pokemon-type-button');
    const pokemonsType = [...new Set(pokemons.map(({ type }) => type))];

    screenButtons.forEach((screenTypePokemons, index) => {
      expect(screenTypePokemons.textContent).toStrictEqual(pokemonsType[index]);
      userEvent.click(screenButtons[index]);
      const nextPokemonButton = screen.getByRole('button', { name: 'Próximo pokémon' });
      const filteredPokemons = pokemons.filter(({ type }) => (
        type === screenButtons[index].innerHTML));

      filteredPokemons.forEach((cupokemon, cuindex) => {
        expect(cupokemon.type).toBe(screenButtons[index].innerHTML);
        const currentPokemon = screen.getByText(cupokemon.name);

        if (filteredPokemons.length <= 1) {
          expect(nextPokemonButton).toBeDisabled();
          const buttonAll = screen.getByRole('button', { name: 'All' });
          expect(buttonAll).toBeDefined();
          return;
        }

        expect(nextPokemonButton).toBeEnabled();
        userEvent.click(nextPokemonButton);
        expect(currentPokemon).toBeDefined();
        expect(currentPokemon.innerHTML).not.toBe(filteredPokemons[cuindex].name);
        const buttonAll = screen.getByRole('button', { name: 'All' });
        expect(buttonAll).toBeDefined();
      });
    });
  });
  it('tests if there is some reset button', () => {
    const buttonAll = screen.getByRole('button', { name: 'All' });
    expect(buttonAll).toBeDefined();
    userEvent.click(buttonAll);
    expect(pokemons.every((pokemon) => pokemon.type !== 'All')).toBeTruthy();
  });
});
