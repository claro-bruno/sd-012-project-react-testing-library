import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Verifica os links presentes no componente App', () => {
  test('Verifica presença e funcionamento do link "Home"', () => {
    const { history } = renderWithRouter(<App />);
    const homeLink = screen.getByText(/home/i);
    expect(homeLink).toBeInTheDocument();
    fireEvent.click(homeLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
  test('Verifica presença e funcionamento do link "Favorite Pokémons"', () => {
    const { history } = renderWithRouter(<App />);
    const favoriteLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(favoriteLink).toBeInTheDocument();
    fireEvent.click(favoriteLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });
  test('Verifica presença e funcionamento do link "About"', () => {
    const { history } = renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', { name: 'About' });
    expect(aboutLink).toBeInTheDocument();
    fireEvent.click(aboutLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
    expect(screen.getByText(/simulates/i)).toBeInTheDocument();
  });
  test('Verifica o que é rederizado se a aplicação entrar em URL desconhecido', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pagina/que-nao-existe/');
    const notFound = screen.getByText(/not found/i);
    expect(notFound).toBeInTheDocument();
  });
});
