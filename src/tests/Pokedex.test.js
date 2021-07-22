import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../../renderWithRouter';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';
import mockFavArray from '../../mocks/mockFavArray';
import mockTypes from '../../mocks/mockTypes';

// prettier-ignore
describe('Requisito 5', () => {
  beforeEach(() => renderWithRouter(<Pokedex
    pokemons={ pokemons }
    isPokemonFavoriteById={ mockFavArray }
  />));
  it('5.1 - Teste se página contém um heading com o texto Encountered pokémons', () => {
    const encountered = screen.getByText(/Encountered pokémons/i);
    expect(encountered).toBeInTheDocument();
  });
  it('5.2 - Teste se é exibido o próximo Pokémon da lista', () => {
    const nextButton = screen.getByText(/Próximo pokémon/i);
    fireEvent.click(nextButton);
    const pokemonName = screen.getByText(/Charmander/);
    expect(pokemonName).toBeInTheDocument();
  });
  it('5.2.1 - O botão deve conter o texto Próximo pokémon.', () => {
    const nextButton = screen.getByText(/Próximo pokémon/i);
    expect(nextButton).toBeInTheDocument();
  });
  it('5.3 - Teste se é mostrado apenas um Pokémon por vez.', () => {
    const pokemonsTest = screen.getAllByTestId('pokemon-name');
    expect(pokemonsTest.length).toBe(1);
  });
  it('5.4.2 - Testa filtragem de tipo do Pokémon.', () => {
    mockTypes.forEach((type) => {
      fireEvent.click(screen.getByRole('button', { name: type }));
      expect(screen.getByTestId('pokemon-type')).toHaveTextContent(type);
    });
  });
  it('5.4.3 - O texto do botão deve corresponder ao nome do tipo, ex. Psychic.', () => {
    const filterBtns = screen.getAllByTestId('pokemon-type-button');
    filterBtns.forEach((btn, index) => {
      expect(mockTypes[index]).toContain(btn.innerHTML);
    });
  });
  it('5.5 - Teste se a Pokédex contém um botão para resetar o filtro.', () => {
    const all = screen.getByText(/All/i);
    expect(all).toBeInTheDocument();
    fireEvent.click(all);
  });
});
