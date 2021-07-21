import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';

describe('Testes para componente Pokedex', () => {
  beforeEach(() => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ { 25: true, 4: true, } }
      />
    );
  })
  it('Verifica se a pagina tem uma heading h2 com texto definido', () => {
    const headingText = screen.getByRole('heading', { name: /Encountered pokémons/i });
    expect(headingText).toBeInTheDocument();
  });
  it('Verifica se mostra o proximo pokemon da lista ao clicar em next', () => {
    const nextButton = screen.getByRole('button', { name: /Próximo pokémon/i });
    pokemons.forEach((pokemon, index) => {
      const poke = screen.getByText(pokemon.name);
      expect(poke).toBeInTheDocument();
      userEvent.click(nextButton);
      let nextIndex = index + 1;
      if(index === pokemons.length - 1) nextIndex = 0;
      const nextPoke = screen.getByText(pokemons[nextIndex].name);
      expect(nextPoke).toBeInTheDocument();
    });
  });
  it('Verifica se e mostrado so um pokemon por vez', () => {

  })
});
