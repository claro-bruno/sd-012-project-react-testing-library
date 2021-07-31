import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('Testando todo o meu componente FavoritePokemon', () => {
  it('Se renderiza `FavoritesPokemon` com Heading `Favorite Pokémons`', () => {
    renderWithRouter(<FavoritePokemons />);

    const heading = screen.getByRole('heading');
    expect(heading.tagName).toBe('H2');
    expect(heading).toHaveTextContent(/Favorite pokémons/i);
  });

  it('Testando se renderiza texto sem nenhum Pokemon', () => {
    renderWithRouter(<FavoritePokemons />);
    const notFavPokMsg = screen.getByText('No favorite pokemon found');
    expect(notFavPokMsg).toBeInTheDocument();
  });

  it('if renders a favorited pokemon', () => {
    renderWithRouter(<App />);

    const detailsLink = screen.getByText('More details');
    fireEvent.click(detailsLink);
    const favoriteInput = screen.getByRole('checkbox');
    expect(favoriteInput.checked).toBe(false);
    fireEvent.click(favoriteInput);
    expect(favoriteInput.checked).toBe(true);
    const favoriteLink = screen.getByText('Favorite Pokémons');
    fireEvent.click(favoriteLink);
    const pokemons = screen.getAllByRole('img');
    expect(pokemons).toHaveLength(2);
    expect(pokemons[1].alt).toBe('Pikachu is marked as favorite');
  });
});
