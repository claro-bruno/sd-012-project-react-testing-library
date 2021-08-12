import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { Pokemon } from '../components';
import renderWithRouter from './renderWithRouter';
import TestPokemons from './TestPokemons';

const [pokemon] = TestPokemons;
const {
  id,
  name,
  type,
  averageWeight: { value, measurementUnit },
  image,
} = pokemon;

describe('Teste o componente Pokemon.js', () => {
  it('Checa a renderização do pokemon card', () => {
    renderWithRouter(<Pokemon pokemon={ pokemon } showDetailsLink isFavorite />);

    const averagePoke = `Average weight: ${value} ${measurementUnit}`;
    const altPoke = `${name} sprite`;

    const pokeName = screen.getByTestId('pokemon-name');
    const pokeType = screen.getByTestId('pokemon-type');
    const pokeWeight = screen.getByTestId('pokemon-weight');
    const pokeImg = screen.getByRole('img', { name: altPoke });

    expect(pokeName).toHaveTextContent(name);
    expect(pokeType).toHaveTextContent(type);
    expect(pokeWeight).toHaveTextContent(averagePoke);
    expect(pokeImg).toHaveProperty('src', image);
    expect(pokeImg).toHaveProperty('alt', altPoke);
  });

  it('Checa o link do pokemon card', () => {
    renderWithRouter(<Pokemon pokemon={ pokemon } showDetailsLink isFavorite />);

    const linkDetails = screen.getByRole('link');

    expect(linkDetails.pathname).toBe(`/pokemons/${id}`);
  });

  it('Checa o redirecionamento do link', () => {
    const {
      history,
    } = renderWithRouter(<Pokemon pokemon={ pokemon } showDetailsLink isFavorite />);
    const linkDetails = screen.getByRole('link');

    fireEvent.click(linkDetails);

    const { location: { pathname } } = history;

    expect(pathname).toBe(`/pokemons/${id}`);
  });

  it('Checa o ícone de favoritado', () => {
    renderWithRouter(<Pokemon pokemon={ pokemon } showDetailsLink isFavorite />);

    const favoriteCheck = `${name} is marked as favorite`;
    const starIcon = screen.getByRole('img', { name: /favorite/i });

    expect(starIcon).toHaveAttribute('src', '/star-icon.svg');
    expect(starIcon).toHaveProperty('alt', favoriteCheck);
  });
});
