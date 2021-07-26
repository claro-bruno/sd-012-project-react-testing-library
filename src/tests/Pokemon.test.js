import React from 'react';
import { screen } from '@testing-library/react';
import event from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Pokemon from '../components/Pokemon';

describe('Testando o componente Pokemon.js', () => {
  const mockPikachu = {
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
  };
  test('Verifica as informaçoes do card do pokemon', () => {
    const { history } = renderWithRouter(<Pokemon
      pokemon={ mockPikachu }
      isFavorite
      showDetailsLink
    />);
    const { name, type, averageWeight, image, id } = mockPikachu;
    const { value, measurementUnit } = averageWeight;
    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toHaveTextContent(name);

    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toHaveTextContent(type);

    const pokemonWeight = screen.getByTestId('pokemon-weight');
    expect(pokemonWeight).toHaveTextContent(`${value} ${measurementUnit}`);

    const pokemonImage = screen.getAllByRole('img');
    expect(pokemonImage[0]).toHaveAttribute('alt', `${name} sprite`);
    expect(pokemonImage[0]).toHaveAttribute('src', image);

    const pokemonLinkDetails = screen.getByRole('link');
    expect(pokemonLinkDetails.pathname).toBe(`/pokemons/${id}`);

    event.click(pokemonLinkDetails);
    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${id}`);
  });
  test('Verifica as informaçoes do card do pokemon', () => {
    const { name } = mockPikachu;
    renderWithRouter(<Pokemon pokemon={ mockPikachu } isFavorite showDetailsLink />);
    const pokemonImage = screen.getAllByRole('img');
    expect(pokemonImage[1]).toHaveAttribute('src', '/star-icon.svg');
    expect(pokemonImage[1]).toHaveAttribute('alt', `${name} is marked as favorite`);
  });
});
