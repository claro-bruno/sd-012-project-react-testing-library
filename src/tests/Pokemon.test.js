import React from 'react';
import { screen } from '@testing-library/react';
// import MutationObserver from '@sheerun/mutationobserver-shim';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import pokemons from '../data';
import Pokemon from '../components/Pokemon';
import App from '../App';

// window.MutationObserver = MutationObserver;

describe('Requisito 6 - Teste o componente <Pokemon.js /> ', () => {
  // beforeEach(() => renderWithRouter(<Pokemon
  //   pokemon={ pokemons[0] }
  //   isFavorite={ false }
  // />));
  it('Testa se é renderizado o card com as informações corretas do Pokémon', () => {
    renderWithRouter(<Pokemon
      pokemon={ pokemons[0] }
      isFavorite={ false }
    />);
    const { name, type, averageWeight, image } = pokemons[0];
    const { value, measurementUnit: unit } = averageWeight;
    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    const pokemonImage = screen.getByRole('img');

    expect(pokemonName).toHaveTextContent(name);
    expect(pokemonType).toHaveTextContent(type);
    expect(pokemonWeight).toHaveTextContent(`Average weight: ${value} ${unit}`);
    expect(pokemonImage.src).toBe(image);
    expect(pokemonImage.alt).toBe(`${name} sprite`);
  });

  it('Testa link "More Details"', async () => {
    const { history } = renderWithRouter(<App />);
    const detailsLink = screen.getByText('More details');
    const { id } = pokemons[0];
    expect(detailsLink.href).toBe(`http://localhost/pokemons/${id}`);
    userEvent.click(detailsLink);
    const { pathname } = history.location;
    const detailsTitle = screen
      .getByRole('heading', { name: `${pokemons[0].name} Details` });
    expect(detailsTitle).toBeDefined();
    expect(pathname).toBe(`/pokemons/${id}`);
  });

  it('Testa se existe ícone nos pokémons favoritados', async () => {
    const { id } = pokemons[0];
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByText('More details'));
    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${id}`);
    const favoriteCheck = screen.getByLabelText('Pokémon favoritado?');
    userEvent.click(favoriteCheck);
    const favStar = screen.getByAltText(`${pokemons[0].name} is marked as favorite`);
    expect(favStar.src).toBe('http://localhost/star-icon.svg');
    userEvent.click(favoriteCheck);
    expect(favStar).not.toBeInTheDocument();
  });
});
