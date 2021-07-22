import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import { FavoritePokemons } from '../components';

beforeEach(() => {
  renderWithRouter(<FavoritePokemons />);
});

describe('Teste o componente <FavoritePokemons.js />', () => {
  it('Teste se é exibido na tela a mensagem No favorite pokemon found', () => {
    const mensagem = screen.getByText(/No favorite pokemon found/i);

    expect(mensagem).toBeInTheDocument();
  });
});
