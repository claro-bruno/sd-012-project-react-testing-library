import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('5. Teste o componente <Pokedex.js />', () => {
  test('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const pokedexH2 = screen.getByRole('heading', { level: 2 });
    expect(pokedexH2).toHaveTextContent('Encountered pokémons');
  });

  test('É exibido o próximo da lista quando o botão Próximo pokémon é clicado.', () => {
    renderWithRouter(<App />);
    const buttonNext = screen.getByTestId('next-pokemon');
    expect(buttonNext).toHaveTextContent('Próximo pokémon');
    userEvent.click(buttonNext);
  });

  test('Teste se é mostrado apenas um Pokémon por vez.', () => {
    renderWithRouter(<App />);
    const OneForTime = screen.getAllByTestId('pokemon-name');
    expect(OneForTime.length).toBe(1);
  });

  test('Teste se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    const filter = screen.getAllByTestId('pokemon-type-button');
    expect(filter).toBeDefined();
    const eletricButton = screen.getByRole('button', { name: /Electric/i });
    userEvent.click(eletricButton);
    expect(eletricButton).toBeDefined();
  });

  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const buttonAll = screen.getByRole('button', { name: 'All' });
    userEvent.click(buttonAll);
    const fistPokemon = screen.getByTestId('pokemon-name');
    expect(fistPokemon).toHaveTextContent('Pikachu');
  });
});
