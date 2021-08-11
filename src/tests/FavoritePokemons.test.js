import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Teste o componente <FavoritePokemons.js />', () => {
  it('Teste se é exibido na tela a mensagem '
    + 'No favorite pokemon found, se a pessoa não tiver pokémons favoritos', () => {
    const { history } = renderWithRouter(<App />);
    const { pathname } = history.location;
    const favoritesLink = screen.getByText('Favorite Pokémons');

    expect(pathname).toBe('/');
    expect(favoritesLink).toBeInTheDocument();
    userEvent.click(favoritesLink);
    expect(history.location.pathname).toBe('/favorites');

    expect(screen.getByText('No favorite pokemon found')).toBeDefined();
  });

  it('Teste se é exibido todos os cards de pokémons favoritados', () => {
    const { history } = renderWithRouter(<App />);
    const { pathname } = history.location;
    const favoritesLink = screen.getByText('Favorite Pokémons');

    expect(pathname).toBe('/');
    expect(favoritesLink).toBeInTheDocument();
    userEvent.click(favoritesLink);
    expect(history.location.pathname).toBe('/favorites');

    expect(screen.getByText('No favorite pokemon found')).toBeDefined();

    const homeLink = screen.getByText('Home');

    expect(homeLink).toBeInTheDocument();
    userEvent.click(homeLink);
    expect(history.location.pathname).toBe('/');

    let detailLink = screen.getByText('More details');

    expect(detailLink).toBeInTheDocument();
    userEvent.click(detailLink);
    expect(history.location.pathname).toBe('/pokemons/25');

    let favoriteCheckButton = screen.getByRole('checkbox');

    expect(favoriteCheckButton).toBeInTheDocument();
    userEvent.click(favoriteCheckButton);
    expect(homeLink).toBeInTheDocument();
    userEvent.click(homeLink);
    expect(history.location.pathname).toBe('/');

    const nextPokemon = screen.getByText('Próximo pokémon');

    expect(nextPokemon).toBeInTheDocument();
    userEvent.click(nextPokemon);
    detailLink = screen.getByText('More details');
    expect(detailLink).toBeInTheDocument();
    userEvent.click(detailLink);
    expect(history.location.pathname).toBe('/pokemons/4');
    favoriteCheckButton = screen.getByRole('checkbox');
    expect(favoriteCheckButton).toBeInTheDocument();
    userEvent.click(favoriteCheckButton);
    expect(favoritesLink).toBeInTheDocument();
    userEvent.click(favoritesLink);

    const favoritesList = screen.getAllByTestId('pokemon-name');
    const listLength = 2;

    expect(favoritesList).toHaveLength(listLength);
    expect(favoritesList[0]).toBeInTheDocument();
    expect(favoritesList[0]).toHaveTextContent('Pikachu');
    expect(favoritesList[1]).toBeInTheDocument();
    expect(favoritesList[1]).toHaveTextContent('Charmander');
  });
});
