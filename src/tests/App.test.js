import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('App test', () => {
  test('Testa links de navegação', () => {
    const { history } = renderWithRouter(<App />);
    const home = screen.getByRole('link', { name: 'Home' });
    const about = screen.getByRole('link', { name: 'About' });
    const favoritePokemons = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(home).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(favoritePokemons).toBeInTheDocument();
    expect(history.location.pathname).toBe('/');
  });

  test('Testa o evento de click dos links e suas respectivas rotas', () => {
    const { history } = renderWithRouter(<App />);
    const home = screen.getByText('Home');
    const about = screen.getByText('About');
    const favoritePokemons = screen.getByText('Favorite Pokémons');

    fireEvent.click(home);
    expect(history.location.pathname).toBe('/');

    fireEvent.click(about);
    expect(history.location.pathname).toBe('/about');

    fireEvent.click(favoritePokemons);
    expect(history.location.pathname).toBe('/favorites');
  });
});
