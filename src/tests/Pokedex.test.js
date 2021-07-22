import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';
import App from '../App';

describe('Testa funcionamento da pokedex', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  it('Verifica se há um h2 com o texto "Encountered pokémons"', () => {
    const pokedexTitle = screen.getByRole('heading', { name: 'Encountered pokémons' });
    expect(pokedexTitle).toBeDefined();
  });

  it(`Testa se é exibido o próximo Pokémon da lista
    quando o botão Próximo pokémon é clicado`, () => {
    const nextButton = screen.getByRole('button', { name: 'Próximo pokémon' });
    pokemons.forEach((pokemon) => {
      const nameInTheDocument = screen.getByText(pokemon.name);
      expect(nameInTheDocument).toBeDefined();
      userEvent.click(nextButton);
    });
    const nextPokemon = screen.getByText(pokemons[0].name);
    expect(nextPokemon).toBeDefined();
  });

  it('Testa se renderiza apenas um pokemon por vez', () => {
    const checkTheOnly = screen.getAllByTestId('pokemon-name');
    expect(checkTheOnly).toHaveLength(1);
  });

  it('Testa se os botões de filtro por tipo funcionam corretamente', () => {
    const nextButton = screen.getByRole('button', { name: 'Próximo pokémon' });
    const typeButtons = screen.getAllByTestId('pokemon-type-button');
    typeButtons.forEach((button) => {
      const typeButton = screen.getByRole('button', { name: `${button.textContent}` });
      userEvent.click(typeButton);
      const pokemonType = screen.getByTestId('pokemon-type');
      expect(pokemonType).toHaveTextContent(`${button.textContent}`);
      const allButton = screen.getByRole('button', { name: 'All' });
      expect(allButton).toBeDefined();
      userEvent.click(nextButton);
    });
  });

  it('Testa se a Pokédex contém um botão para resetar o filtro', () => {
    const nextButton = screen.getByTestId('next-pokemon');
    const allButton = screen.getByRole('button', { name: 'All' });
    userEvent.click(allButton);
    pokemons.forEach(({ name }) => {
      const nameInTheDocument = screen.getByText(name);
      expect(nameInTheDocument).toBeDefined();
      userEvent.click(nextButton);
    });
  });
});
