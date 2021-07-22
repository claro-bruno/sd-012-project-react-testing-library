import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';
import renderWithRouter from '../helper/renderWithRouter';

describe('testa o componente favorite pokemon', () => {
  it('Testa se é exibido na tela a mensagem No favorite pokemon found', () => {
    renderWithRouter(<FavoritePokemons />);
    const nofave = screen.getByText(/No favorite pokemon found/i);
    expect(nofave).toBeInTheDocument();
  });
  it('Testa se é exibido na tela os cards de pokemon', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/25');
    const favorite = screen.getByRole('checkbox');
    userEvent.click(favorite);
    history.push('/favorites');
    const favepoke = screen.getAllByText(/weight/i);
    expect(favepoke.length).toBe(1);
  });
});
