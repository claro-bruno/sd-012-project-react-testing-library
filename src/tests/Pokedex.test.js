import React from 'react';
import event from '@testing-library/user-event';
import { screen, cleanup } from '@testing-library/react';
import pokemons from '../data';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

describe('Testando o componente Pokedex.js', () => {
  beforeEach(() => renderWithRouter(<App />));
  afterEach(cleanup);
  const pokemonTypes = [...new Set(pokemons.map((pokemon) => pokemon.type))];

  test('Testa se página contém um h2 com o texto "Encountered pokémons"', () => {
    const h2 = screen.getByRole('heading', { name: /Encountered pokémons/i, level: 2 });
    expect(h2).toBeInTheDocument();
  });

  test('Testa se exibe o próximo Pokémon quando "Próximo pokémon" é clicado', () => {
    expect(screen.getByRole('button', { name: /Próximo pokémon/i })).toBeInTheDocument();

    pokemons.forEach((pokemon) => {
      const nextButton = screen.getByRole('button', { name: /Próximo pokémon/i });
      const pokemonName = screen.getByTestId('pokemon-name');
      expect(pokemonName).toHaveTextContent(pokemon.name);
      event.click(nextButton);
    });
  });
  test('Testa se é mostrado apenas um Pokémon por vez', () => {
    expect(screen.getAllByTestId('pokemon-name').length).toBe(1);
  });

  test('Testa se a Pokédex tem os botões de filtro', () => {
    const Buttons = screen.getAllByRole('button');
    pokemonTypes.forEach((type) => {
      const filterButton = Buttons.filter((button) => button.textContent === type);
      expect(filterButton.length).toBe(1);

      const allButton = screen.getByRole('button', { name: /All/i });
      expect(allButton).toBeInTheDocument();
      const btnType = screen.getByRole('button', { name: type });
      expect(btnType).toBeInTheDocument();
      event.click(btnType);
      const listPokemons = screen.getAllByTestId('pokemon-type');
      const FilteredPokemons = listPokemons.filter((typ) => typ.textContent === type);
      expect(FilteredPokemons.length).toBe(listPokemons.length);
    });
  });

  test('Testando o botão All Reset', () => {
    const normalButton = screen.getByRole('button', { name: 'Normal' });
    const allButton = screen.getByRole('button', { name: /All/i });
    expect(allButton).toBeInTheDocument();
    const lenghtAllPokemons = 9;
    const allPokemons = pokemons.length;
    expect(allPokemons).toBe(lenghtAllPokemons);
    event.click(allButton);
    expect(allPokemons).toBe(lenghtAllPokemons);
    event.click(normalButton);
    const quantityNormal = pokemons.filter((pokedex) => pokedex.type === 'Normal');
    expect(quantityNormal.length).toBe(1);
  });
});
