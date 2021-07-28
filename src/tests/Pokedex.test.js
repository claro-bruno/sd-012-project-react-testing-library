import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testando o componente Pokedex.js', () => {
  test('Testando se página contém heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const pokedexHeading = screen.getByRole('heading', { level: 2 });
    expect(pokedexHeading).toHaveTextContent('Encountered pokémons');
  });

  test('Testando se é exibido o próximo Pokémon da lista quando botão é clicado', () => {
    renderWithRouter(<App />);
    const firstPokemon = screen.getByText('Pikachu');
    expect(firstPokemon).toBeInTheDocument();
    const button = screen.getByRole('button', { name: 'Próximo pokémon' });
    userEvent.click(button);
    const nextPokemon = screen.getByText('Charmander');
    expect(nextPokemon).toBeInTheDocument();
  });

  test('Testando se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);
    const onePokemon = screen.getAllByTestId('pokemon-name');
    expect(onePokemon.length).toBe(1);
  });

  test('Testando se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    const filterButton = screen.getAllByTestId('pokemon-type-button');
    expect(filterButton).toBeDefined();
    const clickButton = screen.getByRole('button', { name: /Electric/i });
    userEvent.click(clickButton);
    expect(clickButton).toBeDefined();
  });

  test('Testando se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const allTextButton = screen.getByRole('button', { name: 'All' });
    userEvent.click(allTextButton);
    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toHaveTextContent('Pikachu');
  });
});
