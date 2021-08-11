import React from 'react';
import { render, screen } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import historyRender from './GenericHistory';

describe('Testa componente About', () => {
  test('Testa se aparece a mensagem quando não há favoritos', () => {
    historyRender(<FavoritePokemons pokemons={ [] } />);
    const nofavorite = screen.getByText(/No favorite pokemon found/i);
    expect(nofavorite).toBeInTheDocument();
  });
});
