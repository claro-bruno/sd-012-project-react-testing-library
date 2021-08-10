import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Requisito 5 - Testa o componenete <Pokedex />', () => {
  const isPokemonFavorite = pokemons.reduce((acc, pokemon) => {
    acc[pokemon.id] = false;
    return acc;
  }, {});

  beforeEach(() => {
    renderWithRouter(<App
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavorite }
    />);
  });

  // const allPokemonsName = pokemons.map((pokemon) => pokemon.name);

  // Desenvolvido com a ajuda do David Gonzaga
  it('Testa se há um <h2> com o texto "Encountered pokémons"', () => {
    const takeH2 = screen.getByRole('heading', { name: /encountered pokémons/i });
    expect(takeH2).toBeInTheDocument();
  });

  it('Testa se há um botão com o texto "Próximo pokémon"', () => {
    const takeBtn = screen.getByRole('button', { name: /Próximo pokémon/i });

    expect(takeBtn).toBeInTheDocument();
  });

  it('Testa a funcionalidade do botão "All', () => {
    const takeBtn = screen.getByRole('button', { name: /all/i });
    const takeBtnPikachu = screen.getByText('Pikachu');

    userEvent.click(takeBtn);
    expect(takeBtn).toBeInTheDocument();
    expect(takeBtnPikachu.textContent).toBe('Pikachu');
  });

  it('Testa se aparece o botao com o tipo do Pokémon', () => {
    const takeBtn = screen.getByRole('button', { name: /electric/i });

    expect(takeBtn).toBeInTheDocument();
  });

  it('Testa se há apenas 1 pokémon sendo mostrado', () => {
    const pokemonAmount = screen.getAllByTestId('pokemon-name');
    expect(pokemonAmount.length).toBe(1);
    expect(pokemonAmount[0]).toBeInTheDocument();
  });
});
