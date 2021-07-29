import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import data from '../data';

const testId = 'pokemon-name';
const typePokemons = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];

describe('Testando o componente <Pokedex />', () => {
  it('Teste se a aplicação contém um "heading".', () => {
    renderWithRouter(<App />);
    const h2 = screen.getByRole('heading', { name: /Encountered pokémons/i, level: 2 });
    expect(h2).toBeInTheDocument();
  });
  it('Os próximos Pokémons da lista devem ser mostrados', () => {
    renderWithRouter(<App />);
    const button = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(button).toBeInTheDocument();
    data.forEach((element) => {
      expect(screen.getByTestId(testId)).toHaveTextContent(element.name);
      userEvent.click(button);
    });
    expect(screen.getByTestId(testId)).toHaveTextContent(data[0].name);
  });
  it('Próximo pokémon', () => {
    renderWithRouter(<App />);
    const pokemon = screen.getAllByTestId(testId);
    expect(pokemon.length).toBe(1);
  });
  it('Filtra por tipo', () => {
    renderWithRouter(<App />);
    typePokemons.forEach((type) => {
      expect(screen.getByRole('button', { name: type })).toBeInTheDocument();
      expect(screen.getAllByTestId('pokemon-type-button').length)
        .toBe(typePokemons.length);
    });
  });
  it('Botão All', () => {
    renderWithRouter(<App />);
    typePokemons.forEach((type) => {
      userEvent.click(screen.getByRole('button', { name: type }));
      expect(screen.getByRole('button', { name: /all/i })).toBeInTheDocument();
    });
  });
  it('Reseta filtro', () => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByRole('button', { name: 'Fire' }));
    userEvent.click(screen.getByRole('button', { name: 'All' }));
    data.forEach((event) => {
      expect(screen.getByTestId(testId)).toHaveTextContent(event.name);
      userEvent.click(screen.getByTestId('next-pokemon'));
    });
  });
  it('Filtro deve ser All', () => {
    renderWithRouter(<App />);
    data.forEach((event) => {
      expect(screen.getByTestId(testId)).toHaveTextContent(event.name);
      userEvent.click(screen.getByTestId('next-pokemon'));
    });
  });
});
