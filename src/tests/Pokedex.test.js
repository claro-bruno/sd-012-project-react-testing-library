import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pokedex from '../components/Pokedex';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

const favorites = {
  4: false,
  10: true,
  23: false,
  25: true,
  65: false,
  78: false,
  143: false,
  148: false,
  151: false,
};

describe('Requisito 5 - Teste o componente <Pokedex.js />', () => {
  beforeEach(() => renderWithRouter(<Pokedex
    pokemons={ pokemons }
    isPokemonFavoriteById={ favorites }
  />));

  it('1. Teste se página contém um heading h2 com o texto Encountered pokémons.', () => {
    const headingH2 = screen.getByRole('heading', { name: 'Encountered pokémons' });

    expect(headingH2).toBeInTheDocument();
  });

  it('2. Teste se é exibido o próximo Pokémon da lista quando o botão Próximo é clicado.',
    () => {
      const button = screen.getByText('Próximo pokémon');
      expect(button).toBeInTheDocument();

      pokemons.forEach((event) => {
        const pokemon = screen.getByTestId('pokemon-name');
        expect(pokemon.textContent).toBe(event.name);
        userEvent.click(button);
      });
    });

  it('3. Teste se é mostrado apenas um Pokémon por vez.', () => {
    const pokemonsName = screen.getAllByTestId('pokemon-name');

    expect(pokemonsName.length).toBe(1);
  });

  it('4a. Teste se a Pokédex tem os botões de filtro.', () => {
    const buttons = screen.getAllByTestId('pokemon-type-button');
    userEvent.click(buttons[0]);

    expect(screen.getByTestId('next-pokemon')).toBeDisabled();
  });

  it('4b. Teste se contém um botão com o tipo Fire', () => {
    const button = screen.getByText('Fire');

    expect(button).toBeInTheDocument();
  });

  it('5. Teste se a Pokédex contém um botão para resetar o filtro.', () => {
    const button = screen.getByText('All');
    userEvent.click(button);
    expect(button).toBeInTheDocument();

    const pokemon = screen.getByText('Pikachu');
    expect(pokemon.textContent).toBe('Pikachu');
  });
});
