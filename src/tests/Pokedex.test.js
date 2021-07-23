import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

describe('Testa Pokédex', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  const next = 'Próximo pokémon';

  it('Se o título está presente', () => {
    const title = screen.getByRole('heading', { name: 'Encountered pokémons' });

    expect(title).toBeInTheDocument();
  });

  it('Funcionalidade do botão Próximo pokémon', () => {
    const nextButton = screen.getByText(next);

    expect(nextButton).toBeInTheDocument();

    pokemons.map((pokemon) => {
      const actualPokemon = screen.getByText(pokemon.name);

      if (pokemon.name === 'Dragonair') {
        fireEvent.click(nextButton);
        const firstPokemon = screen.getByText('Pikachu');

        return expect(firstPokemon).toBeDefined();
      }

      expect(actualPokemon).toBeInTheDocument();

      return fireEvent.click(nextButton);
    });
  });

  it('Quantidade de pokemons mostrados', () => {
    const nextButton = screen.getByText(next);
    pokemons.map(() => {
      fireEvent.click(nextButton);

      const pokeCards = screen.queryAllByText(/Average weight/i);

      return expect(pokeCards).toHaveLength(1);
    });
  });

  it('Botões filtro', () => {
    const filterTypes = [
      'All',
      'Electric',
      'Fire',
      'Bug',
      'Poison',
      'Psychic',
      'Normal',
      'Dragon',
    ];
    filterTypes.map((type) => {
      const allButton = screen.getByRole('button', { name: 'All' });

      expect(allButton).toBeInTheDocument();

      const typeButton = screen.getByRole('button', { name: type });

      return expect(typeButton).toBeInTheDocument();
    });
  });

  it('Reset button', () => {
    const allButton = screen.getByText('All');
    const nextButton = screen.getByText(next);
    const noFilter = () => pokemons.map((pokemon) => {
      const actualPokemon = screen.getByText(pokemon.name);

      expect(actualPokemon).toBeInTheDocument();

      return fireEvent.click(nextButton);
    });

    fireEvent.click(allButton);

    noFilter();

    window.onload = jest.fn(() => {
      noFilter();
    });
  });
});
