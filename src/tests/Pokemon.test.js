import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './Helper/RendeWithRouter';
import pokemons from '../data';
import Pokemon from '../components/Pokemon';

const mockFavPokemons = pokemons
  .find((pokemon) => pokemon.name === 'Charmander');

describe('Testa componente Pokemon', () => {
  test('Verifica se o card renderiza as informações de um pokemon', () => {
    renderWithRouter(<Pokemon pokemon={ mockFavPokemons } isFavorite={ false } />);

    const namePok = screen.getByText(/charmander/i);
    expect(namePok).toBeInTheDocument();

    const typePok = screen.getByText(/fire/i);
    expect(typePok).toBeInTheDocument();

    const weightPok = screen.getByText(/Average weight: 8.5 kg/i);
    expect(weightPok).toBeInTheDocument();

    const imgPok = screen.getByRole('img', { name: /charmander sprite/i });
    expect(imgPok).toBeInTheDocument();
    expect(imgPok).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png');
    expect(imgPok).toHaveAttribute('alt', 'Charmander sprite');
  });
  test('Verifica se renderia o link para mais detalhes do pokemon', () => {
    const { history } = renderWithRouter(<Pokemon pokemon={ mockFavPokemons } />);

    const linkDetils = screen.getByRole('link', { name: /more details/i });
    expect(linkDetils).toBeInTheDocument();

    userEvent.click(linkDetils);
    expect(history.location.pathname).toBe('/pokemons/4');
  });
  test('Verifica se renderiza o pokemon favoritado', () => {
    renderWithRouter(<Pokemon pokemon={ mockFavPokemons } isFavorite />);

    const imgFav = screen.getByRole('img', { name: /charmander is marked as favorite/i });
    expect(imgFav).toBeInTheDocument();
    expect(imgFav).toHaveAttribute('src', '/star-icon.svg');
    expect(imgFav).toHaveAttribute('alt', 'Charmander is marked as favorite');
  });
});
