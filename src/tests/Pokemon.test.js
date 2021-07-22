import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Pokemon from '../components/Pokemon';

const pokemon = {
  id: 151,
  name: 'Mew',
  type: 'Psychic',
  averageWeight: {
    value: '4.0',
    measurementUnit: 'kg',
  },
  image: 'https://cdn2.bulbagarden.net/upload/4/43/Spr_5b_151.png',
  moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Mew_(Pok%C3%A9mon)',
  foundAt: [
    {
      location: 'Faraway Island',
      map: 'https://cdn2.bulbagarden.net/upload/e/e4/Hoenn_Faraway_Island_Map.png',
    },
  ],
  summary: 'Apparently, it appears only to those people who are pure of heart and have'
  + ' a strong desire to see it.',
};

describe('Atendendo aos testes do Requisito 6', () => {
  test('Testando os textos, imagens normais e links', () => {
    const favPokemon = true;
    const { history } = renderWithRouter(<Pokemon
      pokemon={ pokemon }
      isFavorite={ favPokemon }
    />);
    const pkmName = screen.getByTestId('pokemon-name');
    expect(pkmName).toBeInTheDocument();
    expect(pkmName.textContent).toBe('Mew');

    const pkmType = screen.getByTestId('pokemon-type');
    expect(pkmType).toBeInTheDocument();
    expect(pkmType.textContent).toBe('Psychic');

    const pkmWeight = screen.getByTestId('pokemon-weight');
    const { averageWeight: { value, measurementUnit } } = pokemon;
    const expectWeigth = `Average weight: ${value} ${measurementUnit}`;
    expect(pkmWeight).toBeInTheDocument();
    expect(pkmWeight.textContent).toBe(expectWeigth);

    const pkmImg = screen.getByAltText(`${pokemon.name} sprite`);
    expect(pkmImg).toBeInTheDocument();
    expect(pkmImg.src).not.toBeNull();
    expect(pkmImg.src).not.toBe('');
    console.log(pkmImg.src);

    if (favPokemon) {
      const favStar = screen.getByAltText(`${pokemon.name} is marked as favorite`);
      expect(favStar).toBeInTheDocument();
      expect(favStar.src).toBe('http://localhost/star-icon.svg');
    }

    const detailsBtn = screen.getByRole('link');
    expect(detailsBtn).toBeInTheDocument();
    expect(detailsBtn.href).toBe(`http://localhost/pokemons/${pokemon.id}`);
    userEvent.click(detailsBtn);
    expect(history.location.pathname).toBe(`/pokemons/${pokemon.id}`);
  });
  test('Estrela de Pokemon Favorito - True', () => {
    const favPokemon = true;
    renderWithRouter(<Pokemon
      pokemon={ pokemon }
      isFavorite={ favPokemon }
    />);
    const favStar = screen.getByAltText(`${pokemon.name} is marked as favorite`);
    expect(favStar).toBeInTheDocument();
    expect(favStar.src).toBe('http://localhost/star-icon.svg');
  });
  test('Estrela de Pokemon Favorito - False', () => {
    const favPokemon = false;
    renderWithRouter(<Pokemon
      pokemon={ pokemon }
      isFavorite={ favPokemon }
    />);
    expect(screen.queryByAltText(`${pokemon.name} is marked as favorite`)).toBeNull();
  });
});
