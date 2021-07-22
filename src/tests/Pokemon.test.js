import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testa Pokemon.js', () => {
  it('Testa render de name/type/weight/imagem cada pokemon', () => {
    renderWithRouter(<App />);

    pokemons.forEach((pokemon) => {
      const { name, type, image, averageWeight: { value, measurementUnit } } = pokemon;

      const pokemonName = screen.getByTestId('pokemon-name');
      const pokemonType = screen.getByTestId('pokemon-type');
      const pokemonWeight = screen.getByTestId('pokemon-weight');
      const pokemonImageAlt = screen.getByAltText(`${name} sprite`);

      expect(pokemonName).toHaveTextContent(name);
      expect(pokemonType).toHaveTextContent(type);
      expect(pokemonWeight)
        .toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);

      expect(pokemonImageAlt.src).toBe(`${image}`);
      expect(pokemonImageAlt).toBeDefined();

      const buttonNext = screen.getByRole('button', { name: /Próximo pokémon/ });

      userEvent.click(buttonNext);
    });
  });

  it('testa link "More details" e checkbox "Pokémon favoritado?"', () => {
    const { history } = renderWithRouter(<App />);

    const { name, id } = pokemons[0];

    const linkDetails = screen.getByRole('link', { name: /More details/ });
    expect(linkDetails).toBeDefined();

    userEvent.click(linkDetails);

    const { location: { pathname } } = history;
    expect(pathname).toBe(`/pokemons/${id}`);

    const FavoritePokemon = screen.getByLabelText('Pokémon favoritado?');
    userEvent.click(FavoritePokemon);

    const linkHome = screen.getByRole('link', { name: 'Home' });
    userEvent.click(linkHome);

    const favoreiteImageAlt = screen.getByAltText(`${name} is marked as favorite`);
    expect(favoreiteImageAlt.src).toContain('/star-icon.svg');
    expect(favoreiteImageAlt).toBeDefined();

    const buttonNext = screen.getByRole('button', { name: /Próximo pokémon/ });
    userEvent.click(buttonNext);
  });
});
