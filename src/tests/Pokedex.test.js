import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

describe('Testes do componente Pokedex.JS', () => {
  test('Testa se heading h2 contém texto "Encountered pokémons"', () => {
    renderWithRouter(<App />);
    const h2App = screen.getByRole('heading', { name: 'Encountered pokémons' });
    expect(h2App).toBeDefined();
  });

  test('Testa se é exibido o próximo Pokémon'
    + ' quando o botão "Próximo pokémon" é clicado', () => {
    renderWithRouter(<App />);
    const button = screen.getByRole('button', { name: 'Próximo pokémon' });
    expect(button).toBeDefined();

    const firstPokemon = screen.getByTestId('pokemon-name');
    expect(firstPokemon).toBeDefined();

    pokemons.forEach((pokemon) => {
      const eachPokemon = screen.queryByText(pokemon.name);
      expect(eachPokemon).toHaveTextContent(pokemon.name);
      userEvent.click(button);
    });

    expect(firstPokemon).toHaveTextContent('Pikachu');
  });

  test('Testa se é mostrado um pokémon por vez', () => {
    renderWithRouter(<App />);
    const pokeName = screen.getAllByTestId('pokemon-name');
    expect(pokeName).toHaveLength(1);
  });

  test('Testa se a Pokédex tem os botões de Filtro', () => {
    renderWithRouter(<App />);
    const typeButtons = screen.getAllByTestId('pokemon-type-button');
    console.log(typeButtons.innerHTML);
    const types = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];

    types.forEach((type, index) => {
      expect(typeButtons[index]).toHaveTextContent(type);
      expect(screen.getByRole('button', { name: 'All' })).toBeDefined();
    });

    typeButtons.forEach((button, index) => {
      userEvent.click(button);
      const eachName = screen.getByTestId('pokemon-type');
      expect(eachName).toHaveTextContent(types[index]);
      userEvent.click(screen.getByRole('button', { name: 'Próximo pokémon' }));
      expect(eachName).toHaveTextContent(types[index]);
    });
  });
});
