import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

beforeEach(() => {
  renderWithRouter(<App />);
  userEvent.click(screen.getByText('Favorite Pokémons'));
});

describe('Testa a página favorite pokemons', () => {
  it('testa o conteúdo da página se nenhum pokemon estiver favoritado', () => {
    const pageContent = screen.getByText(/No favorite pokemon found/i);
    expect(pageContent).toBeDefined();
  });
});
