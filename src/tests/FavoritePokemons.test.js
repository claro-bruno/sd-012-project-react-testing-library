import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { FavoritePokemons } from '../components';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa o componente FavoritePokemons.js', () => {
  test('Testa se é exibid a mensagem "No favorite pokemon found"', () => {
    renderWithRouter(<FavoritePokemons />);
    const noPokeFound = screen.getByText(/No favorite pokemon found/i);
    expect(noPokeFound).toBeInTheDocument();
  });

  test('Testa se renderiza os cards dos poke favoritos', () => {
    renderWithRouter(<App />);
    fireEvent.click(screen.getByRole('link', { name: /More details/i }));
    fireEvent.click(screen.getByRole('checkbox', { name: /Pokémon favoritado?/i }));
    fireEvent.click(screen.getByRole('link', { name: /Favorite Pokémons/i }));
    expect(screen.getByTestId('pokemon-name')).toHaveTextContent(/Pikachu/i);
    expect(screen.getByTestId('pokemon-type')).toHaveTextContent(/Electric/i);
    expect(screen.getByTestId('pokemon-weight')).toHaveTextContent(/6.0/g);
  });
});
