import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

describe('testa o componente PokemonDetails.js', () => {
  const { summary } = pokemons[0];
  const mokePokemon = {
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
    summary: 'This intelligent Pokémon roasts hard berries',
  };

  beforeEach(() => {
    const { history } = renderWithRouter(<App />);
    history.push(`/pokemons/${mokePokemon.id}`);
  });

  it('testa se as informações do Pokémon são mostradas na tela.', () => {
    const title = screen.getByRole('heading', { name: `${mokePokemon.name} Details` });
    expect(title).toBeInTheDocument();
    const titleSumary = screen.getByRole('heading', { name: /Summary/i });
    expect(titleSumary).toBeInTheDocument();
    const sumary = screen.getByText(summary);
    expect(sumary).toBeInTheDocument();
  });

  it('testa se existe uma seção com os mapas das localizações do pokémon', () => {
    const title = screen.getByRole('heading',
      { name: `Game Locations of ${mokePokemon.name}` });
    expect(title).toBeInTheDocument();

    const img = screen.getAllByRole('img');
    expect(img[1]).toBeInTheDocument();
    expect(img[1]).toHaveAttribute('src', mokePokemon.foundAt[0].map);
    expect(img[2]).toHaveAttribute('alt', `${mokePokemon.name} location`);

    expect(img[2]).toBeInTheDocument();
    expect(img[2]).toHaveAttribute('src', mokePokemon.foundAt[1].map);
    expect(img[2]).toHaveAttribute('alt', `${mokePokemon.name} location`);

    const mapText1 = screen.getByText(mokePokemon.foundAt[0].location);
    expect(mapText1).toBeInTheDocument();
    const mapText2 = screen.getByText(mokePokemon.foundAt[1].location);
    expect(mapText2).toBeInTheDocument();
  });

  it('testa se o usuário pode favoritar um pokémon na página de detalhes.', () => {
    const label = screen.getByLabelText(/Pokémon favoritado?/i);
    expect(label).toBeInTheDocument();
    const favoriteFalse = screen.getByRole('checkbox', { checked: false });
    expect(favoriteFalse).toBeInTheDocument();
    userEvent.click(favoriteFalse);
    const favoriteTrue = screen.getByRole('checkbox', { checked: true });
    expect(favoriteTrue).toBeInTheDocument();
  });
});
