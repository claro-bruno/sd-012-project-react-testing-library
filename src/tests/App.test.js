import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente App', () => {
  it('Encontra os links no topo da página', () => {
    renderWithRouter(<App />);
    const linkHome = screen.getByRole('link', { name: 'Home' });
    const linkAbout = screen.getByRole('link', { name: 'About' });
    const linkFavorite = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(linkHome).toBeInTheDocument();
    expect(linkAbout).toBeInTheDocument();
    expect(linkFavorite).toBeInTheDocument();
  });
  it('Redireciona para "/" ao clicar em Home', () => {
    const { history } = renderWithRouter(<App />);
    const linkHome = screen.getByRole('link', { name: 'Home' });
    userEvent.click(linkHome);
    const url = history.location.pathname;
    expect(url).toBe('/');
  });
  it('Redireciona para "/about" ao clicar em About', () => {
    const { history } = renderWithRouter(<App />);
    const linkAbout = screen.getByRole('link', { name: 'About' });
    userEvent.click(linkAbout);
    const url = history.location.pathname;
    expect(url).toBe('/about');
  });
  it('Redireciona para "/favorite" ao clicar em Favorite Pokemons', () => {
    const { history } = renderWithRouter(<App />);
    const linkFavorite = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(linkFavorite);
    const url = history.location.pathname;
    expect(url).toBe('/favorites');
  });
  it('Redireciona para NotFound ao passar URL inválida', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pikachu-e-o-melhor');
    expect(screen.getByText(/Page requested not found/i)).toBeInTheDocument();
  });
});
