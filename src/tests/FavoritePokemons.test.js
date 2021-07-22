import React from 'react';
import { screen } from '@testing-library/react';
import pokemons from '../data';

import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

const pokemonsArray = pokemons.filter((pokemon) => (
  pokemon.name === 'Pikachu' || pokemon.name === 'Snorlax'
));

describe('', () => {
  it(`Teste se é exibido na tela a mensagem No favorite pokemon found,
   se a pessoa não tiver pokémons favoritos.`, () => {
    renderWithRouter(<FavoritePokemons />);
    const msgNotFound = screen.getByText(/no favorite pokemon found/i);
    expect(msgNotFound).toBeInTheDocument();
  });

  it('Teste se é exibido todos os cards de pokémons favoritados', () => {
    renderWithRouter(<FavoritePokemons pokemons={ pokemonsArray } />);
    const msgNotFound = screen.queryByText(/no favorite pokemon found/i);
    const pikachu = screen.getByText('Pikachu');
    const snorlax = screen.getByText('Snorlax');

    expect(msgNotFound).toBeNull();
    expect(pikachu).toBeInTheDocument();
    expect(snorlax).toBeInTheDocument();
  });
});
