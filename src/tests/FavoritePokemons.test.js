import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import { FavoritePokemons } from '../components';
import App from '../App';

describe('Verifica se a pagina contem "No favorite pokemon found"', () => {
  test('Verifica se a página contém o primeiro paragrafo', () => {
    const textComplete = 'No favorite pokemon found';

    renderWithRouter(<FavoritePokemons />);

    const noFavPhrase = screen.getByText(textComplete);

    expect(noFavPhrase).toBeInTheDocument();
  });

  test('Verifica se a página exibe todos os Pokemons favoritados', () => {
    renderWithRouter(<App />);

    // Vai para a secao details do Pokemon
    const details = screen.getByRole('link', {
      name: /More details/i,
    });
    userEvent.click(details);

    // Adiciona o Pokemon como favorito
    const check = screen.getByRole('checkbox');
    userEvent.click(check);

    // Vai para a pagina de Pokemons favoritos
    const favPokemons = screen.getByRole('link', {
      name: /Favorite Pokémons/i,
    });
    userEvent.click(favPokemons);

    // Verifica se o pokemon esta favoritado
    const pokemon = screen.getByText('Pikachu');

    expect(pokemon).toBeInTheDocument();
  });
});
