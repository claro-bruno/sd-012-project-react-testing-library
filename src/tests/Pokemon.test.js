import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

const pokemon = pokemons[8];
const { averageWeight, id, image, name, type } = pokemon;
const { measurementUnit, value } = averageWeight;

function renderWithRouter(
  ui,
  { route = '/', history = createMemoryHistory({ initialEntries: [route] }) } = {},
) {
  return {
    ...render(<Router history={ history }>{ui}</Router>),
    history,
  };
}

describe(' Testa o componente <Pokemon.js />', () => {
  test('Testa se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(
      <Pokemon
        pokemon={ pokemon }
        showDetailsLink
        isFavorite
      />,
    );
    expect(screen.getByTestId('pokemon-name')).toHaveTextContent(name);
    expect(screen.getByTestId('pokemon-type')).toHaveTextContent(type);

    const average = `Average weight: ${value} ${measurementUnit}`;
    expect(screen.getByTestId('pokemon-weight')).toHaveTextContent(average);

    const altTextImg = `${name} sprite`;
    const pokemonImg = screen.getByRole('img', { name: altTextImg });
    expect(pokemonImg).toHaveAttribute('src', image);
    expect(pokemonImg).toHaveAttribute('alt', altTextImg);
  });
  test('Testa se o card possui link para exibir detalhes', () => {
    renderWithRouter(
      <Pokemon
        pokemon={ pokemon }
        showDetailsLink
        isFavorite
      />,
    );
    const urlDetails = `/pokemons/${id}`;
    const buttonDetails = screen.getByRole('link', { name: 'More details' });
    expect(buttonDetails.pathname).toBe(urlDetails);
  });
  test('Testa se é redirecionado para mais detalhes ao clicar no link', () => {
    const {
      history,
    } = renderWithRouter(<Pokemon pokemon={ pokemon } showDetailsLink isFavorite />);

    const urlDetails = `/pokemons/${id}`;
    const buttonDetails = screen.getByRole('link', { name: 'More details' });
    fireEvent.click(buttonDetails);
    const { pathname } = history.location;
    expect(pathname).toBe(urlDetails);
  });
  test('Testa se existe um icone de estrela nos pokemons favoritados', () => {
    renderWithRouter(
      <Pokemon
        pokemon={ pokemon }
        showDetailsLink
        isFavorite
      />,
    );
    const starAltText = `${name} is marked as favorite`;
    const starSrc = '/star-icon.svg';
    const starImg = screen.getByAltText(starAltText);
    expect(starImg).toHaveAttribute('alt', starAltText);
    expect(starImg).toHaveAttribute('src', starSrc);
  });
});
