import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

describe('Requisito 1 - Teste o componente <App.js />', () => {
  it('Verifica se no topo da aplicação existe um conjunto de links de navegação', () => {
    renderWithRouter(<App />);
    expect(screen.getByText('Home')).toBeDefined();
    expect(screen.getByText('About')).toBeDefined();
    expect(screen.getByText('Favorite Pokémons')).toBeDefined();
  });

  it('Testa se é redirecionado para a página inicial ao clicar no link "Home"', () => {
    const { history } = renderWithRouter(<App />);
    const homeLink = screen.getByText('Home');
    userEvent.click(homeLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('Testa se é redirecionado para a página "About" ao clicar no link "About"', () => {
    const { history } = renderWithRouter(<App />);
    const aboutLink = screen.getByText('About');
    userEvent.click(aboutLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it(`Testa se é redirecionado para a página
  Pokémons Favoritados ao clicar no link "Favorite Pokémons"`, () => {
    const { history } = renderWithRouter(<App />);
    const favoritesLink = screen.getByText('Favorite Pokémons');
    userEvent.click(favoritesLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it(`Testa se é redirecionado para a página "NotFound"
  ao entrar em uma URL desconhecida`, () => {
    const { history } = renderWithRouter(<App />);
    history.push('/url/desconhecida');
    expect(screen.getByText('Page requested not found')).toBeInTheDocument();
  });
});
