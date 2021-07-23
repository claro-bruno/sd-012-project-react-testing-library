import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';

describe('Tests Pokemon.js component', () => {
  const pikachu = pokemons[0];
  test('A pokemon card is rendered with correct information', () => {
    renderWithRouter(<App />);
    const { name, type, averageWeight: { value }, image } = pikachu;
    expect(screen.getByTestId('pokemon-name').innerHTML).toBe(name);
    expect(screen.getByTestId('pokemon-type').innerHTML).toBe(type);
    expect(screen.getByTestId('pokemon-weight').innerHTML)
      .toBe(`Average weight: ${value} kg`);
    expect(screen.getByRole('img'))
      .toHaveAttribute('src', image);
    expect(screen.getByRole('img'))
      .toHaveAttribute('alt', `${name} sprite`);
  });
  test('Pokemon card has a link to Pokemon Details', () => {
    const { history } = renderWithRouter(<App />);
    const detailsLink = screen.getByText('More details');
    userEvent.click(detailsLink);
    const url = history.location.pathname;
    expect(url).toBe(`/pokemons/${pikachu.id}`);
  });
  test('There is a star icon on favorite Pokemon', () => {
    const { history } = renderWithRouter(<App />);
    history.push(`/pokemons/${pikachu.id}`);
    const makeFavorite = screen.getByLabelText(/Pokémon favoritado/i);
    userEvent.click(makeFavorite);
    const favIcon = screen.getByAltText(`${pikachu.name} is marked as favorite`);
    expect(favIcon).toBeInTheDocument();
    expect(favIcon).toHaveAttribute('src', '/star-icon.svg');
  });
});
