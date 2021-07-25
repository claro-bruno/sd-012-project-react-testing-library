import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import PokemonDetails from '../components/PokemonDetails';
import pokemons from '../data';

const pokemonParam = {
  params: {
    id: 25,
  },
};

const pokemonIsFavorite = {
  25: false,
};

const text1 = 'This intelligent Pokémon roasts hard berries with electricity';

const text2 = ' to make them tender enough to eat.';

const summary = text1 + text2;

describe('Testa o component <PokemonDetails />', () => {
  it('testa os headings e o paragrafo', () => {
    renderWithRouter(
      <PokemonDetails
        pokemons={ pokemons }
        match={ pokemonParam }
        isPokemonFavoriteById={ pokemonIsFavorite }
      />,
    );
    const headings = screen.getAllByRole('heading');
    expect(headings[0]).toHaveTextContent('Pikachu Details');
    expect(headings[1]).toHaveTextContent('Summary');
    expect(headings[2]).toHaveTextContent('Game Locations of Pikachu');
    const paragraph = screen.getByText(summary);
    expect(paragraph).toBeInTheDocument();
  });

  it('teste das imagens do mapa', () => {
    renderWithRouter(
      <PokemonDetails
        pokemons={ pokemons }
        match={ pokemonParam }
        isPokemonFavoriteById={ pokemonIsFavorite }
      />,
    );
    const images = screen.getAllByRole('img');
    expect(images[1]).toHaveAttribute('src', expect.stringMatching('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png'));
    expect(images[1]).toHaveAttribute('alt', expect.stringMatching('Pikachu location'));
    expect(images[2]).toHaveAttribute('src', expect.stringMatching('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png'));
    expect(images[2]).toHaveAttribute('alt', expect.stringMatching('Pikachu location'));
  });

  it('testa o imput', () => {
    renderWithRouter(
      <PokemonDetails
        pokemons={ pokemons }
        match={ pokemonParam }
        isPokemonFavoriteById={ pokemonIsFavorite }
      />,
    );
    const label = screen.getByLabelText('Pokémon favoritado?');
    expect(label).toBeInTheDocument();
  });
});
