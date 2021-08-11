import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Verifica App.js', () => {
  it('topo da aplicação contém um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);
    const linkList = screen.getAllByRole('link');
    const listLength = 4;

    expect(linkList).toHaveLength(listLength);
    expect(linkList[0]).toHaveTextContent('Home');
    expect(linkList[1]).toHaveTextContent('About');
    expect(linkList[2]).toHaveTextContent('Favorite Pokémons');
  });

  it('aplicação é redirecionada para a página inicial,'
  + ' na URL / ao clicar no link Home da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);
    const { pathname } = history.location;
    const homeLink = screen.getByText('Home');

    expect(homeLink).toBeInTheDocument();
    userEvent.click(homeLink);
    expect(pathname).toBe('/');
  });

  it('aplicação é redirecionada para a página de About, na URL /about,'
  + ' ao clicar no link About da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);
    const aboutLink = screen.getByText('About');

    expect(aboutLink).toBeInTheDocument();
    fireEvent.click(aboutLink);
    expect(history.location.pathname).toBe('/about');
  });

  it('aplicação é redirecionada para a página de Pokémons Favoritados, na URL /favorites,'
  + ' ao clicar no link Favorite Pokémons da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);
    const favoritesLink = screen.getByText('Favorite Pokémons');

    expect(favoritesLink).toBeInTheDocument();
    fireEvent.click(favoritesLink);
    expect(history.location.pathname).toBe('/favorites');
  });

  it('aplicação é redirecionada para a página Not Found ao entrar'
  + ' em uma URL desconhecida', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/awesomePath');

    expect(screen.getByText('Page requested not found')).toBeDefined();
  });
});
