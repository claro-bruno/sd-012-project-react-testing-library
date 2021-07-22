import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import { Pokemon } from '../components';

describe('Testa o componente Pokemon', () => {
  const pokemon = {
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
    summary: 'The flame on its tail shows the strength',
  };

  test('Teste se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<Pokemon pokemon={ pokemon } isFavorite={ false } />);
    const pokeName = screen.getByTestId(/pokemon-name/i);
    const pokeType = screen.getByTestId(/pokemon-type/i);
    const pokeWeigth = screen.getByTestId(/pokemon-weight/i);
    const pokeImg = screen.getByAltText(`${pokemon.name} sprite`);
    expect(pokeName.textContent).toBe('Charmander');
    expect(pokeName).toBeInTheDocument();
    expect(pokeType.textContent).toBe('Fire');
    expect(pokeType).toBeInTheDocument();
    expect(pokeWeigth.textContent).toBe(`Average weight: ${pokemon
      .averageWeight.value} ${pokemon.averageWeight.measurementUnit}`);
    expect(pokeWeigth).toBeInTheDocument();
    expect(pokeImg.src).toBe('https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png');
    expect(pokeImg).toBeInTheDocument();
  });

  test('Testa se há um link que leva para pagina de detalhes com o id na URL', () => {
    const { history } = renderWithRouter(
      <Pokemon pokemon={ pokemon } isFavorite={ false } />,
    );
    const linkDetails = screen.getByRole('link', { name: 'More details' });
    expect(linkDetails).toBeInTheDocument();
    expect(linkDetails).toHaveProperty('href', 'http://localhost/pokemons/4');
    userEvent.click(linkDetails);
    expect(history.location.pathname).toBe('/pokemons/4');
  });

  test('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    renderWithRouter(<Pokemon pokemon={ pokemon } isFavorite />);
    const starImg = screen.getByAltText(`${pokemon.name} is marked as favorite`);
    expect(starImg.src).toBe('http://localhost/star-icon.svg');
    expect(starImg).toBeInTheDocument();
  });
});
