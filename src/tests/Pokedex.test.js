import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Teste o componente Pokedex.js', () => {
  const btnNameNext = 'Próximo pokémon';
  test('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const heading = screen.getByRole('heading', { name: 'Encountered pokémons' });
    expect(heading).toBeInTheDocument();
  });
  test('Teste se é exibido o próximo Pokémon quando botão Próximo é clicado', () => {
    renderWithRouter(<App />);
    const btn = screen.getByRole('button', { name: btnNameNext });
    expect(btn).toBeInTheDocument();
    userEvent.click(btn);
    const next = screen.getByText('Charmander');
    expect(next).toBeInTheDocument();
  });
  test('Teste se é exibido um Pokemon, ao clicar sucessivamente no botão;', () => {
    renderWithRouter(<App />);
    const btn = screen.getByRole('button', { name: btnNameNext });
    pokemons.forEach(() => {
      const one = screen.getAllByTestId('pokemon-name');
      expect(one).toHaveLength(1);
      userEvent.click(btn);
    });
  });
  test('Teste se é exibido o primeiro Pokemon, depois último Pokémon da lista;', () => {
    renderWithRouter(<App />);
    const btn = screen.getByRole('button', { name: btnNameNext });
    pokemons.forEach(() => {
      userEvent.click(btn);
    });
    const first = screen.getByText('Pikachu');
    expect(first).toBeInTheDocument();
  });
  test('Teste se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    const types = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    types.forEach((type) => {
      const btn = screen.getByRole('button', { name: type });
      expect(btn).toBeInTheDocument();
      userEvent.click(btn);
      const typeId = screen.getByTestId('pokemon-type').innerHTML;
      expect(typeId).toBe(type);
    });
  });
  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const typeBtn = screen.getAllByTestId('pokemon-type-button');
    expect(typeBtn).toBeDefined();
    const btn = screen.getByRole('button', { name: 'All' });
    expect(btn).toBeInTheDocument();
    userEvent.click(btn);
  });
});
