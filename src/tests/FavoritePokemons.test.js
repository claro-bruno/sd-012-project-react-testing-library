import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RenderWithRouter from './helpers/RenderWithRouter';

import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('Teste do componente FavoritePokemons', () => {
  test('Verifica se caso não haja Pokemon favorito, renderiza uma mensagem', () => {
    RenderWithRouter(<FavoritePokemons />);

    const message = 'No favorite pokemon found';

    const notFoundFavorite = screen.getByText(message);

    expect(notFoundFavorite).toBeInTheDocument();
  });

  test('Verifica se é renderizado os pokemons favoritos', () => {
    RenderWithRouter(<App />);

    userEvent.click(screen.getByRole('link', { name: /More details/i }));
    userEvent.click(screen.getByLabelText('Pokémon favoritado?'));
    userEvent.click(screen.getByRole('link', { name: /Favorite Pokémon/i }));

    const favorites = screen.getByRole('link', { name: /More details/i });
    expect(favorites).toBeInTheDocument();
  });
});
