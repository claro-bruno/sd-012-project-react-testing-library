import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import Pokemon from '../components/Pokemon';

const isFavorite = true;
const pikachu = {
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
  summary: 'This intelligent Pokémon roasts berries to make them tender enough to eat.',
};

describe('Requisito 6 - Testando o componente <Pokemon.js />', () => {
  it('1. Teste se é renderizado um card com as informações do pokémon.', () => {
    renderWithRouter(<Pokemon pokemon={ pikachu } isFavorite={ isFavorite } />);
    const pokeName = screen.getByTestId('pokemon-name');
    const pokeType = screen.getByTestId('pokemon-type');
    const pokeWeig = screen.getByTestId('pokemon-weight');
    const pokeImg = screen.getByAltText('Pikachu sprite');

    expect(pokeName.textContent).toBe('Pikachu');
    expect(pokeType.textContent).toBe('Electric');
    expect(pokeWeig.textContent).toBe('Average weight: 6.0 kg');
    expect(pokeImg.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  it('2. Teste se o card do Pokémon indicado na Pokédex contém um link.', () => {
    renderWithRouter(<Pokemon pokemon={ pikachu } isFavorite={ isFavorite } />);
    const link = screen.getByRole('link');
    const linkHref = link.getAttribute('href');

    expect(linkHref).toBe('/pokemons/25');
  });

  // it('3. Teste redirecionamento do link para página de detalhes.', () => {
  //   renderWithRouter(<Pokemon pokemon={ pikachu } isFavorite={ isFavorite } />);
  // });

  // it('4. Teste também se a URL exibida no navegador muda para /pokemon/<id>', () => {
  //   renderWithRouter(<Pokemon pokemon={ pikachu } isFavorite={ isFavorite } />);
  // });

  it('5. Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    renderWithRouter(<Pokemon pokemon={ pikachu } isFavorite={ isFavorite } />);
    const allImages = screen.getAllByRole('img');
    const imgSrc = allImages[1].getAttribute('src');
    const imgAlt = allImages[1].getAttribute('alt');

    expect(imgSrc).toBe('/star-icon.svg');
    expect(imgAlt).toBe('Pikachu is marked as favorite');
  });
});
