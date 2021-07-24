import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testes App.js', () => {
  it('Testa rota Home', () => {
    const { history } = renderWithRouter(<App />);

    const home = screen.getByRole('link', { name: /Home/i });
    expect(home).toBeInTheDocument();

    userEvent.click(home);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('Testa rota About', () => {
    const { history } = renderWithRouter(<App />);

    const about = screen.getByRole('link', { name: /About/i });
    expect(about).toBeInTheDocument();

    userEvent.click(about);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('Testa rota Favorite Pokémons', () => {
    const { history } = renderWithRouter(<App />);

    const favoritePokemon = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(favoritePokemon).toBeInTheDocument();

    userEvent.click(favoritePokemon);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it('Testa rota Not Found', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/erro');
    const notFound = screen.getByRole('heading', { name: /Page requested not found/i });
    expect(notFound).toBeInTheDocument();
  });
});
