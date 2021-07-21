import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa informações do componente FavoritePokemons.js', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  it('Testa texto da página de favoritos quando não tem pokemons', () => {
    userEvent.click(screen.getByRole('link', { name: /Favorite Pokémons/i }));
    const paragraph = screen.getByText('No favorite pokemon found');
    expect(paragraph).toBeInTheDocument();
  });

  it('Testa se a página de favoritos exibe pokemóns favoritados', () => {
    userEvent.click(screen.getByRole('link', { name: /More details/i }));
    userEvent.click(screen.getByRole('checkbox'));
    userEvent.click(screen.getByRole('link', { name: /Favorite Pokémons/i }));
    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
  });
});
