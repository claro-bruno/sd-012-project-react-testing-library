import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import data from '../data';
import renderWithRouter from './renderWithRouter';

const pokemon = data[4];

describe('Testa o componente PokemonDetails', () => {
  it('Testa se Pokemon details esta sendo renderizado corretamente.', () => {
    const { history } = renderWithRouter(<App />);
    history.push(`/pokemons/${pokemon.id}`);
    expect(screen.getByRole('heading', { name: `${pokemon.name} Details` }));

    expect(screen.queryByText('More details')).toBeNull();

    expect(screen.getByRole('heading', { name: 'Summary' }));

    expect(screen.getByText(pokemon.summary)).toBeDefined();
  });

  it('Testa se possui mapas com as localizações', () => {
    const { history } = renderWithRouter(<App />);
    history.push(`/pokemons/${pokemon.id}`);
    expect(screen.getByRole('heading', { name: `Game Locations of ${pokemon.name}` }));

    const locationsLen = screen.getAllByRole('img', { name: `${pokemon.name} location` });
    expect(locationsLen).toHaveLength(pokemon.foundAt.length);

    pokemon.foundAt.forEach((item, index) => {
      const { location, map } = item;
      expect(screen.getByText(location)).toBeDefined();
      const allImage = screen.getAllByRole('img', { name: `${pokemon.name} location` });
      expect(allImage[index]).toHaveProperty('src', map);
    });
  });

  it('Testa se é possivel favoritar um pokemon', () => {
    const { history } = renderWithRouter(<App />);
    history.push(`/pokemons/${pokemon.id}`);

    const check = screen.getByRole('checkbox', { name: 'Pokémon favoritado?' });
    expect(check).toBeDefined();
    userEvent.click(check);

    const altText = `${pokemon.name} is marked as favorite`;
    const favorite = screen.getByRole('img', { name: altText });
    expect(favorite).toBeDefined();
    expect(favorite).toHaveAttribute('src', '/star-icon.svg');

    userEvent.click(check);
    const uncheck = screen.queryByRole('img', { name: altText });
    expect(uncheck).toBeNull();
  });
});
