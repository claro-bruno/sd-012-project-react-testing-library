import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('testa app.js', () => {
  it('testa existencia das navs', () => {
    renderWithRouter(<App />);
    const home = screen.getByText('Home');
    const about = screen.getByText('About');
    const favoritePokemons = screen.getByText('Favorite Pokémons');
    expect(home).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(favoritePokemons).toBeInTheDocument();
  });
  it('testa click da home', () => {
    const { history: { location: { pathname } } } = renderWithRouter(<App />);
    const home = screen.getByText('Home');
    userEvent.click(home);
    expect(pathname).toBe('/');
  });
  it('testa click do About', () => {
    const { history } = renderWithRouter(<App />);
    const about = screen.getByText('About');
    userEvent.click(about);
    const path = history.location.pathname;
    expect(path).toBe('/about');
  });
  it('testa click do FavoritePokemon', () => {
    const { history } = renderWithRouter(<App />);
    const favoritePokemons = screen.getByText('Favorite Pokémons');
    userEvent.click(favoritePokemons);
    const path = history.location.pathname;
    expect(path).toBe('/favorites');
  });
  it('testa pag not found', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pagina/que-nao-existe/');
    const
      NF = screen.getByAltText('Pikachu crying because the page requested was not found');
    expect(NF).toBeInTheDocument();
  });
});
