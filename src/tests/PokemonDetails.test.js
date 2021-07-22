/* eslint-disable no-magic-numbers */
import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';

import App from '../App';
import pokemons from '../data';

const { id, name, summary, foundAt } = pokemons[5];

describe('PokemonDetails tests', () => {
  it('PokemonDetails page test', () => {
    const { history } = renderWithRouter(<App />);
    history.push(`/pokemons/${id}`);

    const subtitle = screen.getByText(`${name} Details`);
    const summaryTitle = screen.queryByRole('heading', { name: /summary/i });
    const summaryText = screen.getByText(/apparently, it appears only/i);
    const detailLink = screen.queryByRole('link', { name: /more details/i });

    expect(subtitle).toBeInTheDocument();
    expect(summaryTitle).toBeInTheDocument();
    expect(summaryText).toHaveTextContent(summary);
    expect(detailLink).toBeNull();
  });

  it('Map section test', () => {
    const { history } = renderWithRouter(<App />);
    history.push(`/pokemons/${id}`);

    const subtitle = screen.getByText(`Game Locations of ${name}`);
    const mapImage = screen
      .queryByRole('img', { name: `${name} location` });
    const locationName = screen.getByText(foundAt[0].location);

    expect(subtitle).toBeInTheDocument();
    expect(mapImage).toHaveAttribute('src', foundAt[0].map);
    expect(locationName).toBeInTheDocument();
  });

  it('Favorited pokémon', () => {
    const { history } = renderWithRouter(<App />);
    history.push(`/pokemons/${id}`);

    const checkbox = screen.getByLabelText(/pokémon favoritado?/i);

    expect(checkbox).toBeInTheDocument();
    expect(screen.queryByAltText(`${name} is marked as favorite`))
      .toBeNull();

    userEvent.click(checkbox);

    expect(screen.queryByAltText(`${name} is marked as favorite`))
      .toBeInTheDocument(); // 100% mutants;

    userEvent.click(checkbox);
    expect(screen.queryByAltText(`${name} is marked as favorite`))
      .toBeNull();
  });
});
