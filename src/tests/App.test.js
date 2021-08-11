import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testes do App.js', () => {
  it('Checa um conjunto de links de navegação', () => {
    renderWithRouter(<App />);

    const home = screen.getByText('Home');
    const about = screen.getByText('About');
    const fPokemons = screen.getByText('Favorite Pokémons');

    expect(home).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(fPokemons).toBeInTheDocument();
  });

  it('Checa o red. do "Home"', () => {
    const { history } = renderWithRouter(<App />);
    const home = screen.getByText('Home');

    fireEvent.click(home);

    const { location: { pathname } } = history;

    expect(pathname).toBe('/');
  });

  it('Ao clicar em "About", red. a app para "/about"', () => {
    const { history } = renderWithRouter(<App />);
    const about = screen.getByRole('link', { name: 'About' });

    fireEvent.click(about);

    const { location: { pathname } } = history;

    expect(pathname).toBe('/about');
  });

  it('Ao clicar em "Favorite Pokémons", red. a app para "/favorites"', () => {
    const { history } = renderWithRouter(<App />);
    const fpoke = screen.getByRole('link', { name: 'Favorite Pokémons' });

    fireEvent.click(fpoke);

    const { location: { pathname } } = history;

    expect(pathname).toBe('/favorites');
  });

  it('Ao entrar em uma URL desconhecida, red. a app para "Not Found"', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/test');

    const notFound = screen.getByText(/page requested not found/i);

    expect(notFound).toBeInTheDocument();
  });
});
