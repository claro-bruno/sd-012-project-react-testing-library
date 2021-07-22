import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RenderWithRouter from './helpers/RenderWithRouter';

import Pokedex from '../components/Pokedex';
import data from '../data';

const isPokemonFavoriteById = {
  4: false,
  10: false,
  23: false,
  25: true,
  65: false,
  78: false,
  143: false,
  148: false,
  151: false,
};

const pokemonTypes = [];
data.forEach((current) => {
  const alreadyExists = pokemonTypes.find((element) => element === current.type);
  if (!alreadyExists) {
    pokemonTypes.push(current.type);
  }
});

const detailsLink = () => screen.getByRole('link', { name: 'More details' });

describe('Testa o componente Pokemon', () => {
  test('Verifica se renderiza o card do pokemon', () => {
    RenderWithRouter(<Pokedex
      pokemons={ data }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);

    const { name, id, type, averageWeight, image } = data[0];
    const { value, measurementUnit } = averageWeight;
    const pokemonNameArea = screen.getByTestId('pokemon-name');
    expect(pokemonNameArea).toBeInTheDocument();
    expect(pokemonNameArea).toHaveTextContent(name);

    const pokemonTypeArea = screen.getByTestId('pokemon-type');
    expect(pokemonTypeArea).toBeInTheDocument();
    expect(pokemonTypeArea).toHaveTextContent(type);

    const pokemonWeightArea = screen.getByTestId('pokemon-weight');
    const message = `Average weight: ${value} ${measurementUnit}`;
    expect(pokemonWeightArea).toBeInTheDocument();
    expect(pokemonWeightArea).toHaveTextContent(message);

    const imageArea = screen.getByAltText(`${name} sprite`);
    expect(imageArea).toBeInTheDocument();
    expect(imageArea).toHaveAttribute('src', image);

    expect(detailsLink()).toBeInTheDocument();
    expect(detailsLink()).toHaveAttribute('href', `/pokemons/${id}`);
  });

  test('Verifica o redirecionamento', () => {
    const { history } = RenderWithRouter(<Pokedex
      pokemons={ data }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);

    const { id } = data[0];

    userEvent.click(detailsLink());
    expect(history.location.pathname).toBe(`/pokemons/${id}`);
  });

  test('Verifica se existe a estrela de pokemon favorito', () => {
    RenderWithRouter(<Pokedex
      pokemons={ data }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);

    const { name } = data[0];

    userEvent.click(detailsLink());

    const starImage = screen.getByAltText(`${name} is marked as favorite`);

    expect(starImage).toBeInTheDocument();
    expect(starImage).toHaveAttribute('src', '/star-icon.svg');
  });
});
