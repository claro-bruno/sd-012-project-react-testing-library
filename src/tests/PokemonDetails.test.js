import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import data from '../data';
import renderWithRouter from './renderWithRouter';

beforeEach(() => {
  renderWithRouter(<App />);

  userEvent.click(screen.getByText('More details'));
});

describe('Verifica componente PokemonDetails', () => {
  const pokeInfo = data[0];
  it('Verifica os detalhes do pokemon', () => {
    expect(screen.getByText(`${pokeInfo.name} Details`)).toBeInTheDocument();
    expect(screen.getByText('Summary')).toBeInTheDocument();
    expect(screen.getByText(`${pokeInfo.summary}`)).toBeInTheDocument();
  });

  it('Verifica se adiciona favoritos', () => {
    const favoriteCheck = screen.getByLabelText('Pokémon favoritado?');
    expect(favoriteCheck).toBeInTheDocument();
    userEvent.click(favoriteCheck);

    const favStar = screen.getByAltText(`${pokeInfo.name} is marked as favorite`);
    expect(favStar).toBeInTheDocument();

    userEvent.click(favoriteCheck);
    expect(favStar).not.toBeInTheDocument();
  });
  it('Verifica se contem a localização dos pokemons', () => {
    const head = screen.getByText(`Game Locations of ${pokeInfo.name}`);
    expect(head).toBeInTheDocument();

    expect(screen.getByText(`${pokeInfo.name} Details`)).toBeInTheDocument();

    const locale = screen.getAllByAltText(`${pokeInfo.name} location`);
    expect(locale.length).toBe(pokeInfo.foundAt.length);

    pokeInfo.foundAt.forEach(({ location }) => {
      expect(screen.getByText(location)).toBeInTheDocument();
    });

    locale.forEach((location, index) => {
      expect(location.src).toBe(pokeInfo.foundAt[index].map);
    });
  });
});
