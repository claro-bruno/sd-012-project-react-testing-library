import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import App from '../App';
import render from './renderWithRouter';
import pokemons from '../data';
import * as pokedexService from '../services/pokedexService';

jest.mock('../services/pokedexService');
const favorites = [];
pokedexService.updateFavoritePokemons.mockImplementation((idItem) => {
  favorites.push(idItem);
});
pokedexService.readFavoritePokemonIds.mockImplementation(() => favorites);

describe('Verifica comportamento e elementos de Pokémon Details.', () => {
  beforeEach(() => {
    const { history } = render(<App />);
    const detail = screen.getByText(/More Details/i);
    fireEvent.click(detail);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/pokemons/25');
  });
  it('todos os elementos devem estar na tela', () => {
    const name = screen.getByText('Pikachu Details');
    const sum = screen.getByRole('heading', { level: 2, name: 'Summary' });
    const parag = screen.getByText(pokemons[0].summary);
    expect(name).toBeInTheDocument();
    expect(sum).toBeInTheDocument();
    expect(sum.textContent).toBe('Summary');
    expect(parag).toBeInTheDocument();
  });
  it('verifica se tem os mapas da localização do pokemon', () => {
    const headingLocation = screen
      .getByRole('heading', { level: 2, name: 'Game Locations of Pikachu' });
    const imgs = screen.getAllByAltText(/Pikachu location/i);
    imgs.forEach((img) => {
      expect(img).toBeInTheDocument();
    });
    expect(headingLocation).toBeInTheDocument();
    expect(imgs[0].src).toBe(pokemons[0].foundAt[0].map);
    expect(imgs[1].src).toBe(pokemons[0].foundAt[1].map);
  });
  it('verifica se há um checkbox funcionando', () => {
    const label = screen.getByLabelText('Pokémon favoritado?');
    expect(label).toBeInTheDocument();
    fireEvent.click(label);
    expect(pokedexService.updateFavoritePokemons).toBeCalled();
    const fav = 25;
    expect(favorites).toContain(fav);
  });
});
