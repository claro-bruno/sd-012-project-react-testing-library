import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa o componente Pokemon.js', () => {
  it('Verifica a renderização do card e suas infos', () => {
    const { history } = renderWithRouter(<App />);
    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    const pokemonImg = screen.getByRole('img');
    const moreDetailsLink = screen.getByText('More details');
    expect(pokemonName).toBeInTheDocument();
    expect(pokemonName.innerHTML).toBe('Pikachu');
    expect(pokemonType).toBeInTheDocument();
    expect(pokemonType.innerHTML).toBe('Electric');
    expect(pokemonWeight).toBeInTheDocument();
    expect(pokemonWeight.innerHTML).toBe('Average weight: 6.0 kg');
    expect(pokemonImg).toBeInTheDocument();
    expect(pokemonImg.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(pokemonImg.alt).toBe('Pikachu sprite');
    expect(moreDetailsLink).toBeDefined();
    expect(moreDetailsLink.href).toBe('http://localhost/pokemons/25');
    userEvent.click(moreDetailsLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
    const favoritePokemonButton = screen.getByLabelText('Pokémon favoritado?');
    userEvent.click(favoritePokemonButton);
    const addedToFavorite = screen.getByAltText('Pikachu is marked as favorite');
    expect(addedToFavorite).toBeDefined();
    expect(addedToFavorite.src).toBe('http://localhost/star-icon.svg');
  });
});
