import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testando component FavoritePokemons', () => {
  it('Testa se renderiza texto específico se não houver Pokémons favoritos', () => {
    render(<FavoritePokemons />);
    expect(screen.getByText(/No favorite pokemon found/i)).toBeInTheDocument();
  });

  it('Testa se os cards dos Pokémons favoritados aparece', () => {
    renderWithRouter(<App />);
    fireEvent.click(screen.getByRole('link', { name: /More details/i }));
    fireEvent.click(screen.getByRole('checkbox', { name: /Pokémon favoritado?/i }));
    fireEvent.click(screen.getByRole('link', { name: /Favorite Pokémons/i }));

    expect(screen.getByTestId('pokemon-name')).toHaveTextContent(/Pikachu/i);
    expect(screen.getByTestId('pokemon-type')).toHaveTextContent(/Electric/i);
    expect(screen.getByTestId('pokemon-weight')).toHaveTextContent(/6.0/g);
  });
});