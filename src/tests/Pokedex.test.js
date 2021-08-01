import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import pokemons from '../data';
import App from '../App';
import renderWithRouter from './Helper/RendeWithRouter';

describe('Testa componente Pokedex', () => {
  beforeEach(() => renderWithRouter(<App />));

  test('Verifica um "h2" é renderizado com o texto correto', () => {
    const textH2 = screen.getByRole('heading', { name: 'Encountered pokémons',
      level: 2 });
    expect(textH2).toBeInTheDocument();
  });
  test('Verifica todos os botões', () => {
    const nextBtn = screen.getByRole('button', { name: 'Próximo pokémon' });
    userEvent.click(nextBtn);
    expect(nextBtn).toBeInTheDocument();
  });
  test('Verifica se renderiza os botões de todos os pokemons', () => {
    pokemons.forEach((pokemon) => {
      const butonns = screen.queryByRole('button', { name: pokemon.type });
      userEvent.click(butonns);
    });
  });
  test('Verifica se funciona o botão "All" ', () => {
    const btnAll = screen.getByTestId('pokemon-type-button');
    expect(btnAll).toBeInTheDocument();

    userEvent.click(btnAll);
    const pikachu = screen.getByText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();

    const nextBtn = screen.getByRole('button', { name: 'Próximo pokémon' });
    userEvent.click(nextBtn);
    const charmander = screen.getByText(/charmander/i);
    expect(charmander).toBeInTheDocument();
  });
});
