import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import Pokedex from '../components/Pokedex';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

const isPokemonFavoriteById = {
  4: true,
  10: false,
  23: false,
  25: true,
  65: false,
  78: false,
  143: false,
  148: false,
  151: false,
};

describe('Testa Pokédex', () => {
  test('Testa heading', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);
    const h2 = screen.getByRole('heading');
    expect(h2).toHaveTextContent('Encountered pokémons');
  });

  test('Testa botão de próximo', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);
    const button = screen.getByText('Próximo pokémon');
    expect(button).toBeInTheDocument();
    pokemons.forEach((pokemon) => {
      const pokemonName = screen.getByText(pokemon.name);
      expect(pokemonName).toBeInTheDocument();
      fireEvent.click(button);
    });
    const pikachu = screen.getByText('Pikachu');
    expect(pikachu).toBeInTheDocument();
  });

  test('Testa se só há 1 pokémon', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);
    const pokemonNames = screen.getAllByTestId('pokemon-name');
    expect(pokemonNames).toHaveLength(1);
  });

  test('Testa botões de filtro', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);
    const allButton = screen.getByRole('button', { name: 'All' });
    const nextButton = screen.getByText('Próximo pokémon');
    pokemons.forEach((pokemon) => {
      expect(allButton).toBeInTheDocument();
      const getTypeButtons = screen.getAllByTestId('pokemon-type-button');
      const typeButtons = getTypeButtons
        .filter((button) => button.innerHTML === pokemon.type);
      expect(typeButtons).toHaveLength(1);
      fireEvent.click(typeButtons[0]);
      const pokemonsOfType = pokemons
        .filter((getPokemon) => getPokemon.type === pokemon.type);
      pokemonsOfType.forEach((pokemonOfType) => {
        const type = screen.getByTestId('pokemon-type');
        expect(type).toBeInTheDocument();
        expect(type).toHaveTextContent(pokemonOfType.type);
        fireEvent.click(nextButton);
      });
    });
    fireEvent.click(allButton);
    pokemons.forEach((pokemon) => {
      const pokemonName = screen.getByText(pokemon.name);
      expect(pokemonName).toBeInTheDocument();
      fireEvent.click(nextButton);
    });
  });
});
