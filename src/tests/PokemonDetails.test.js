import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PokemonDetails from '../components/PokemonDetails';
import renderWithRouter from './renderWithRouter';
import data from '../data';

describe('Tests for PokemonDetails component', () => {
  const mockProps = {
    isPokemonFavoriteById: {
      4: false,
      10: false,
      23: false,
      25: true,
      65: false,
      78: false,
      143: false,
      148: false,
      151: false,
    },
    match: {
      params: {
        id: '25',
      },
    },
    onUpdateFavoritePokemons: (() => {}),
    pokemons: data,
  };

  it('Test if Pokemon Details info are rendered right.', () => {
    const {
      isPokemonFavoriteById,
      match,
      onUpdateFavoritePokemon,
      pokemons,
    } = mockProps;
    renderWithRouter(
      <PokemonDetails
        isPokemonFavoriteById={ isPokemonFavoriteById }
        match={ match }
        pokemons={ pokemons }
        onUpdateFavoritePokemons={ () => onUpdateFavoritePokemon() }
      />,
    );

    const detailsText = screen.getByText(/pikachu details/i);
    const detailsHeading = screen.getByRole(/heading/i, { name: /summary/i });
    const paragraph = screen.getByText(pokemons[0].summary);

    expect(detailsHeading).toBeDefined();
    expect(detailsText).toBeDefined();
    expect(paragraph).toBeDefined();
  });

  it('Test if there\'s a section with pokemons map location.', () => {
    const {
      isPokemonFavoriteById,
      match,
      onUpdateFavoritePokemon,
      pokemons,
    } = mockProps;
    renderWithRouter(
      <PokemonDetails
        isPokemonFavoriteById={ isPokemonFavoriteById }
        match={ match }
        pokemons={ pokemons }
        onUpdateFavoritePokemons={ () => onUpdateFavoritePokemon() }
      />,
    );

    const locationHeading = screen.getByRole(/heading/i, {
      name: /game locations of pikachu/i,
    });
    const locationsMapImg = screen.getAllByRole(/img/i);

    expect(locationHeading).toBeDefined();
    expect(locationsMapImg[2]).toHaveProperty('src', pokemons[0].foundAt[0].map);
    expect(locationsMapImg[2]).toHaveProperty('alt', 'Pikachu location');
  });

  it('Test if its possible to fav a pokemon.', () => {
    const {
      isPokemonFavoriteById,
      match,
      pokemons,
    } = mockProps;
    const testClick = {
      isFavorite: true,
    };
    renderWithRouter(
      <PokemonDetails
        isPokemonFavoriteById={ isPokemonFavoriteById }
        match={ match }
        pokemons={ pokemons }
        onUpdateFavoritePokemons={ () => {
          testClick.isFavorite = !testClick.isFavorite;
        } }
      />,
    );

    const checkBoxLabel = screen.getByLabelText(/pokémon favoritado?/i);

    expect(checkBoxLabel).toBeDefined();
    expect(testClick.isFavorite).toBe(true);

    userEvent.click(checkBoxLabel);

    expect(testClick.isFavorite).toBe(false);
  });
});
