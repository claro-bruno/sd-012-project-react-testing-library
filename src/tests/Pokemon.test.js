import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pokemon from '../components/Pokemon';
import renderWithRouter from './renderWithRouter';

const mockPokemon = {
  id: 143,
  name: 'Snorlax',
  type: 'Normal',
  averageWeight: {
    value: '460.0',
    measurementUnit: 'kg',
  },
  image: 'https://cdn2.bulbagarden.net/upload/4/40/Spr_5b_143.png',
  moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Snorlax_(Pok%C3%A9mon)',
  foundAt: [
    {
      location: 'Kanto Vermillion City',
      map: 'https://cdn2.bulbagarden.net/upload/5/54/Kanto_Vermilion_City_Map.png',
    },
  ],
  summary: 'What sounds like its cry may actually be'
    + ' its snores or the rumblings of its hungry belly.',
};

describe('Testes do componente Pokemon.js', () => {
  test('Testa se é renderizado um card com infos de pokémon específico', () => {
    renderWithRouter(<Pokemon pokemon={ mockPokemon } isFavorite={ false } />);
    const pokeName = screen.getByTestId('pokemon-name');
    const pokeType = screen.getByTestId('pokemon-type');
    const pokeWeight = screen.getByTestId('pokemon-weight');
    const { value, measurementUnit } = mockPokemon.averageWeight;
    const pokeImg = screen.getByAltText('Snorlax sprite');

    expect(pokeName).toHaveTextContent(mockPokemon.name);
    expect(pokeType).toHaveTextContent(mockPokemon.type);
    expect(pokeWeight).toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);
    expect(pokeImg.src).toBe(mockPokemon.image);
  });

  test('Testa se o card do pokémon específico contém link para "Mais detalhes"', () => {
    renderWithRouter(<Pokemon pokemon={ mockPokemon } isFavorite={ false } />);
    const detailsLink = screen.getByRole('link', { name: 'More details' });
    expect(detailsLink.href).toBe('http://localhost/pokemons/143');
  });
});
