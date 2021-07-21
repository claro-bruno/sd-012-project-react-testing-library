import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import FavoritePockemons from '../components/FavoritePokemons';

describe('Teste o componente <FavoritePokemons.js />', () => {
  it('Teste se a página contém as informações sobre a Pokédex', () => {
    renderWithRouter(<FavoritePockemons />);
    const favPockemons = screen.getByText(/No favorite pokemon found/i);
    expect(favPockemons).toBeInTheDocument();
  });
  it('Teste se é exibido todos os cards de pokémons favoritados', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/10');
    const favCheckBox = screen.getByRole('checkbox');
    fireEvent.click(favCheckBox);
    history.push('/pokemons/23');
    fireEvent.click(favCheckBox);
    history.push('/favorites');
    const pokemonCards = screen.getAllByText(/average weight/i);
    const caterpie = screen.getByText('Caterpie');
    const ekans = screen.getByText('Ekans');
    expect(pokemonCards.length).toEqual(2);
    expect(caterpie).toBeInTheDocument();
    expect(ekans).toBeInTheDocument();
  });
});
