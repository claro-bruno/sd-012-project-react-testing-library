import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('3 - FavoritePokemons.test', () => {
  test('1- Teste se contem a frase favorite pokemon found', () => {
    renderWithRouter(<FavoritePokemons />);
    const notFound = (screen.getByText(/favorite pokemon found/));
    expect(notFound).toBeInTheDocument();
  });

  test('2- Teste se é exibido todos os cards de pokémons favoritados', () => {
    renderWithRouter(<App />);
    // - Verifica e clica no Link More details
    const moreDetails = (screen.getByText(/More details/));
    fireEvent.click(moreDetails);
    // - Verifica o clica no Link Pokémon Favoritado
    const checkFavoritado = (screen.getByText(/Pokémon favoritado?/));
    fireEvent.click(checkFavoritado);
    // -  Clica no link Favorite Pokémons
    const linkPage = screen.getByText(/Favorite Pokémons/);
    fireEvent.click(linkPage);
    // -  Busca pelo Card Picachu
    const cardPockemon = screen.getByText(/Pikachu/);
    expect(cardPockemon).toBeDefined();
  });
});
