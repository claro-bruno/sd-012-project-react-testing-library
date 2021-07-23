import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa o componente <App.js />.', () => {
  test('testa a rota para páginas não encontradas', () => {
    const {
      history,
    } = renderWithRouter(<App />);

    history.push('/pagina/que-nao-existe/');
    const noMatch = screen.getByText(/Page requested not found/i);
    expect(noMatch).toBeInTheDocument();
  });

  test('Testa a rota da home', () => {
    const {
      history,
    } = renderWithRouter(<App />);

    fireEvent.click(screen.getByText(/Home/i));
    const { pathname } = history.location;

    expect(pathname).toBe('/');
  });

  test('Testa a rota da about', () => {
    const {
      history,
    } = renderWithRouter(<App />);

    fireEvent.click(screen.getByText(/About/i));
    const { pathname } = history.location;

    expect(pathname).toBe('/about');
  });

  test('Testa a rota da Favorite Pokemons', () => {
    const {
      history,
    } = renderWithRouter(<App />);

    fireEvent.click(screen.getByText(/Favorite pokémons/i));
    const { pathname } = history.location;

    expect(pathname).toBe('/favorites');
  });
});
