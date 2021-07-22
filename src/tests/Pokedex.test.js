import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

beforeEach(() => {
  renderWithRouter(<App />);
});

describe('Testa funcionamento do componente "pokedex.js"', () => {
  it('Testa se a pagina contem um heading h2 com texto "Encountered pokémons"', () => {
    const header = screen.getByText('Encountered pokémons');
    expect(header).toBeInTheDocument();
  });
  describe('Testa se e exibido o proximo pokemon', () => {
    it('Testa se os proximos pokemons da lista sao mostrados', () => {
      const button = screen.getByText('Próximo pokémon');
      expect(button).toBeInTheDocument();
      userEvent.click(button);
      const secondPokemon = screen.getByTestId('pokemon-name');
      expect(secondPokemon).toHaveTextContent('Charmander');
      userEvent.click(button);
      const thirdPokemon = screen.getByTestId('pokemon-name');
      expect(thirdPokemon).toHaveTextContent('Caterpie');
      userEvent.click(button);
      const fifthPokemon = screen.getByTestId('pokemon-type');
      expect(fifthPokemon).toHaveTextContent('Poison');
      userEvent.click(button);
      userEvent.click(button);
      userEvent.click(button);
      userEvent.click(button);
      userEvent.click(button);
      const sixthPokemon = screen.getByTestId('pokemon-type');
      expect(sixthPokemon).toHaveTextContent('Dragon');
      userEvent.click(button);
      const firstPokemon = screen.getByTestId('pokemon-weight');
      expect(firstPokemon).toHaveTextContent('6.0');
    });
  });
  describe('Testa se a pokedex tem botoẽs de filtro', () => {
    it('Deve existir um botao de filtragem para cada tipo', () => {
      const filterButtons = screen.getAllByTestId('pokemon-type-button');
      filterButtons.forEach((f) => expect(f).toBeInTheDocument());
    });
    it('Testa funcionalide dos filtros', () => {
      const FirePokemon = screen.getAllByTestId('pokemon-type-button')[1];
      userEvent.click(FirePokemon);
      expect(FirePokemon).toHaveTextContent('Fire');
      const firstFirePokemon = screen.getByText('Charmander');
      expect(firstFirePokemon).toBeInTheDocument();
      const button = screen.getByText('Próximo pokémon');
      userEvent.click(button);
      const secondFirePokemon = screen.getByText('Rapidash');
      expect(secondFirePokemon).toBeInTheDocument();
    });
    it('Testa se a pokedex contem botao resetar', () => {
      const buttonAll = screen.getByText('All');
      expect(buttonAll).toBeInTheDocument();
      userEvent.click(buttonAll);
      const firstPokemon = screen.getByText('Pikachu');
      expect(firstPokemon).toBeInTheDocument();
    });
  });
});
