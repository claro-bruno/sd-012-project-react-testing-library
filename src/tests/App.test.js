import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Testa página Home', () => {
  it('Testa a nav bar do trem loco', () => {
    renderWithRouter(<App />);
    const home = screen.getByRole('link', { name: /home/i });
    const about = screen.getByRole('link', { name: /about/i });
    const favPokemons = screen.getByRole('link', { name: /favorite pokémons/i });
    expect(home).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(favPokemons).toBeInTheDocument();
  });

  it('Testa se clicar em \'Home\', vai pro trem certo', () => {
    const { history } = renderWithRouter(<App />);
    const home = screen.getByRole('link', { name: /home/i });
    fireEvent.click(home);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('Testa se clicar em \'About\', vai pro trem certo', () => {
    const { history } = renderWithRouter(<App />);
    const about = screen.getByRole('link', { name: /about/i });
    fireEvent.click(about);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('Testa se clicar em \'Favorite Pokémons\', vai pro trem certo', () => {
    const { history } = renderWithRouter(<App />);
    const favPokemons = screen.getByRole('link', { name: /favorite pokémons/i });
    fireEvent.click(favPokemons);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it('Testa se vai pro trem certo se algum engraçadinho colocar coisa que não existe',
    () => {
      const { history } = renderWithRouter(<App />);
      history.push('/engracadinho');
      const aquiNao = screen.getByText(/page requested not found/i);
      expect(aquiNao).toBeInTheDocument();
    });
});
