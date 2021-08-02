import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import Pokemon from '../components/Pokemon';

describe('Teste o componente Pokemon', () => {
  it('Renderiza card do pikachu', () => {
    renderWithRouter(<App />);
    const pikachuName = screen.getByTestId('pokemon-name');
    const pikachuType = screen.getByTestId('pokemon-type');
    const pikachuWeight = screen.getByTestId('pokemon-weight');
    const pikachuImg = screen.getByAltText('Pikachu sprite');
    expect(pikachuName.textContent).toBe('Pikachu');
    expect(pikachuType.textContent).toBe('Electric');
    expect(pikachuWeight.textContent).toBe('Average weight: 6.0 kg');
    expect(pikachuImg.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });
  it('Testa se o link de detalhes funciona', () => {
    const { history } = renderWithRouter(<App />);
    const link = screen.getByText('More details');
    userEvent.click(link);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/pokemons/25');
  });
  it('Testa pokemon favorito', () => {
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
    renderWithRouter(<Pokemon pokemon={ pokemon } isFavorite />);
    const pikachuMarked = screen.getByAltText('Pikachu is marked as favorite');
    expect(pikachuMarked).toBeInTheDocument();
    expect(pikachuMarked.src).toBe('http://localhost/star-icon.svg');
  });
});
