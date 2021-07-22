import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testa todo PokemonDetails.js', () => {
  const getPokemonId = (pathname) => parseInt((pathname).split('/pokemons/')[1], 10);

  it('renderiza as info do pokemon', () => {
    const { history } = renderWithRouter(<App />);

    let linkDetails = screen.getByText(/More details/i);
    expect(linkDetails).toBeInTheDocument();
    userEvent.click(linkDetails);

    const { pathname } = history.location;
    const pkmId = getPokemonId(pathname);
    const pokemon = pokemons.find((pkm) => pkm.id === pkmId);

    const heading = screen.getByRole('heading', { name: `${pokemon.name} Details` });
    expect(heading).toBeInTheDocument();

    linkDetails = screen.queryByText(/More Details/i);
    expect(linkDetails).not.toBeInTheDocument();

    const summaryHeading = screen.getByRole('heading', { name: /Summary/i });
    expect(summaryHeading).toBeInTheDocument();

    const summaryText = screen.getByText(pokemon.summary);
    expect(summaryText).toBeInTheDocument();
  });

  it('renderiza as localização do pokemon', () => {
    const { history } = renderWithRouter(<App />);

    const linkDetails = screen.getByText(/More details/i);
    userEvent.click(linkDetails);

    const { pathname } = history.location;
    const pokemon = pokemons.find((pkm) => pkm.id === getPokemonId(pathname));

    const locationHeading = screen
      .getByRole('heading', { name: `Game Locations of ${pokemon.name}` });
    expect(locationHeading).toBeInTheDocument();

    const locationImages = screen.getAllByRole('img', { name: 'Pikachu location' });

    pokemon.foundAt.forEach(({ location, map }, index) => {
      const locationText = screen.getByText(location);
      expect(locationText).toBeInTheDocument();

      expect(locationImages[index]).toHaveAttribute('src', map);
      expect(locationImages[index]).toHaveProperty('alt', `${pokemon.name} location`);
    });
  });
});
