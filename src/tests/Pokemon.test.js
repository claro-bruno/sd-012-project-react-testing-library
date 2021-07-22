import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testa Pokemon.js', () => {
  it('Existe o name do primeiro pokemon da lista na tela', () => {
    renderWithRouter(<App />);
    const { name } = pokemons[0];

    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toHaveTextContent(name);
  });

  it('Existe o type do primeiro pokemon da lista na tela', () => {
    renderWithRouter(<App />);
    const { type } = pokemons[0];

    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toHaveTextContent(type);
  });

  it('Existe o weight do primeiro pokemon da lista na tela', () => {
    renderWithRouter(<App />);
    const { averageWeight: { value, measurementUnit } } = pokemons[0];

    const pokemonWeight = screen.getByTestId('pokemon-weight');
    expect(pokemonWeight)
      .toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);
  });

  it('Existe a imagem do primeiro pokemon da lista na tela', () => {
    renderWithRouter(<App />);
    const { name, image } = pokemons[0];

    const pokemonImageAlt = screen.getByAltText(`${name} sprite`);
    expect(pokemonImageAlt.src).toBe(`${image}`);
    expect(pokemonImageAlt).toBeDefined();
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
