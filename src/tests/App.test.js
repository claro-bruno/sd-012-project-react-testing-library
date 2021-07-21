import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('1. Teste o componente <App.js />', () => {
  it('O primeiro link deve possuir o texto Home.', () => {
    renderWithRouter(<App />);
    const linkToHome = screen.getByRole('link', { name: /Home/i });
    expect(linkToHome).toBeInTheDocument();
  });
  it('O primeiro link deve possuir o texto About.', () => {
    renderWithRouter(<App />);
    const linkToAbout = screen.getByRole('link', { name: /About/i });
    expect(linkToAbout).toBeInTheDocument();
  });
  it('O primeiro link deve possuir o texto Favorite Pokémons.', () => {
    renderWithRouter(<App />);
    const linkToFavorite = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(linkToFavorite).toBeInTheDocument();
  });
  it('Testa redirecionamento para / ao clicar no link Home.', () => {
    const { history } = renderWithRouter(<App />);
    const linkToHome = screen.getByRole('link', { name: /Home/i });
    fireEvent.click(linkToHome);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
  it('Testa redirecionamento para /about ao clicar no link Home.', () => {
    const { history } = renderWithRouter(<App />);
    const linkToAbout = screen.getByRole('link', { name: /About/i });
    fireEvent.click(linkToAbout);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });
  it('Testa redirecionamento para /favorites ao clicar no link Home.', () => {
    const { history } = renderWithRouter(<App />);
    const linkToFavorite = screen.getByRole('link', { name: /Favorite Pokémons/i });
    fireEvent.click(linkToFavorite);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });
  it('Testa redirecionamento para Not-Found ao entrar em URL indefinida.', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/404');
    expect(screen.getByText('Page requested not found')).toBeInTheDocument();
  });
});
