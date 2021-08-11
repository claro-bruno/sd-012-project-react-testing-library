import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import data from '../data';
import App from '../App';

describe('Verifica o componente "Pokedex.js"', () => {
  test('Verifica se contém a tag "h2" com o texto "Encountered pokémons"', () => {
    renderWithRouter(<App />);
    const h2Title = screen.getByRole('heading', { name: /Encountered pokémons/i });
    expect(h2Title).toBeInTheDocument();
  });

  test('Verifica se tem 1 pokemon por vez', () => {
    renderWithRouter(<App />);
    const verifyAmount = screen.getAllByText(/More Details/i);
    expect(verifyAmount).toHaveLength(1);
  });

  test('Verifica o próximo pokémon ao ser clicado o botão', () => {
    renderWithRouter(<App />);
    const button = screen.getByRole('button', { name: /Próximo pokémon/i });
    expect(button).toBeDefined();

    userEvent.click(button);
    const nextPokemon = screen.getByText(/Charmander/i);
    expect(nextPokemon).toBeInTheDocument();
  });

  test('Verifica se o componente possui botões', () => {
    renderWithRouter(<App />);
    const buttons = screen.getByRole('button', { name: /Fire/i });
    expect(buttons).toBeInTheDocument();
    userEvent.click(buttons);

    const typePokemons = [];
    data.forEach((pokemon) => {
      const findPokemon = typePokemons.find((pok) => pok === pokemon.type);
      if (!findPokemon) {
        typePokemons.push(pokemon.type);
      }
    });
    console.log(typePokemons);
    const typeButton = screen.getAllByTestId('pokemon-type-button');
    expect(typeButton.length).toBe(typePokemons.length);
  });

  test('Verifica se o botao "All" reseta o filtro', () => {
    renderWithRouter(<App />);
    const buttonAll = screen.getByRole('button', { name: /All/i });
    expect(buttonAll).toBeInTheDocument();

    userEvent.click(buttonAll);
    const resetPokemon = screen.getByTestId('pokemon-type');
    expect(resetPokemon).toHaveTextContent(/Electric/i);
  });
});
