import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import pokemons from '../data';
import renderWithRouter from '../renderWithRouter';

describe('Tests PokemonDetails component', () => {
  const pikachu = pokemons[0];
  const { name } = pikachu;
  const url = '/pokemons/25';

  test('Chosen Pokemon detailed info is shown', () => {
    const { history } = renderWithRouter(<App />);
    history.push(url);
    const pikachuDetails = screen.getByText(`${name} Details`);
    expect(pikachuDetails).toBeInTheDocument();
    const moreDetails = screen.queryByRole('link', { name: 'More details' });
    expect(moreDetails).toBe(null);
    const summary = screen.getByRole('heading', { name: 'Summary' });
    expect(summary).toBeInTheDocument();
    const textDescription = 'This intelligent Pokémon roasts hard berries '
      + 'with electricity to make them tender enough to eat.';
    expect(screen.getByText(textDescription)).toBeInTheDocument();
  });
  test('The page has a map section showing Pokemon location', () => {
    const { history } = renderWithRouter(<App />);
    const { foundAt } = pikachu;
    history.push(url);
    const h2 = screen.getByRole('heading', { name: `Game Locations of ${name}` });
    expect(h2).toBeInTheDocument();
    const images = screen.getAllByAltText(`${name} location`);
    foundAt.forEach((loc, index) => {
      const { map } = loc;
      expect(images[index]).toHaveAttribute('src', map);
    });
    expect(images.length).toBe(foundAt.length);
  });
  test('A pokemon can be marked as favorite', () => {
    const { history } = renderWithRouter(<App />);
    history.push(url);
    const makeFavorite = screen.getByLabelText('Pokémon favoritado?');
    expect(makeFavorite.type).toBe('checkbox');
    userEvent.click(makeFavorite);
    let favIcon = screen.queryByAltText(`${pikachu.name} is marked as favorite`);
    expect(favIcon).toBeInTheDocument();
    userEvent.click(makeFavorite);
    favIcon = screen.queryByAltText(`${pikachu.name} is marked as favorite`);
    expect(favIcon).toBe(null);
  });
});
