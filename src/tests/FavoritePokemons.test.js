import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Requisito 3', () => {
  beforeEach(() => {
    render(<FavoritePokemons />);
  });

  it('Teste se é exibido na tela a mensagem No favorite pokemon found, se a pessoa não tiver pokémons favoritos.', () => {
    const noFavoritePokemon = screen.getByText('No favorite pokemon found');
    expect(noFavoritePokemon).toBeInTheDocument();
  });

  it('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    const { history } = renderWithRouter(<App />);
    const btnPokemonDetails = screen.getByRole('link', { name: 'More details' });
    fireEvent.click(btnPokemonDetails);
    expect(history.location.pathname).toBe('/pokemons/25');
    const favoritePokemonCheck = screen.getByLabelText('Pokémon favoritado?',
      { selector: 'input' });
    fireEvent.click(favoritePokemonCheck);
    const favoritePokemonsLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    fireEvent.click(favoritePokemonsLink);
    expect(history.location.pathname).toBe('/favorites');
    const favoritePokemonName = screen.getByTestId('pokemon-name');
    expect(favoritePokemonName).toHaveTextContent('Pikachu');
  });
});