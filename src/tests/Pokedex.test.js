import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import data from '../data';

const pokemonName = 'pokemon-name';
const filters = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];

describe('Testa o componente Pokedex', () => {
  it('Testa se a página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const h2 = screen.getByRole('heading', { name: /Encountered pokémons/i, level: 2 });
    expect(h2).toBeDefined();
  });

  it(`Teste se é exibido o próximo Pokémon da lista
  quando o botão Próximo pokémon é clicado`, () => {
    renderWithRouter(<App />);
    const btn = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(btn).toBeDefined();
    data.forEach((pokemon) => {
      expect(screen.getByTestId(pokemonName)).toHaveTextContent(pokemon.name);
      userEvent.click(btn);
    });
    expect(screen.getByTestId(pokemonName)).toHaveTextContent(data[0].name);
  });

  it(`Teste se é exibido o próximo Pokémon da lista
  quando o botão Próximo pokémon é clicado`, () => {
    renderWithRouter(<App />);
    const poke = screen.getAllByTestId(pokemonName);
    expect(poke.length).toBe(1);
  });

  it(`Deve existir um botão de filtragem para cada
  tipo de Pokémon, sem repetição`, () => {
    renderWithRouter(<App />);
    filters.forEach((type) => {
      expect(screen.getByRole('button', { name: type })).toBeDefined();
      expect(screen.getAllByTestId('pokemon-type-button').length).toBe(filters.length);
    });
  });

  it('O botão All precisa estar sempre visível', () => {
    renderWithRouter(<App />);
    filters.forEach((type) => {
      userEvent.click(screen.getByRole('button', { name: type }));
      expect(screen.getByRole('button', { name: /all/i })).toBeDefined();
    });
  });

  it(`A Pokedéx deverá mostrar os Pokémons
  normalmente (sem filtros) quando o botão All for clicado`, () => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByRole('button', { name: 'Fire' }));
    userEvent.click(screen.getByRole('button', { name: 'All' }));
    data.forEach((pokemon) => {
      expect(screen.getByTestId(pokemonName)).toHaveTextContent(pokemon.name);
      userEvent.click(screen.getByTestId('next-pokemon'));
    });
  });

  it(`Ao carregar a página, o filtro selecionado
  deverá ser All`, () => {
    renderWithRouter(<App />);
    data.forEach((pokemon) => {
      expect(screen.getByTestId(pokemonName)).toHaveTextContent(pokemon.name);
      userEvent.click(screen.getByTestId('next-pokemon'));
    });
  });
});
