import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import { FavoritePokemons } from '../components';

beforeEach(() => {
  renderWithRouter(<FavoritePokemons />);
});

describe('Testa o componente <FavoritePokemons.js />', () => {
  it('Testa se é exibido na tela a mensagem No favorite pokemon found', () => {
    const mesage = screen.getByText(/No favorite pokemon found/i);

    expect(mesage).toBeInTheDocument();
  });
});
