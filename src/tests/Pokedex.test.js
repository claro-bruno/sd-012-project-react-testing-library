import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import data from '../data';

describe('Testa o componente Pokedex', () => {
  test('Testa se página contém um heading h2 com o texto Encountered pokémons', () => {
    const { history } = renderWithRouter(<App />);
    expect(history.location.pathname).toBe('/');
    const textH2 = screen.getByRole('heading', { level: 2 });
    expect(textH2.textContent).toBe('Encountered pokémons');
  });

  test('Testa se é exibido o próximo Pokémon quando o botão é clicado.', () => {
    renderWithRouter(<App />);
    const button = screen.getByRole('button', { name: 'Próximo pokémon' });
    expect(button).toBeInTheDocument();
    data.forEach((e) => {
      const pokemonNames = screen.getByTestId('pokemon-name');
      expect(pokemonNames.textContent).toBe(e.name);
      userEvent.click(button);
    });
  });

  test('Teste se é mostrado apenas um Pokémon por vez.', () => {
    renderWithRouter(<App />);
    const pokemonNames = screen.getAllByTestId('pokemon-name');
    expect(pokemonNames.length).toBe(1);
    expect(pokemonNames[0]).toBeInTheDocument();
  });

  test('Teste se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    const filt = [...new Set(data.reduce((types, { type }) => [...types, type], []))];
    filt.forEach((e, index) => {
      const filterButton = screen.getAllByTestId('pokemon-type-button')[index];
      expect(filterButton.textContent).toBe(e);
      userEvent.click(filterButton);
      const button = screen.getByRole('button', { name: 'Próximo pokémon' });
      const pokemonTypes = screen.getByTestId('pokemon-type');
      userEvent.click(button);
      expect(pokemonTypes.textContent).toBe(e);
      expect(pokemonTypes).toBeInTheDocument();
    });
    const allButton = screen.getByRole('button', { name: 'All' });
    userEvent.click(allButton);
    const pokemonNames = screen.getByTestId('pokemon-type');
    expect(pokemonNames.textContent).toBe('Electric');
    expect(pokemonNames).toBeInTheDocument();
  });
});
