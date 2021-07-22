import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import Pokemon from '../components/Pokemon';
import pokemonsData from '../data';

describe('Testa do Pokemon.js', () => {
  it('renderiza um card', () => {
    const isFavoriteEShowLink = true;
    renderWithRouter(<Pokemon
      pokemon={ pokemonsData[0] }
      isFavorite={ isFavoriteEShowLink }
      showDetailsLink={ isFavoriteEShowLink }
    />);

    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toHaveTextContent(pokemonsData[0].name);
    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toHaveTextContent(pokemonsData[0].type);
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    const { value, measurementUnit } = pokemonsData[0].averageWeight;
    expect(pokemonWeight)
      .toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);

    const pkmImages = screen.getAllByRole('img');
    expect(pkmImages[0]).toHaveAttribute('src', pokemonsData[0].image);
    expect(pkmImages[0]).toHaveAttribute('alt', `${pokemonsData[0].name} sprite`);

    const detailsLink = screen.getByRole('link');
    expect(detailsLink).toHaveAttribute('href', `/pokemons/${pokemonsData[0].id}`);

    expect(pkmImages[1]).toHaveAttribute('src', '/star-icon.svg');
    expect(pkmImages[1])
      .toHaveAttribute('alt', `${pokemonsData[0].name} is marked as favorite`);
  });

  it('link "More details" leva até a página correta', () => {
    const { history } = renderWithRouter(<App />);

    expect(history.location.pathname).toBe('/');

    const linkDetails = screen.getByText(/More details/i);
    expect(linkDetails).toBeInTheDocument();

    userEvent.click(linkDetails);

    const title = screen
      .getByRole('heading', { name: `${pokemonsData[0].name} Details` });
    expect(title).toBeInTheDocument();

    expect(history.location.pathname).toBe(`/pokemons/${pokemonsData[0].id}`);
  });
});
