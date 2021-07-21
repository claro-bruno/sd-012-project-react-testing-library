import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../types/renderWithRouter';

describe('Testando o componente App.js', () => {
  test('Verifica se renderiza o texto Home', () => {
    const { history } = renderWithRouter(<App />);
    const home = screen.getByText(/Home/i);
    expect(home).toBeInTheDocument();
    const url = history.location.pathname;
    expect(url).toBe('/');
  });
  test('Verifica se renderiza o texto About', () => {
    const { history } = renderWithRouter(<App />);
    const about = screen.getByText(/About/i);
    expect(about).toBeInTheDocument();
    const url = history.location.pathname;
    expect(url).toBe('/');
  });
  test('Verifica se renderiza o texto Favorite Pokémons', () => {
    const { history } = renderWithRouter(<App />);
    const favoritePokemons = screen.getByText(/Favorite Pokémons/i);
    expect(favoritePokemons).toBeInTheDocument();
    const url = history.location.pathname;
    expect(url).toBe('/');
  });
  test('Verifica URL /', () => {
    const { history } = renderWithRouter(<App />);
    history.push('about');
    const home = screen.getByText(/Home/i);
    userEvent.click(home);
    const title = screen.getByText(/Encountered pokémons/i);
    expect(title).toBeInTheDocument();
    const url = history.location.pathname;
    expect(url).toBe('/');
  });
  test('Verifica URL /about', () => {
    const { history } = renderWithRouter(<App />);
    const about = screen.getByText(/About/i);
    userEvent.click(about);
    const title = screen.getByText(/About pokédex/i);
    expect(title).toBeInTheDocument();
    const url = history.location.pathname;
    expect(url).toBe('/about');
  });
  test('Verifica URL /favorites sem adicionar favorito(s)', () => {
    const { history } = renderWithRouter(<App />);
    const favoritePokemons = screen.getByText(/Favorite Pokémons/i);
    userEvent.click(favoritePokemons);
    const title = screen.getByText(/No favorite pokemon found/i);
    expect(title).toBeInTheDocument();
    const url = history.location.pathname;
    expect(url).toBe('/favorites');
  });
  test('Verifica se renderiza URL not found', () => {
    const { history } = renderWithRouter(<App />);
    history.push('wrongURL');
    const error = screen.getByText(/Page requested not found/);
    expect(error).toBeInTheDocument();
    const url = history.location.pathname;
    expect(url).toBe('/wrongURL');
  });
});
