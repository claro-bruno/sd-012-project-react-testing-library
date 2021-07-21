import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

const pikachu = pokemons[0];
const LOCATIONS_TITLE = `Game Locations of ${pikachu.name}`;
const LOCATION_URL = pikachu.foundAt[0].map;
const LOCATION_ALT = `${pikachu.name} location`;

describe('Testando se o PokemonDetails.js', () => {
  it('exibe as informações detalhadas do pokemon', () => {
    renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(detailsLink);

    expect(screen.getByRole('heading', { name: /pikachu details/i })).toBeInTheDocument();
    expect(detailsLink).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /summary/i })).toBeInTheDocument();
    expect(screen.getByText(pikachu.summary)).toBeInTheDocument();
  });

  it('exibe os mapas contendo as localizações do pokemon', () => {
    renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(detailsLink);

    expect(screen.getByRole('heading', { name: LOCATIONS_TITLE })).toBeInTheDocument();

    const locationImages = screen.getAllByAltText('Pikachu location');
    expect(locationImages).toHaveLength(pikachu.foundAt.length);
    expect(locationImages[0]).toHaveAttribute('src', expect.stringMatching(LOCATION_URL));
    expect(locationImages[0]).toHaveAttribute('alt', expect.stringMatching(LOCATION_ALT));
  });

  it('permite favoritar o pokemon', () => {
    renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(detailsLink);

    userEvent.click(screen.getByLabelText(/pokémon favoritado?/i));

    const favoriteIcon = screen.getByAltText('Pikachu is marked as favorite');
    expect(favoriteIcon).toBeInTheDocument();

    userEvent.click(screen.getByLabelText(/pokémon favoritado?/i));
    expect(favoriteIcon).not.toBeInTheDocument();
  });
});
