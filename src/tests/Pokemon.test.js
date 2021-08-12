import React from 'react';

import { screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import renderWithRouter from './helper';

import Pokemon from '../components/Pokemon';

import pokemons from '../data';

describe('Testa componente Pokemon', () => {
  it('Should render with name', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite />);
    const name = screen.getByTestId('pokemon-name');
    expect(name.textContent).toBe('Pikachu');
    expect(name).toBeInTheDocument();
  });

  it('Should render with a type', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite />);
    const type = screen.getByTestId('pokemon-type');
    expect(type.textContent).toBe('Electric');
    expect(type).toBeInTheDocument();
  });

  it('Should render with a weight', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite />);
    const type = screen.getByTestId('pokemon-weight');
    const { value } = pokemons[0].averageWeight;
    const { measurementUnit } = pokemons[0].averageWeight;
    expect(type.textContent).toBe(
      `Average weight: ${value} ${measurementUnit}`,
    );
    expect(type).toBeInTheDocument();
  });

  it('Should render with a image', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite />);
    const { name } = pokemons[0];
    const { image } = pokemons[0];
    const img = screen.getByAltText(`${name} sprite`);
    expect(img).toHaveAttribute('src', image);
    expect(img).toBeInTheDocument();
  });

  it('Should render with a More details link', () => {
    const { history } = renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite />);
    const link = screen.getByRole('link', { name: 'More details' });
    expect(link).toBeInTheDocument();
    userEvent.click(link);
    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${pokemons[0].id}`);
  });

  it('Should render with a Fav svg', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite />);
    const fav = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
    expect(fav).toBeInTheDocument();
    expect(fav).toHaveAttribute('src', '/star-icon.svg');
  });
});
