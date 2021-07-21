import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa o componente App.js', () => {
  it('Testa se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);
    const homeLink = screen.getByText('Home');
    const aboutLink = screen.getByText('About');
    const favoriteLink = screen.getByText('Favorite Pokémons');
    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(favoriteLink).toBeInTheDocument();
  });
  it('Testa se Home redireciona corretamente', () => {
    const { history } = renderWithRouter(<App />);
    const homeLink = screen.getByText('Home');
    userEvent.click(homeLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
  it('Testa se About redireciona corretamente', () => {
    const { history } = renderWithRouter(<App />);
    const aboutLink = screen.getByText('About');
    userEvent.click(aboutLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });
  it('Testa se Pokémons Favoritos redireciona corretamente', () => {
    const { history } = renderWithRouter(<App />);
    const favoriteLink = screen.getByText('Favorite Pokémons');
    userEvent.click(favoriteLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });
});
