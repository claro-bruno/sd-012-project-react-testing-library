import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import pokemons from '../data';
import App from '../App';

describe('Requisito 5 - Teste o componente <Pokedéx.js /> ', () => {
  it('Testa se é exibido o título "Encountered pokémons"', () => {
    renderWithRouter(<App />);
    const pokedexTitle = screen.getByRole('heading', { level: 2 });
    expect(pokedexTitle).toHaveTextContent('Encountered pokémons');
  });
  it('Testa o botão "Próximo pokémon"', () => {
    renderWithRouter(<App />);
    const nextBtn = screen.getByTestId('next-pokemon');
    const pokemonName = screen.getByTestId('pokemon-name');
    expect(nextBtn).toHaveTextContent('Próximo pokémon');
    pokemons.forEach((pokemon, index) => {
      expect(pokemonName).toHaveTextContent(pokemon.name);
      if (index < pokemons.length - 1) {
        userEvent.click(nextBtn);
      }
    });
    expect(pokemonName).toHaveTextContent(pokemons[pokemons.length - 1].name);
    userEvent.click(nextBtn);
    expect(pokemonName).toHaveTextContent(pokemons[0].name);
  });
  it('Testa os botões de filtro', () => {
    renderWithRouter(<App />);
    const pokemonTypes = (pokemons
      .reduce((types, curr) => (types
        .some((type) => type === curr.type)
        ? types
        : [...types, curr.type]), []));
    const pokemonTypesBtn = screen.getAllByTestId('pokemon-type-button');
    const psychicBtn = screen.getByRole('button', { name: 'Psychic' });
    pokemonTypes.forEach((type) => {
      expect(screen.getByRole('button', { name: type })).toBeDefined();
    });
    expect(pokemonTypesBtn.length).toBe(pokemonTypes.length);
    userEvent.click(psychicBtn);
    expect(screen.getByText('Alakazam')).toBeInTheDocument();
    userEvent.click(screen.getByRole('button', { name: 'All' }));
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
  });
});
