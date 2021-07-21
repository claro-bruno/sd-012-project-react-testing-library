import React from 'react';
import { render, screen } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from './renderWithRouter';

describe('testa componente FavoritePokemons', () => {
  it('testa without favorite', () => {
    render(<FavoritePokemons />);
    const favHeading = screen.getByRole('heading',
      { level: 2, name: /Favorite pokémons/i });
    expect(favHeading).toBeInTheDocument();
    const noFavText = screen.getByText(/No favorite pokemon found/i);
    expect(noFavText).toBeInTheDocument();
  });

  it('testa with favorite', () => {
    const pokes = [{ id: 25, name: 'Pikachu', type: 'Electric', averageWeight: { value: '6.0', measurementUnit: 'kg' }, image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png', moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)', foundAt: [{ location: 'Kanto Viridian Forest', map: 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png' }, { location: 'Kanto Power Plant', map: 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png' }], summary: 'This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.' }, { id: 23, name: 'Ekans', type: 'Poison', averageWeight: { value: '6.9', measurementUnit: 'kg' }, image: 'https://cdn2.bulbagarden.net/upload/1/18/Spr_5b_023.png', moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Ekans_(Pok%C3%A9mon)', foundAt: [{ location: 'Goldenrod Game Corner', map: 'https://cdn2.bulbagarden.net/upload/e/ec/Johto_Goldenrod_City_Map.png' }], summary: 'It can freely detach its jaw to swallow large prey whole. It can become too heavy to move, however.' }, { id: 78, name: 'Rapidash', type: 'Fire', averageWeight: { value: '95.0', measurementUnit: 'kg' }, image: 'https://cdn2.bulbagarden.net/upload/5/58/Spr_5b_078.png', moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Rapidash_(Pok%C3%A9mon)', foundAt: [{ location: 'Kanto Route 28', map: 'https://cdn2.bulbagarden.net/upload/5/5b/Kanto_Route_28_Map.png' }, { location: 'Johto Mount Silver', map: 'https://cdn2.bulbagarden.net/upload/9/95/Johto_Mt_Silver_Map.png' }], summary: 'At full gallop, its four hooves barely touch the ground because it moves so incredibly fast.' }];
    renderWithRouter(<FavoritePokemons pokemons={ pokes } />);

    const favHeading = screen.getByRole('heading',
      { level: 2, name: /Favorite pokémons/i });
    expect(favHeading).toBeInTheDocument();

    const pokesCards = screen.getAllByText(/Average weight/i);
    expect(pokesCards.length).toBe(pokes.length);
  });
});
