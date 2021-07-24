import React from 'react';
import { cleanup, fireEvent, screen } from '@testing-library/react';
import pokemons from '../data';
import App from '../App';
import renderWithRouter from './renderWithRouter';

const pokemonNames = pokemons.map(({ name }) => name);
const lastPokemon = pokemonNames.length - 1;
const pokemonTypes = [...new Set(pokemons.map((pokemon) => pokemon.type))];
const pokemonsPsy = pokemons
  .filter(({ type }) => type === 'Psychic')
  .map(({ name }) => name);

describe('testa componente Pokedex', () => {
  beforeEach(() => renderWithRouter(<App />));
  afterEach(cleanup);

  it('testa se h2 contém texto "Encountered pokémons"', () => {
    const h2 = screen.getByRole('heading', { name: /Encountered pokémons/i, level: 2 });
    expect(h2).toBeInTheDocument();
  });

  it('testa funcionamento do botão "Próximo pokémon"', () => {
    const btn = screen.getByRole('button', { name: 'Próximo pokémon' });

    pokemonNames.forEach((name, index) => {
      const pokemonName = screen.getByTestId('pokemon-name');
      expect(pokemonName).toBeInTheDocument();

      if (index < lastPokemon) fireEvent.click(btn);
      const pokemionImg = screen.getAllByRole('img');
      expect(pokemionImg).toHaveLength(1);
    });

    fireEvent.click(btn);
    const firstPokemon = screen.getByText(pokemonNames[0]);
    expect(firstPokemon).toBeInTheDocument();
  });

  it('verifica o funcionamento de um botão para cada tipo de pokemon', () => {
    const nextBtn = screen.getByTestId('next-pokemon');
    const buttonsType = screen.getAllByTestId('pokemon-type-button');
    expect(buttonsType).toHaveLength(pokemonTypes.length);

    pokemonTypes.forEach((type) => {
      const qty = pokemons.filter((pokemon) => pokemon.type === type) + 1;
      const btnType = screen.getByRole('button', { name: type });

      fireEvent.click(btnType);

      Array(qty).fill(0).forEach(() => {
        const pokemonType = screen.getByTestId('pokemon-type');
        expect(pokemonType).toHaveTextContent(type);
        fireEvent.click(nextBtn);
      });
    });
  });

  it('verifica o funcionamento do botão all', () => {
    const nextBtn = screen.getByTestId('next-pokemon');
    const btnAll = screen.getByRole('button', { name: 'All' });
    const btnPsy = screen.getByRole('button', { name: 'Psychic' });

    expect(btnAll).toBeInTheDocument();
    const checkAll = (array) => array.forEach((name) => {
      const pokemonName = screen.getByTestId('pokemon-name');
      expect(pokemonName).toHaveTextContent(name);
      fireEvent.click(nextBtn);
    });

    checkAll(pokemonNames);

    fireEvent.click(btnPsy);
    checkAll(pokemonsPsy);

    fireEvent.click(btnAll);
    checkAll(pokemonNames);
  });
});
