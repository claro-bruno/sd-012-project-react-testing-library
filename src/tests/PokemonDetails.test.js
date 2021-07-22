import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

describe('Testa Pokemon Details', () => {
  beforeEach(() => {
    const { history } = renderWithRouter(<App />);
    const link = screen.getByText(/More Details/i);
    userEvent.click(link);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/pokemons/25');
  });
  it('todos os elementos devem estar na tela', () => {
    const pName = screen.getByText('Pikachu Details');
    const sum2 = screen.getByRole('heading', { level: 2, name: 'Summary' });
    const parag = screen.getByText(pokemons[0].summary);
    expect(pName).toBeInTheDocument();
    expect(sum2).toBeInTheDocument();
    expect(sum2.textContent).toBe('Summary');
    expect(parag).toBeInTheDocument();
  });
  it('verifica se tem os mapas da localização do pokemon', () => {
    const headingLoc = screen
      .getByRole('heading', { level: 2, name: 'Game Locations of Pikachu' });
    expect(headingLoc).toBeInTheDocument();
    const imgs = screen.getAllByAltText(/Pikachu location/i);
    imgs.forEach((e) => {
      expect(e).toBeInTheDocument();
    });
    expect(imgs[0].src).toBe(pokemons[0].foundAt[0].map);
    expect(imgs[1].src).toBe(pokemons[0].foundAt[1].map);
  });
  it('verifica se há um checkbox', () => {
    const label = screen.getByLabelText('Pokémon favoritado?');
    expect(label).toBeInTheDocument();
  });
});
