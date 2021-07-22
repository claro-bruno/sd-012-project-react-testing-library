import React from 'react';
import { render, screen } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from './renderWithRouter';


const favoritePokemons = [{
  id: 25,
  name: 'Pikachu',
  type: 'Electric',
  averageWeight: {
    value: '6.0',
    measurementUnit: 'kg',
  },
  image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
  moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
  foundAt: [
    {
      location: 'Kanto Viridian Forest',
      map: 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
    },
    {
      location: 'Kanto Power Plant',
      map: 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
    },
  ],
  summary: 'This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.',
},]
 

describe('testa se favorite pokemons funciona como esperado', () => {
  test('testa se quando não ha um pokemons a pagina renderiza "No favorite pokemon found". ', () => {
    render(<FavoritePokemons/>);
    const notpokemons = screen.getByText(/No favorite pokemon found/i)
    expect(notpokemons).toBeInTheDocument();
  });
  test('quando a checkbox de favoritos em details pokemons é marcada o card aparece em favorite pokemons ', () => {
    renderWithRouter(<FavoritePokemons pokemons={favoritePokemons}/>);
    const favorite = screen.getByText(/Pikachu/i)
    expect(favorite).toBeInTheDocument();
  })
})
