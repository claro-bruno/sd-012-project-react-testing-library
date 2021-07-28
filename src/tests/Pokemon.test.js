import React from 'react';
import { screen } from '@testing-library/react';
import event from '@testing-library/user-event';
import renderWithRouter from './RenderWithRouter';
import Pokemon from '../components/Pokemon';

const mockFavoritePokemons = [{
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
},
{
  id: 4,
  name: 'Charmander',
  type: 'Fire',
  averageWeight: {
    value: '8.5',
    measurementUnit: 'kg',
  },
  image: 'https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png',
  moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Charmander_(Pok%C3%A9mon)',
  foundAt: [
    {
      location: 'Alola Route 3',
      map: 'https://cdn2.bulbagarden.net/upload/9/93/Alola_Route_3_Map.png',
    },
    {
      location: 'Kanto Route 3',
      map: 'https://cdn2.bulbagarden.net/upload/4/4a/Kanto_Route_3_Map.png',
    },
    {
      location: 'Kanto Route 4',
      map: 'https://cdn2.bulbagarden.net/upload/2/24/Kanto_Route_4_Map.png',
    },
    {
      location: 'Kanto Rock Tunnel',
      map: 'https://cdn2.bulbagarden.net/upload/6/6f/Kanto_Rock_Tunnel_Map.png',
    },
  ],
}];

describe('testando as informações do pokemon na tela', () => {
  it('testando informações do pokemon', () => {
    renderWithRouter(<Pokemon
      pokemon={ mockFavoritePokemons[0] }
      isFavorite
      showDetailsLink
    />);
    const { value, measurementUnit } = mockFavoritePokemons[0].averageWeight;
    const namePokemon = screen.getByText(/Pikachu/i);
    const typePokemon = screen.getByText(mockFavoritePokemons[0].type);
    const weightPokemon = screen.getByText(`Average weight: ${value} ${measurementUnit}`);
    const img = screen.getAllByRole('img');
    expect(img[0]).toHaveAttribute('src', mockFavoritePokemons[0].image);
    expect(img[0]).toHaveAttribute('alt', `${mockFavoritePokemons[0].name} sprite`);
    expect(namePokemon).toBeInTheDocument();
    expect(typePokemon).toBeInTheDocument();
    expect(weightPokemon).toBeInTheDocument();
  });
  it('testando link e url da pagina', () => {
    const { history } = renderWithRouter(<Pokemon
      pokemon={ mockFavoritePokemons[0] }
      isFavorite
    />);
    const botaoDetails = screen.getByText(/More details/i);
    expect(botaoDetails).toBeInTheDocument();
    event.click(botaoDetails);
    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${mockFavoritePokemons[0].id}`);
    const img = screen.getAllByRole('img');
    expect(img[1]).toHaveAttribute('src', '/star-icon.svg');
    expect(img[1])
      .toHaveAttribute('alt', `${mockFavoritePokemons[0].name} is marked as favorite`);
  });
});
