import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import App from '../App';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../renderWithRouter';

describe('Testa os pokemóns favoritos', () => {
  beforeEach(() => {
    renderWithRouter(<FavoritePokemons />);
  });
  it('Se a pessoa não tiver pokemóns, deverá mostrar uma mensagem', () => {
    const noPokesText = screen.getByText(/No favorite pokemon found/i);
    expect(noPokesText).toBeInTheDocument();
  });
});
