import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Verifica se as informações dos pokemons estão corretas', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });
  const moreDetails = 'More details';

  it('Verifica se o tipo do pokémon está correto', () => {
    const enteringPokeDetails = screen.getByText(moreDetails);
    fireEvent.click(enteringPokeDetails);
    const pokemonName = screen.getByText('Pikachu');
    expect(pokemonName).toBeDefined();
  });
  it('Verifica se o nome do pokémon está correto', () => {
    const enteringPokeDetails = screen.getByText(moreDetails);
    fireEvent.click(enteringPokeDetails);
    const pokemonType = screen.getByText('Electric');
    expect(pokemonType).toBeDefined();
  });
  it('Verifica se o nome do pokémon está correto', () => {
    const enteringPokeDetails = screen.getByText(moreDetails);
    fireEvent.click(enteringPokeDetails);
    const pokemonWeight = screen.getByText('Average weight: 6.0 kg');
    expect(pokemonWeight).toBeDefined();
  });
});
