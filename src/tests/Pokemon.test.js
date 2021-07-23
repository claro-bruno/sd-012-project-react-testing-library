import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import Pokemon from '../components/Pokemon';

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
  summary: 'This intelligent Pokémon roasts hard berries with electricity '
    + 'to make them tender enough to eat.',
};

describe('Teste do Component Pokemon.js.', () => {
  test('Verifica se é renderizado um card '
    + 'com as informações de determinado pokémon.', () => {
    renderWithRouter(<Pokemon pokemon={ pokemon } isFavorite={ false } />);
    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeigth = screen.getByTestId('pokemon-weight');
    const pokemonImg = screen.getByAltText('Pikachu sprite');
    const pokemonWeightValue = pokemon.averageWeight.value;

    expect(pokemonName).toHaveTextContent(pokemon.name);
    expect(pokemonType).toHaveTextContent(pokemon.type);
    expect(pokemonWeigth).toHaveTextContent(`Average weight: ${pokemonWeightValue} kg`);
    expect(pokemonImg.src).toBe(pokemon.image);
  });

  test('Verifica se o card do Pokémon indicado na Pokédex contém um link de navegação '
    + 'para exibir detalhes deste Pokémon.', () => {
    renderWithRouter(<Pokemon pokemon={ pokemon } isFavorite={ false } />);
    const pokemonLink = screen.getByRole('link');

    expect(pokemonLink.href).toBe('http://localhost/pokemons/25');
  });

  test('Verifica se ao clicar no link de navegação do Pokémon, é feito o '
    + 'redirecionamento da aplicação para a página de detalhes de Pokémon.', () => {
    const fav = false;
    const pok = pokemon;
    const { history } = renderWithRouter(<Pokemon pokemon={ pok } isFavorite={ fav } />);
    const pokemonLink = screen.getByRole('link');

    fireEvent.click(pokemonLink);

    expect(history.location.pathname).toBe('/pokemons/25');
  });

  test('Verifica se existe um ícone de estrela nos Pokémons favoritados.', () => {
    const fav = true;
    renderWithRouter(<Pokemon pokemon={ pokemon } isFavorite={ fav } />);
    const altText = `${pokemon.name} is marked as favorite`;
    const favoriteImg = screen.getByAltText(altText);

    expect(favoriteImg).toBeInTheDocument();
    expect(favoriteImg.src).toBe('http://localhost/star-icon.svg');
  });
});
