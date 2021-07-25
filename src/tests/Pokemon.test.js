import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../rota/renderWithRoute';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

const numberPokemons = pokemons[8];

describe('Testa Pokemon.js', () => {
  it('Testa card pokemon', () => {
    renderWithRouter(<Pokemon
      pokemon={ numberPokemons }
      showDetailsLink
      isFavorite={ false }
    />);

    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeigh = screen.getByTestId('pokemon-weight');
    const { value, measurementUnit } = numberPokemons.averageWeight;
    const pokemonImg = screen.getByAltText(`${numberPokemons.name} sprite`);
    const detailsLink = screen.getByText(/more details/i);
    const imageURL = 'https://cdn2.bulbagarden.net/upload/2/2c/Spr_5b_148.png';

    expect(pokemonName).toHaveTextContent(numberPokemons.name);
    expect(pokemonType).toHaveTextContent(numberPokemons.type);
    expect(pokemonWeigh).toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);
    expect(pokemonImg.src).toBe(imageURL);
    expect(detailsLink).toBeInTheDocument();
  });

  it('Testa Details link', () => {
    const { history } = renderWithRouter(<Pokemon
      pokemon={ numberPokemons }
      showDetailsLink
      isFavorite={ false }
    />);

    const detailsLink = screen.getByText(/more details/i);
    expect(history.location.pathname).toBe('/');
    userEvent.click(detailsLink);
    expect(history.location.pathname).toBe(`/pokemons/${numberPokemons.id}`);
  });

  it('Testa Icone Estrela', () => {
    renderWithRouter(<Pokemon
      pokemon={ numberPokemons }
      showDetailsLink
      isFavorite
    />);

    const img = screen.getByAltText(`${numberPokemons.name} is marked as favorite`);
    expect(img).toBeInTheDocument();
    expect(img.src).toBe('http://localhost/star-icon.svg');
  });
});
