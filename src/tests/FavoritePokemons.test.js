import React from 'react';
import { render, screen } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Testa página Favorite Pokemons', () => {
  it('Testa sem pokemons favoritos', () => {
    render(<FavoritePokemons pokemons={ [] } />);
    const texto = screen.getByText(/no favorite pokemon found/i);
    expect(texto).toBeInTheDocument();
  });

  const POKEMON_MOCK = {
    id: 143,
    name: 'Snorlax',
    type: 'Normal',
    averageWeight: {
      value: '460.0',
      measurementUnit: 'kg',
    },
    image: 'https://cdn2.bulbagarden.net/upload/4/40/Spr_5b_143.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Snorlax_(Pok%C3%A9mon)',
    foundAt: [
      {
        location: 'Kanto Vermillion City',
        map: 'https://cdn2.bulbagarden.net/upload/5/54/Kanto_Vermilion_City_Map.png',
      },
    ],
  };

  it('Testa com pokemons favoritos', () => {
    renderWithRouter(<FavoritePokemons pokemons={ [POKEMON_MOCK] } />);
    const pokemon = screen.getByText('Snorlax');
    expect(pokemon).toBeInTheDocument();
  });
});
