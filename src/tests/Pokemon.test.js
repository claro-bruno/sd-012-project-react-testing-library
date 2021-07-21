import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Verifica se as informações dos pokemons estão corretas', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  it('Verifica se o nome do pokémon está correto', () => {
    const enteringPokeDetails = screen.getByText('More details');
    fireEvent.click(enteringPokeDetails);
    const pokemonName = screen.getByText('Pikachu');
    expect(pokemonName).toBeDefined();
  });
});
