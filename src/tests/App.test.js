import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa o componente App', () => {
  it('Verifica a existência dos botões "Home", "About" e "Favorite"', () => {
    renderWithRouter(<App />);
    const aboutButton = screen.getByText('About');
    const homeButton = screen.getByText('Home');
    const favoriteBitton = screen.getByText('Favorite Pokémons');

    expect(aboutButton).toBeInTheDocument();
    expect(homeButton).toBeInTheDocument();
    expect(favoriteBitton).toBeInTheDocument();
  });

  it('Verifica se o usuário é levado para página inicial ao clicar no botão Home', () => {
    const { history } = renderWithRouter(<App />);
    const homeButton = screen.getByText(/home/i);
    userEvent.click(homeButton);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('Verifica se o usuário é levado para /about ao clicar no botão About', () => {
    const { history } = renderWithRouter(<App />);
    const aboutButton = screen.getByText(/about/i);
    userEvent.click(aboutButton);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('verifica se o usuário é levado para /favorite ao clicar no botão Favorite', () => {
    const { history } = renderWithRouter(<App />);
    const favoriteButton = screen.getByText(/favorite pokémons/i);
    userEvent.click(favoriteButton);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it('testa se o usuário é redirecionados para Not Found', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/void-page');
    const pagNotFoud = screen.getByText('Page requested not found');
    expect(pagNotFoud).toBeInTheDocument();
  });
});
