import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa o component FavoritePokemons.', () => {
  it('Testa se é exibido na tela a mensagem "No favorite pokemon found"', () => {
    renderWithRouter(<App />);

    const favoritePokemonsLink = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(favoritePokemonsLink);

    const noFavoritePokemon = screen.getByText('No favorite pokemon found');
    expect(noFavoritePokemon).toBeInTheDocument();
  });

  it('Testa se é exibido na tela todos os pokémons favoritados', () => {
    renderWithRouter(<App />);

    let moreDetailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetailsLink);
    let favoritePokemons = screen.getByLabelText(/pokémon favoritado?/i);
    userEvent.click(favoritePokemons);
    const homeLink = screen.getByRole('link', { name: /home/i });
    userEvent.click(homeLink);
    const normalButton = screen.getByRole('button', { name: /normal/i });
    userEvent.click(normalButton);
    moreDetailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetailsLink);
    favoritePokemons = screen.getByLabelText(/pokémon favoritado?/i);
    userEvent.click(favoritePokemons);
    const favoritePokemonsLink = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(favoritePokemonsLink);
    const pokemonWeight = screen.getAllByText('Average weight', { exact: false });
    expect(pokemonWeight).toHaveLength(2);
  });
});
