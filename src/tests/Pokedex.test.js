import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Teste o componente Pokedex.js', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  test('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    const headingH2 = screen.getByText('Encountered pokémons');
    expect(headingH2).toBeInTheDocument();
    expect(headingH2.tagName).toBe('H2');
  });
  test('Exibir o próximo Pokémon da lista', () => {
    const button = screen.getByText('Próximo pokémon');
    expect(button).toBeInTheDocument();
    userEvent.click(button);
    const proxPokemon = screen.getByTestId('pokemon-name');
    expect(proxPokemon).toBeInTheDocument();
  });

  test('Teste se é mostrado apenas um Pokémon por vez', () => {
    const btnAll = screen.getByText('All');
    expect(btnAll).toBeInTheDocument();
    userEvent.click(btnAll);
    const pokedex = screen.getByText('Pikachu');
    expect(pokedex).toBeInTheDocument();
  });

  test('Teste se a Pokédex tem os botões de filtro', () => {
    const types = 7;
    const btn = screen.getAllByTestId('pokemon-type-button');
    expect(btn.length).toBe(types);
    const fireBtn = screen.getAllByTestId('pokemon-type-button')[1];
    expect(fireBtn).toBeInTheDocument();
    expect(fireBtn).toHaveTextContent('Fire');
    userEvent.click(fireBtn);
    const primeiro = screen.getByText('Charmander');
    expect(primeiro).toBeInTheDocument();
  });
});
