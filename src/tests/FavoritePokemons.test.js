import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../RenderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Testa componente FavoritePokemons', () => {
  it('Testa se renderiza página de pokemons favoritos', () => {
    const { history } = renderWithRouter(<FavoritePokemons />);
    history.push('/favorites');
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it('Testa se é exibido mensagem No favorite pokemon found', () => {
    renderWithRouter(<FavoritePokemons />);
    const message = screen.getByText(/No favorite pokemon found/i);
    expect(message).toBeInTheDocument();
  });
});
