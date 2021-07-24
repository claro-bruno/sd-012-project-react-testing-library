import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

const nextButtonName = 'Próximo pokémon';

describe('Testes do componente Pokedex', () => {
  test('Verifica se existe um titulo', () => {
    renderWithRouter(<App />);
    const title = screen.getByRole('heading', { name: 'Encountered pokémons' });
    expect(title).toBeInTheDocument();
  });

  test('Verifica se um proximo pokemon é mostrado ao clicar em "Próximo pokemon"', () => {
    renderWithRouter(<App />);

    const nextButton = screen.getByRole('button', { name: nextButtonName });
    const firstPokemon = pokemons[0];

    pokemons.forEach((pokemon, index) => {
      const pokemonName = screen.getByText(pokemon.name);
      const detailsLink = screen.getAllByRole('link', { name: 'More details' });
      expect(detailsLink.length).toBe(1);
      expect(pokemonName).toBeInTheDocument();
      userEvent.click(nextButton);

      if (index === pokemons.length - 1) {
        const firstPokemonName = screen.getByText(firstPokemon.name);
        expect(firstPokemonName).toBeInTheDocument();
      }
    });
  });

  test('Verifica se existe os botões de filtro sem repetição e se funcionam', () => {
    renderWithRouter(<App />);

    const firePokemonsName = ['Charmander', 'Rapidash'];

    const filtersNumber = 7;

    const allFilterButtons = screen.getAllByTestId('pokemon-type-button');
    expect(allFilterButtons.length).toBe(filtersNumber);

    pokemons.forEach((pokemon) => {
      const filterButtons = screen.getAllByRole('button', { name: pokemon.type });
      expect(filterButtons.length).toBe(1);
      expect(filterButtons[0]).toBeInTheDocument();
    });

    const fireTypeButton = screen.getByRole('button', { name: 'Fire' });
    const nextButton = screen.getByRole('button', { name: nextButtonName });
    userEvent.click(fireTypeButton);

    firePokemonsName.forEach((name, index) => {
      const pokemonName = screen.getByText(name);
      const allButton = screen.getByRole('button', { name: 'All' });
      expect(pokemonName).toBeInTheDocument();
      expect(allButton).toBeInTheDocument();
      userEvent.click(nextButton);

      if (index === firePokemonsName.length - 1) {
        const firstPokemonName = screen.getByText(firePokemonsName[0]);
        expect(firstPokemonName).toBeInTheDocument();
      }
    });
  });

  test('Verifica se existe um botão para resetar os filtros', () => {
    renderWithRouter(<App />);

    const allButton = screen.getByRole('button', { name: 'All' });
    expect(allButton).toBeInTheDocument();

    const nextButton = screen.getByRole('button', { name: nextButtonName });

    userEvent.click(allButton);
    pokemons.forEach((pokemon) => {
      const pokemonName = screen.getByText(pokemon.name);
      expect(pokemonName).toBeInTheDocument();
      userEvent.click(nextButton);
    });
  });
});
