import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa o component App.js', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  test('Testa se o primeiro link possui o texto Home', () => {
    const homeLink = screen.getByRole('link', { name: 'Home' });
    expect(homeLink).toBeInTheDocument();
  });

  test('Testa se o segundo link possui o texto About', () => {
    const homeLink = screen.getByRole('link', { name: 'About' });
    expect(homeLink).toBeInTheDocument();
  });

  test('Testa se o terceiro link possui o texto Favorite Pokémons', () => {
    const homeLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(homeLink).toBeInTheDocument();
  });
});

describe('Testa se a aplicação é redirecionada ao clicar em algum link', () => {
  test('Para a pagina inicial', () => {
    const { history } = renderWithRouter(<App />);
    fireEvent.click(screen.getByText('Home'));
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('Para a pagina sobre', () => {
    const { history } = renderWithRouter(<App />);
    fireEvent.click(screen.getByText('About'));
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  test('Para a pagina pokemons favoritados', () => {
    const { history } = renderWithRouter(<App />);
    fireEvent.click(screen.getByText('Favorite Pokémons'));
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  test('Para a pagina not found', () => {
    const { history } = renderWithRouter(<App />);
    history.push('pagina-desconhecida');
    const noMatch = screen.getByText('Page requested not found');
    expect(noMatch).toBeInTheDocument();
  });
});
