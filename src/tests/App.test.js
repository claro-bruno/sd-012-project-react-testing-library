import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('1 - Testa o componente <App.js />', () => {
  it('Verifica se o topo da aplicação contém um conjunto fixo de links de'
      + 'navegação', () => {
    renderWithRouter(<App />);
    const linkToHome = screen.getByRole('link', { name: /Home/i });
    expect(linkToHome).toBeInTheDocument();
    const linkToAbout = screen.getByRole('link', { name: /About/i });
    expect(linkToAbout).toBeInTheDocument();
    const linkToFavorites = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(linkToFavorites).toBeInTheDocument();
  });

  it('Verifica se a aplicação é redirecionada para a "Página Inicial", na URL "/" ao'
      + 'clicar no link "Home" da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);
    const linkToHome = screen.getByRole('link', { name: /Home/i });
    userEvent.click(linkToHome);
    const titleHome = screen.getByRole(
      'heading',
      { name: /Encountered pokémons/i, level: 2 },
    );
    expect(titleHome).toBeInTheDocument();
    const urlHome = history.location.pathname;
    expect(urlHome).toBe('/');
  });

  it('Verifica se a aplicação é redirecionada para a página "About", na URL "/about" ao'
      + 'clicar no link "About" da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);
    const linkToAbout = screen.getByRole('link', { name: /About/i });
    userEvent.click(linkToAbout);
    const titleAbout = screen.getByRole('heading', { name: /About Pokédex/i, level: 2 });
    expect(titleAbout).toBeInTheDocument();
    const urlAbout = history.location.pathname;
    expect(urlAbout).toBe('/about');
  });

  it('Verifica se a aplicação é redirecionada para a página de "Pokémons Favoritados",'
      + ' na URL "/favorites" ao clicar no link "About" da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);
    const linkToFavorites = screen.getByRole('link', { name: /Favorite Pokémons/i });
    userEvent.click(linkToFavorites);
    const titleFavorites = screen.getByRole(
      'heading',
      { name: /Favorite pokémons/i, level: 2 },
    );
    expect(titleFavorites).toBeInTheDocument();
    const urlFavorites = history.location.pathname;
    expect(urlFavorites).toBe('/favorites');
  });

  it('Verifica se a aplicação é redirecionada para a página "Not Found" ao entrar em uma'
      + ' URL desconhecida', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/no-exist');
    const notFound = screen.getByRole(
      'heading',
      { name: /Page requested not found/i, level: 2 },
    );
    const emoji = screen.getByRole('img', { name: 'Crying emoji' });
    expect(emoji).toBeInTheDocument();
    expect(notFound).toBeInTheDocument();
  });
});
