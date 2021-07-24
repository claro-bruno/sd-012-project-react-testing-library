import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import { FavoritePokemons } from '../components';
import renderWithRouter from './renderWithRouter';

describe('2 - Testando o componente <About />', () => {
  it('Teste se a aplicação contém um texto.', () => {
    renderWithRouter(<FavoritePokemons />);
    const textNoFavorite = screen.getByText('No favorite pokemon found');
    expect(textNoFavorite).toBeInTheDocument();
  });
});
