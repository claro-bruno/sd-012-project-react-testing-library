import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';
import App from '../App';

const isPokemonFavoriteById = App.setIsPokemonFavoriteById();

describe('Testando o componente pokedex', () => {

  beforeEach(() => {
    renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ isPokemonFavoriteById } />,
    );
  });

  test('Verifica se a página tem um h2 com o texto "Encountered Pokemons', () => {
    const h2 = screen.getByRole('heading');
    expect(h2.innerHTML).toBe('Encountered pokémons');
  });

  test('Verifica se o botão para mostrar o "Próximo pokémon" tem este texto', () => {
    const button = screen.getByTestId('next-pokemon');
    expect(button.innerHTML).toBe('Próximo pokémon');
  });

  test('Verifica se é mostrado um pokemon por vez', () => {
    
  });
});
