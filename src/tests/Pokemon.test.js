import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import Pokemon from '../components/Pokemon';
import renderWithRouter from './renderWithRouter';

describe('testa o componente Pokemon.js', () => {
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
    summary: 'This intelligent Pokémon roasts hard berries with electricity.',
  };

  it('testa se é renderizado um card com as informações de determinado pokémon.', () => {
    renderWithRouter(<App />);
    const name = screen.getByText(mokePokemon.name);
    expect(name).toBeInTheDocument();

    const type = screen.getByTestId('pokemon-type');
    expect(type.innerHTML).toEqual(mokePokemon.type);

    const { averageWeight: { value, measurementUnit } } = mokePokemon;
    const average = screen.getByText(`Average weight: ${value} ${measurementUnit}`);
    expect(average).toBeInTheDocument();

    const img = screen.getByRole('img');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', mokePokemon.image);
    expect(img).toHaveAttribute('alt', `${mokePokemon.name} sprite`);
  });

  it('testa se o card indicado na Pokédex contém um link para exibir detalhes', () => {
    const { history } = renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', { name: /More details/i });
    expect(detailsLink).toBeInTheDocument();
    userEvent.click(detailsLink);
    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${mokePokemon.id}`);
  });

  it('testa se existe um ícone de estrela nos Pokémons favoritados.', () => {
    renderWithRouter(<Pokemon pokemon={ mokePokemon } isFavorite />);
    const iconStarAlt = `${mokePokemon.name} is marked as favorite`;
    const iconStar = screen.getAllByRole('img');
    expect(iconStar[1]).toBeInTheDocument();
    expect(iconStar[1]).toHaveAttribute('src', '/star-icon.svg');
    expect(iconStar[1]).toHaveAttribute('alt', iconStarAlt);
  });
});
