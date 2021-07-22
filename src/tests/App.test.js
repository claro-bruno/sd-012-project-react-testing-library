import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helper/renderWithRouter';

describe('1 - Testando o componente <App />', () => {
  it('Teste se a aplicação contém um link "Home".', () => {
    renderWithRouter(<App />);
    const linkToHome = screen.getByText('Home');
    expect(linkToHome).toBeInTheDocument();
    userEvent.click(linkToHome);
  });
  it('Teste se a aplicação contém um link "About".', () => {
    renderWithRouter(<App />);
    const linkToAbout = screen.getByText('About');
    expect(linkToAbout).toBeInTheDocument();
  });
  it('Teste se a aplicação contém um link "Favorite Pokémons".', () => {
    renderWithRouter(<App />);
    const linkToFavorites = screen.getByText('Favorite Pokémons');
    expect(linkToFavorites).toBeInTheDocument();
  });
  it('Testa se a aplicação redireciona para "Home".', () => {
    const { history } = renderWithRouter(<App />);
    const linkToAbout = screen.getByText('Home');
    expect(linkToAbout).toBeInTheDocument();
    userEvent.click(linkToAbout);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
  it('Testa se a aplicação redireciona para "About".', () => {
    const { history } = renderWithRouter(<App />);
    const linkToAbout = screen.getByText('About');
    expect(linkToAbout).toBeInTheDocument();
    userEvent.click(linkToAbout);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });
  it('Testa se a aplicação redireciona para "Pokemons Favoritados".', () => {
    const { history } = renderWithRouter(<App />);
    const linkToAbout = screen.getByText('Favorite Pokémons');
    expect(linkToAbout).toBeInTheDocument();
    userEvent.click(linkToAbout);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });
  it('Testa Not Found', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/notfound');
    const { pathname } = history.location;
    expect(pathname).toBe('/notfound');
  });
});
