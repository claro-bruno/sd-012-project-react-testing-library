import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import { Pokemon } from '../components';

const mockPokemon = {
  id: 25,
  name: 'Pikachu',
  type: 'Electric',
  averageWeight: {
    value: '6.0',
    measurementUnit: 'kg',
  },
  image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
  moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
  foundAt: [
    {
      location: 'Kanto Viridian Forest',
      map: 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
    },
    {
      location: 'Kanto Power Plant',
      map: 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
    },
  ],
  summary: 'This intelligent Pokémon roasts hard berries with electricity...',
};
const mockFavorite = {
  4: false,
  10: false,
  23: false,
  25: true,
  65: false,
  78: false,
  143: false,
  148: false,
  151: false,
};

describe('Teste do componente Pokemon.js', () => {
  const { name, type, averageWeight: { value, measurementUnit }, image } = mockPokemon;
  test('Teste de renderização do card com as informações', () => {
    renderWithRouter(
      <Pokemon pokemon={ mockPokemon } isFavorite={ mockFavorite[mockPokemon.id] } />,
    );
    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokeWeight = screen.getByTestId('pokemon-weight');
    const img = screen.getByRole('img', { name: `${name} sprite` });
    const starIcon = screen.getByRole('img', { name: `${name} is marked as favorite` });
    expect(pokemonName).toHaveTextContent(name);
    expect(pokemonType).toHaveTextContent(type);
    expect(pokeWeight).toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);
    expect(img.src).toContain(image);
    expect(starIcon.src).toContain('/star-icon.svg');
  });

  test('Teste do Link para detalhes', () => {
    const { id } = mockPokemon;
    const { history } = renderWithRouter(
      <Pokemon pokemon={ mockPokemon } isFavorite={ mockFavorite[mockPokemon.id] } />,
    );
    const details = screen.getByRole('link', { name: /more details/i });
    expect(details).toBeInTheDocument();
    fireEvent.click(details);
    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${id}`);
  });
});
