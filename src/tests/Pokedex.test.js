import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Testa o componente Pokedex', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  it('Testa se a página renderiza um h2 com o texto', () => {
    const headingPokedex = screen.getByRole('heading',
      { level: 2, name: 'Encountered pokémons' });
    expect(headingPokedex).toBeInTheDocument();
  });

  it('Testa se o botão para ir para o próximo pokemon contém o texto', () => {
    const nextPokemonBtn = screen.getByRole('button', { name: 'Próximo pokémon' });
    expect(nextPokemonBtn).toBeInTheDocument();
  });

  it('Testa se os próximos pokemons da lista são mostrados ao clicar no botão', () => {
    const pokemonName = 'pokemon-name';
    const firstPokemon = screen.getByTestId(pokemonName);
    expect(firstPokemon).toHaveTextContent('Pikachu');
    const nextPokemonBtn = screen.getByRole('button', { name: 'Próximo pokémon' });
    fireEvent.click(nextPokemonBtn);
    const nextPokemon = screen.getByTestId(pokemonName);
    expect(nextPokemon).not.toHaveTextContent('Pikachu');
  });

  it('Testa se ele retorna para o primeiro pokemon caso seja o ultimo', () => {
    const pokemonName = 'pokemon-name';
    const firstPokemon = screen.getByTestId(pokemonName);
    expect(firstPokemon).toHaveTextContent('Pikachu');
  });
});
