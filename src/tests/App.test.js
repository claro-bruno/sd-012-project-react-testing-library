import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

const { screen } = require('@testing-library/react');

describe('Testa o componente App.js', () => {
  it('Testa o link Home.', () => {
    const { history } = renderWithRouter(<App />);
    const home = screen.getByRole('link', { name: /home/i });
    expect(home).toBeInTheDocument();
    userEvent.click(home);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
  it('Testa o link About.', () => {
    const { history } = renderWithRouter(<App />);
    const about = screen.getByRole('link', { name: /about/i });
    expect(about).toBeInTheDocument();
    userEvent.click(about);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });
  it('Testa o link Favorite Pokémons.', () => {
    const { history } = renderWithRouter(<App />);
    const favoritePokémons = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(favoritePokémons).toBeInTheDocument();
    userEvent.click(favoritePokémons);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });
  it('Testa página Not Found ao entrar em uma URL desconhecida', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pagina-aleatoria');
    expect(screen.getByText('Page requested not found')).toBeInTheDocument();
  });
});
