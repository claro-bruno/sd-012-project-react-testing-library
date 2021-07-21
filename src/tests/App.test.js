import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

describe('Testa o componente App', () => {
  it('Testa se o primeiro link possui o texto "Home"', () => {
    const { history } = renderWithRouter(<App />);
    const linkHome = screen.getByRole('link', { name: /Home/i });
    userEvent.click(linkHome);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('Testa se o segundo link possui o texto "About"', () => {
    const { history } = renderWithRouter(<App />);
    const linkAbout = screen.getByRole('link', { name: /About/i });
    userEvent.click(linkAbout);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('Testa se o terceiro link possui o texto "Favorite Pokémons"', () => {
    const { history } = renderWithRouter(<App />);
    const linkFavoritePokemons = screen.getByRole('link', { name: /Favorite Pokémons/i });
    userEvent.click(linkFavoritePokemons);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it('Testa se ,a página não existir, direciona à página NotFound', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pagina-nao-existente');
    const NotFound = screen.getByText(/Page requested not found/i);
    expect(NotFound).toBeInTheDocument();
  });
});
