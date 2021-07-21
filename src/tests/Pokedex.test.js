import React from 'react';
import { getByRole, screen } from '@testing-library/react';
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
    const pikachu = screen.getByText(pokemons[0].name);
    expect(pikachu).toBeInTheDocument();
    userEvent.click(nextButton);
    const charmander = screen.getByText(pokemons[1].name);
    expect(charmander).toBeInTheDocument();
  });
});
