import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('Testa todo FavoritePokemons.js', () => {
  it('renderiza "No favorite pokemon found"', () => {
    renderWithRouter(<FavoritePokemons pokemons={ [] } />);

    const noFavoriteFound = screen.getByText(/No favorite pokemon found/i);
    expect(noFavoriteFound).toBeVisible();
  });

  it('renderiza card pokemon', () => {
    const { history } = renderWithRouter(<App />);

    const linkDetails = screen.getByRole('link', { name: /More details/i });
    userEvent.click(linkDetails);

    const favCheckbox = screen.getByLabelText(/Pokémon favoritado?/i);
    expect(favCheckbox).not.toBeChecked();
    userEvent.click(favCheckbox);
    expect(favCheckbox).toBeChecked();

    const linkFav = screen.getByRole('link', { name: /Favorite Pokémons/i });
    userEvent.click(linkFav);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');

    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');

    expect(pokemonName).toBeInTheDocument();
    expect(pokemonType).toBeInTheDocument();
    expect(pokemonWeight).toBeInTheDocument();
  });
});
