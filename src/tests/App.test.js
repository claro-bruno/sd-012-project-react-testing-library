import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Teste do componente App.js', () => {
  test('Teste conjunto de links', () => {
    renderWithRouter(<App />);
    const home = screen.getByRole('link', { name: /home/i });
    const about = screen.getByRole('link', { name: /about/i });
    const favPokemons = screen.getByRole('link', { name: /favorite pokémons/i });

    expect(home).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(favPokemons).toBeInTheDocument();
  });

  test('Teste redirecionamento para Home', () => {
    const { history } = renderWithRouter(<App />);
    const home = screen.getByRole('link', { name: /home/i });
    fireEvent.click(home);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('Teste redirecionamento para About', () => {
    const { history } = renderWithRouter(<App />);
    const about = screen.getByRole('link', { name: /about/i });
    fireEvent.click(about);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  test('Teste redirecionamento para Favorites', () => {
    const { history } = renderWithRouter(<App />);
    const favPokemons = screen.getByRole('link', { name: /favorite pokémons/i });
    fireEvent.click(favPokemons);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  test('Teste redirecionamento para Not Found', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/not-found');
    const noMatch = screen.getByText(/Page requested not found/i);
    expect(noMatch).toBeInTheDocument();
  });
});
