import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import Pokemon from '../components/Pokemon';

describe('testa o componente Pokemon', () => {
  const pokemon = {
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
    summary: 'This intelligent Pokémon roasts hard berries'
    + ' with electricity to make them tender enough to eat.',
  };
  it('Teste se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<Pokemon pokemon={ pokemon } isFavorite />);
    const pokeName = screen.getByTestId('pokemon-name');
    const pokeType = screen.getByTestId('pokemon-type');
    const pokeWeig = screen.getByTestId('pokemon-weight');
    const pokeImg = screen.getByAltText('Pikachu sprite');
    expect(pokeName.textContent).toBe('Pikachu');
    expect(pokeType.textContent).toBe('Electric');
    expect(pokeWeig.textContent).toBe('Average weight: 6.0 kg');
    expect(pokeImg.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });
  it('confere link de detalhes', () => {
    const { history } = renderWithRouter(<Pokemon pokemon={ pokemon } isFavorite />);
    const link = screen.getByText('More details');
    userEvent.click(link);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/pokemons/25');
  });
  it('testa favoritos', () => {
    renderWithRouter(<Pokemon pokemon={ pokemon } isFavorite />);
    const star = screen.getByAltText('Pikachu is marked as favorite');
    expect(star).toBeInTheDocument();
    expect(star.src).toBe('http://localhost/star-icon.svg');
  });
});
