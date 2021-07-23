import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import Pokemon from '../components/Pokemon';
import renderWithRouter from './renderWithRouter';

describe('Verifica Pokemon.js', () => {
  const mockPokemons = {
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
  it('Verifica se é renderizado um card com as informações do pokémon', () => {
    renderWithRouter(<App />);
    const correctName = screen.getByTestId('pokemon-name');
    expect(correctName).toHaveTextContent('Pikachu');

    const correctType = screen.getByTestId('pokemon-type');
    expect(correctType).toHaveTextContent('Electric');

    const { averageWeight: { value, measurementUnit } } = mockPokemons;
    const average = screen.getByText(`Average weight: ${value} ${measurementUnit}`);
    expect(average).toBeInTheDocument();

    const img = screen.getByRole('img');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', mockPokemons.image);
    expect(img).toHaveAttribute('alt', `${mockPokemons.name} sprite`);
  });

  it('verifica se o card contém um link de navegação para exibir detalhes', () => {
    const { history } = renderWithRouter(<App />);
    const checkLink = screen.getByRole('link', { name: /More details/i });
    expect(checkLink).toBeInTheDocument();
    userEvent.click(checkLink);
    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${mockPokemons.id}`);
  });

  it('Verifica se existe um ícone de estrela nos Pokémons favoritados', () => {
    renderWithRouter(<Pokemon pokemon={ mockPokemons } isFavorite />);
    const iconStarAlt = `${mockPokemons.name} is marked as favorite`;
    const starIcon = screen.getByRole('img', { name: /favorite/i });
    expect(starIcon).toHaveAttribute('src', '/star-icon.svg');
    expect(starIcon).toHaveProperty('alt', iconStarAlt);
  });
});
