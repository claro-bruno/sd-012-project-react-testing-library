import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';
import renderWRouter from './RenderWRouter';

describe('Testando component FavoritePokemons', () => {
  test('Testa se surge a msg de "no favorite pokemon found" casa não haja um', () => {
    render(<FavoritePokemons />);
    const notFoundMsg = screen.getByText(/No favorite pokemon found/i);

    expect(notFoundMsg).toBeInTheDocument();
  });

  test('Testa se aparecem os pokemóns favoritos', () => {
    renderWRouter(<App />);

    const moreDetailsLink = screen.getByRole('link', { name: /More Details/i });
    fireEvent.click(moreDetailsLink);

    const markPokemon = screen.getByRole('checkbox', { name: /Pokémon favoritado?/i });
    fireEvent.click(markPokemon);

    const favoritePokemonLink = screen.getByRole('link', { name: /Favorite Pokémons/i });
    fireEvent.click(favoritePokemonLink);

    expect(screen.getByTestId('pokemon-name')).toHaveTextContent(/Pikachu/i);
  });
});
