import React from 'react';
import { screen } from '@testing-library/react';
import event from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import data from '../data';
import App from '../App';

describe('Testando o componente PokemonDetails.js', () => {
  const poke = data[0];
  test('Verifica as informaçoes do card do pokemon', () => {
    renderWithRouter(<App />);
    const { id, name, summary, foundAt } = poke;

    const pokemonLinkDetails = screen.getByRole('link', { name: /More Details/i });
    expect(pokemonLinkDetails.pathname).toBe(`/pokemons/${id}`);

    event.click(pokemonLinkDetails);

    const pokeName = screen.getByRole('heading', { name: `${name} Details`, level: 2 });
    expect(pokeName).toBeInTheDocument();

    const pokeSummary = screen.getByRole('heading', { name: /Summary/i, level: 2 });
    expect(pokeSummary).toBeInTheDocument();

    const pokeDescriptionSummary = screen.getByText(summary);
    expect(pokeDescriptionSummary).toBeInTheDocument();

    const pokemonLinkDetailsIn = screen.queryByRole('link', { name: /More Details/i });
    expect(pokemonLinkDetailsIn).not.toBeInTheDocument();

    const headLocation = screen.getByRole('heading',
      { name: `Game Locations of ${name}`, level: 2 });
    expect(headLocation).toBeInTheDocument();

    foundAt.forEach(({ location, map }) => {
      expect(screen.getByText(location)).toBeInTheDocument();
      const imgsMaps = screen.getAllByRole('img');
      const rstFilter = imgsMaps.filter((mapa) => mapa.src === map);
      expect(rstFilter[0]).toHaveAttribute('alt', `${name} location`);
      expect(rstFilter.length).toBe(1);
    });

    const pokeFavoriteCheck = screen.getByRole('checkbox',
      { name: /Pokémon favoritado?/i });
    expect(pokeFavoriteCheck).toBeInTheDocument();
    expect(pokeFavoriteCheck).not.toBeChecked();

    event.click(pokeFavoriteCheck);
    const pokemonImage = screen.getAllByRole('img');
    expect(pokemonImage[1]).toHaveAttribute('src', '/star-icon.svg');
    expect(pokemonImage[1]).toHaveAttribute('alt', `${name} is marked as favorite`);
    expect(pokeFavoriteCheck).toBeChecked();

    event.click(pokeFavoriteCheck);
    expect(pokeFavoriteCheck).not.toBeChecked();
  });
});
