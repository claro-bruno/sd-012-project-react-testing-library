import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import Pokedex from '../components/Pokedex';
import App from '../App';
import pokemons from '../data';
import userEvent from '@testing-library/user-event';

describe('Testa todo Pokedex.js', () => {
  it('renderiza titulo "Encountered pokémons"', () => {
    const { history } = renderWithRouter(<App />);

    const { pathname } = history.location;
    expect(pathname).toBe('/');

    const heading = screen.getByRole('heading', { name: /Encountered pokémons/i });
    expect(heading).toBeInTheDocument();
  });

  it('clicando no botão "Próximo pokémon"', () => {
    const isPokemonFavoriteById = App.setIsPokemonFavoriteById();
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);

    const btnNext = screen.getByTestId('next-pokemon');
    expect(btnNext).toBeInTheDocument();

    const firstPokemon = screen.getByTestId('pokemon-name');
    expect(firstPokemon).toHaveTextContent(pokemons[0].name);

    userEvent.click(btnNext);
    const secondPokemon = screen.getByTestId('pokemon-name');
    expect(secondPokemon).toHaveTextContent(pokemons[1].name);
  });

  it('clicando diversas vezes no botão "Próximo pokémon', () => {
    const isPokemonFavoriteById = App.setIsPokemonFavoriteById();
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);

    const btnNext = screen.getByTestId('next-pokemon');
    expect(btnNext).toBeInTheDocument();

    const firstPokemon = screen.getByTestId('pokemon-name');
    expect(firstPokemon).toHaveTextContent(pokemons[0].name);

    pokemons.forEach(() => {
      userEvent.click(btnNext);
    });

    const afterClicks = screen.getByTestId('pokemon-name');
    expect(afterClicks).toHaveTextContent(pokemons[0].name);
  });
});
