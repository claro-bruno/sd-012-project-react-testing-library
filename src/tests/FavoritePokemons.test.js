import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FavoritePokemons } from '../components';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('3. Teste o componente <FavoritePokemons.js />', () => {
  render(<FavoritePokemons />);

  it('Se é exibido na tela a mensagem No favorite pokemon found', () => {
    const PokeNotFound = screen.getByText(/No favorite pokemon found/i);
    expect(PokeNotFound).toBeInTheDocument();
  });
  it('Se é exibido todos os cards de pokémons favoritados', () => {
    renderWithRouter(<App />);

    userEvent.click(screen.getByText('More details'));
    userEvent.click(screen.getByText('Pokémon favoritado?'));

    userEvent.click(screen.getByText('Home'));
    userEvent.click(screen.getByText('Fire'));
    userEvent.click(screen.getByText('More details'));
    userEvent.click(screen.getByText('Pokémon favoritado?'));

    userEvent.click(screen.getByText('Favorite Pokémons'));

    const poke = screen.getByText('Charmander');
    expect(poke).toBeDefined();
    const poke1 = screen.getByText('Pikachu');
    expect(poke1).toBeDefined();
  });
});
