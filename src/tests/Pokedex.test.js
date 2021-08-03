import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testes no componente renderWithRouter', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  it('Se há um h2 com o texto "Encontered pokémons"', () => {
    const headingH2 = screen.getByText('Encountered pokémons');
    expect(headingH2).toBeInTheDocument();
  });

  it('Se é exibido o próximo Pokémon da lista', () => {
    const buttonNextPkm = screen.getByRole('button', { name: /Próximo pokémon/i });
    expect(buttonNextPkm).toBeDefined();
    const firstPokemon = pokemons[0].name;
    pokemons.forEach((pokemon) => {
      expect(screen.getByText(`${pokemon.name}`)).toBeDefined();
      userEvent.click(buttonNextPkm);
    });
    expect(screen.getByText(`${firstPokemon}`)).toBeDefined();
  });

  it('Se é mostrado apenas 1 pokémon por vez', () => {
    const pokemon = screen.getAllByTestId('pokemon-name');
    expect(pokemon.length).toBe(1);
  });

  it('Se a Pokédex pussui os botões de filtro', () => {
    const pokemonTypes = pokemons.map((pkm) => pkm.type);
    const types = pokemonTypes.filter((type, i) => pokemonTypes.indexOf(type) === i);

    const allBtn = screen.getByRole('button', { name: /All/i });
    expect(allBtn).toBeDefined();
    const buttonType = screen.getAllByTestId('pokemon-type-button');
    expect(buttonType).toBeDefined();
    types.forEach((type) => {
      expect(allBtn).toBeDefined();
      const buttonTypePk = screen.getByRole('button', { name: type });
      expect(buttonTypePk).toBeDefined();
      userEvent.click(buttonTypePk);
    });
    userEvent.click(allBtn);
    expect(screen.getByText(`${pokemons[0].name}`)).toBeDefined();
  });
});
