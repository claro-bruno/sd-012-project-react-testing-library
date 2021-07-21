import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Teste o componente <App.js />', () => {
  it('O primeiro link deve possuir o texto Home, About, Favorite Pokémons.', () => {
    renderWithRouter(<App />);
    const linkHome = screen.getByRole('link', { name: /Home/i });
    const linkAbout = screen.getByRole('link', { name: /About/i });
    const linkFavorite = screen.getByRole('link', { name: /Favorite Pokémon/i });
    expect(linkHome).toBeInTheDocument();
    expect(linkAbout).toBeInTheDocument();
    expect(linkFavorite).toBeInTheDocument();
  });

  it('Testa o rederecionamento da aplicação Home.', () => {
    const { history } = renderWithRouter(<App />);

    const linkHome = screen.getByRole('link', { name: /Home/i });
    userEvent.click(linkHome);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('Testa o rederecionamento da aplicação About.', () => {
    const { history } = renderWithRouter(<App />);

    const linkAbout = screen.getByRole('link', { name: /About/i });
    userEvent.click(linkAbout);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('Testa o rederecionamento da aplicação Favorite Pokémons.', () => {
    const { history } = renderWithRouter(<App />);

    const linkFavorite = screen.getByRole('link', { name: /Favorite Pokémons/i });
    userEvent.click(linkFavorite);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it('Teste se a aplicação é redirecionada para a página Not Found.', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/erro');
    const pageNot = screen.getByRole('heading', { name: /Page requested not found/i });
    expect(pageNot).toBeInTheDocument();
  });
});
