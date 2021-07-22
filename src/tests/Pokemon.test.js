import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderwithRouter';

describe('Testing component Pokemon.js', () => {
  it('verify informantion about pokemons its ri', () => {
    renderWithRouter(<App />);
    const url = 'https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png';
    const clickFireButton = screen.getByRole('button', { name: /fire/i });
    userEvent.click(clickFireButton);
    const getNamePokemon = screen.getByTestId(/pokemon-name/i);
    expect(getNamePokemon).toHaveTextContent(/charmander/i);
    const getType = screen.getByTestId('pokemon-type');
    expect(getType).toHaveTextContent('Fire');
    const value = 8.5;
    const unit = 'kg';
    const getAverageWeigth = screen.getByTestId(/pokemon-weight/i);
    expect(getAverageWeigth).toHaveTextContent(`Average weight: ${value} ${unit}`);
    const getImage = screen.getByAltText(/charmander sprite/i);
    expect(getImage).toHaveAttribute('src', url);
  });

  it('verify card has a link to details of the pokemon', () => {
    const { history } = renderWithRouter(<App />);
    const linkToDetails = screen.getByRole('link', { name: 'More details' });
    expect(linkToDetails).toBeInTheDocument();
    userEvent.click(linkToDetails);
    expect(history.location.pathname).toBe('/pokemons/25');
  });

  it('verify pokemons favorites has a star icon', () => {
    renderWithRouter(<App />);
    const clickDetails = screen.getByText(/more details/i);
    userEvent.click(clickDetails);

    const clickFavorite = screen.getByText(/pokémon favoritado?/i);
    userEvent.click(clickFavorite);
    const verifyFavorite = screen.getByAltText('Pikachu is marked as favorite');
    expect(verifyFavorite).toHaveAttribute('src', '/star-icon.svg');
  });
});
