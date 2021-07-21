import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testa App', () => {
  test('Testa links', () => {
    const { history } = renderWithRouter(<App />);
    const home = screen.getByText('Home');
    const about = screen.getByText('About');
    const favoritePokemons = screen.getByText('Favorite Pokémons');
    expect(home).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(favoritePokemons).toBeInTheDocument();
    fireEvent.click(about);
    expect(history.location.pathname).toBe('/about');
    fireEvent.click(favoritePokemons);
    expect(history.location.pathname).toBe('/favorites');
    fireEvent.click(home);
    expect(history.location.pathname).toBe('/');
  });
});
