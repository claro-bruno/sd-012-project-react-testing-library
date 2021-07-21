import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testa o component <FavoritePokemons />', () => {
  it(`Testa se o componente exibe a msg "No favorites pokemon found", 
  se não houver favoritos`, () => {
    renderWithRouter(<FavoritePokemons />);
    const heading = screen.getByRole('heading', { name: /Favorite pokémons/i });
    expect(heading).toBeInTheDocument();

    const notFavs = screen.getByText(/no favorite pokemon found/i);
    expect(notFavs).toBeInTheDocument();
  });

  it('Testa se os cards favoritos são exibidos', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/25');
    const favInputCheckbox = screen.getByRole('checkbox');
    userEvent.click(favInputCheckbox);
    history.push('/pokemons/10');
    userEvent.click(favInputCheckbox);
    history.push('/favorites');

    const pokeCard = screen.getAllByText(/average weight/i);
    expect(pokeCard.length).toBe(2);

    const pikachu = screen.getByText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();

    const caterpie = screen.getByText(/caterpie/i);
    expect(caterpie).toBeInTheDocument();
  });

  it('Testa se nenhum card de pokemon é exibido se não for favoritado', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/25');
    const favInputCheckbox = screen.getByRole('checkbox');
    userEvent.click(favInputCheckbox);
    history.push('/favorites');

    const pokeCard = screen.getAllByText(/average weight/i);
    expect(pokeCard.length).toBe(1);

    const caterpie = screen.getByText(/caterpie/i);
    expect(caterpie).toBeInTheDocument();
  });
});
