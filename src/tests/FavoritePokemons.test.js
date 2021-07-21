import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { FavoritePokemons } from '../components';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testa o component FavoritePokemons.js', () => {
  render(<FavoritePokemons />);

  test('Testa se é exibido a mensagem No favorite pokemon found', () => {
    const message = screen.getByText(/No favorite/i);
    expect(message).toBeInTheDocument();
  });
});

describe('Testa se foi adicionados pokemons favoritos', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  test('Adiciona o Pikachu como favorito', () => {
    fireEvent.click(screen.getByText(/More details/));
    fireEvent.click(screen.getByText(/Pokémon favoritado?/));
    fireEvent.click(screen.getByText(/Favorite Pokémon/));
    const pikachu = screen.getByText(/Pikachu/);
    expect(pikachu).toBeInTheDocument();
  });
});
