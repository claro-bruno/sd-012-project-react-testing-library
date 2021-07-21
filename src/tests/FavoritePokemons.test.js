import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../help/renderWithRouter';
import { FavoritePokemons } from '../components';

const $favoritePokemon = [{
  id: 25,
  name: 'Pikachu',
  type: 'Electric',
  averageWeight: {
    value: '6.0',
    measurementUnit: 'kg',
  },
  image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
}];

describe('Test the component Favorite Pokemons', () => {
  it('Test if the message No favorite pokemon found is displayed on the screen', () => {
    renderWithRouter(<FavoritePokemons />);

    const $messageNotFound = screen
      .getByText(/No favorite pokemon found/i);
    expect($messageNotFound).toBeInTheDocument('');
  });

  it('Test if all favorite Pokemon cards are displayed', () => {
    renderWithRouter(<FavoritePokemons pokemons={ $favoritePokemon } />);

    const $pikachuImg = screen.getByRole('img', { name: /pikachu sprite/i });
    expect($pikachuImg).toBeInTheDocument();
  });
});
