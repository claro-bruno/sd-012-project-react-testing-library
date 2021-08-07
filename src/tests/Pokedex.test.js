import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import Data from '../data';

describe('Testa pokedex', () => {
  test('Testa a existência do texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const ePokemons = screen.getByRole('heading', { name: 'Encountered pokémons' });
    expect(ePokemons).toBeInTheDocument();
  });

  test('Testa a existência e a funcionalidade do botão Próximo pokémon', () => {
    renderWithRouter(<App />);
    const pokemons = Data;
    const nextButton = screen.getByRole('button', { name: 'Próximo pokémon' });
    expect(nextButton).toBeInTheDocument();
    pokemons.forEach((pokemon) => {
      if (pokemons.indexOf(pokemon) !== pokemons.length - 1) {
        const thisPokemon = screen.getByText(pokemon.name);
        const onlyOnePokemon = screen.getAllByTestId('pokemon-name');
        expect(thisPokemon).toBeInTheDocument();
        expect(onlyOnePokemon.length).toBe(1);
        fireEvent.click(nextButton);
      } else {
        const thisPokemon = screen.getByText(pokemon.name);
        const onlyOnePokemon = screen.getAllByTestId('pokemon-name');
        expect(thisPokemon).toBeInTheDocument();
        expect(onlyOnePokemon.length).toBe(1);
        fireEvent.click(nextButton);
        const firstPokemon = screen.getByText('Pikachu');
        expect(firstPokemon).toBeInTheDocument();
        expect(onlyOnePokemon.length).toBe(1);
      }
    });
  });

  test('Testa pokedex, os botões de filtro por tipo e o botão all',
    () => {
      renderWithRouter(<App />);
      const allButton = screen.getByRole('button', { name: 'All' });
      const nextButton = screen.getByRole('button', { name: 'Próximo pokémon' });
      const pokemons = Data;
      pokemons.forEach((pokemon) => {
        if (pokemons.indexOf(pokemon) === pokemons
          .indexOf(pokemons.find((poke) => poke.type === pokemon.type))) {
          const typeButton = screen.getByRole('button', { name: pokemon.type });
          expect(typeButton).toBeInTheDocument();
          expect(allButton).toBeInTheDocument();
          fireEvent.click(typeButton);
          const filteredPokemons = pokemons.filter((poke) => poke.type === pokemon.type);
          filteredPokemons.forEach((poke) => {
            const thisPokemon = screen.getByText(poke.name);
            expect(thisPokemon).toBeInTheDocument();
            fireEvent.click(nextButton);
          });
          const getPokemon = screen.getByText(filteredPokemons[0].name);
          expect(getPokemon).toBeInTheDocument();
          expect(allButton).toBeInTheDocument();
        }
      });
      fireEvent.click(allButton);
      pokemons.forEach((pokemon) => {
        const thisPokemon = screen.getByText(pokemon.name);
        expect(thisPokemon).toBeInTheDocument();
        fireEvent.click(nextButton);
      });
      const firstPokemon = screen.getByText(pokemons[0].name);
      expect(firstPokemon).toBeInTheDocument();
    });
});
