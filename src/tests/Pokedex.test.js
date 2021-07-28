import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import data from '../data';

describe('test pokedex', () => {
  it('H2', () => {
    renderWithRouter(<App />);
    const H2 = screen.getByText(/Encountered pokémons/i);
    expect(H2.tagName).toBe('H2');
  });

  it('next pokemon', () => {
    renderWithRouter(<App />);
    const pokemon1 = screen.getByTestId('pokemon-name');
    const btt = screen.getByTestId('next-pokemon');
    data.forEach((item) => {
      const pokemon = screen.getByText(item.name);
      expect(pokemon).toBeDefined();
      userEvent.click(btt);
    });
    expect(pokemon1).toBeDefined();
  });

  it('one pokemon', () => {
    renderWithRouter(<App />);
    const pokemon = screen.getAllByTestId('pokemon-name');
    expect(pokemon).toHaveLength(1);
  });

  it('test button filter', () => {
    renderWithRouter(<App />);
    const bttnAll = screen.getByRole('button', { name: 'All' });
    data.forEach((item) => {
      const bttn = screen.getByRole('button', { name: item.type });
      expect(bttn).toBeDefined();
      expect(bttnAll).toBeDefined();
    });
  });

  it('Testa se reseta o filtro', () => {
    renderWithRouter(<App />);
    const fireBtt = screen.getByRole('button', { name: 'Fire' });
    const nextBtt = screen.getByRole('button', { name: /Próximo Pokémon/i });
    const allBtt = screen.getByRole('button', { name: 'All' });
    userEvent.click(fireBtt);
    expect(screen.getByText('Charmander')).toBeDefined();
    userEvent.click(nextBtt);
    expect(screen.getByText('Rapidash')).toBeDefined();
    userEvent.click(allBtt);
    const noFilter = screen.getByText('Pikachu');
    expect(noFilter).toBeDefined();
  });
});
