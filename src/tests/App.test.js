// Projeto realizado com a ajuda e revisão de Diogo Sant'anna e Bruno Augusto.

import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testa o componente App', () => {
  it('Testa se o 1 link tem texto "Home"', () => {
    renderWithRouter(<App />);
    const linkHome = screen.getByRole('link', { name: /home/i });
    expect(linkHome).toBeInTheDocument();
  });

  it('Testa se o 2 link tem texto "About"',
    () => {
      renderWithRouter(<App />);
      const linkAbout = screen.getByRole('link', { name: /about/i });
      expect(linkAbout).toBeInTheDocument();
    });

  it('Testa se o 3 link tem texto "Favorite Pokémons"',
    () => {
      renderWithRouter(<App />);
      const linkAbout = screen.getByRole('link', { name: /favorite pokémons/i });
      expect(linkAbout).toBeInTheDocument();
    });

  it('Testa se o link "Home" e redireciona para "/"', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByText(/home/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('Testa se o link "About" redireciona para "/about"', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByText(/about/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('Testa se o link "Favorite Pokémons" redireciona para "/favorites"', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByText(/favorite pokémons/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it('Testa se é redirecionado para a página Not Found se for URL inexistente', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/qualquer-coisa');
    expect(screen.getByText('Page requested not found')).toBeDefined();
  });
});
