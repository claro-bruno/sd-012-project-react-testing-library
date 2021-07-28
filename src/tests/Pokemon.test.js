import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import data from '../data';

const pokemonTest = data[0];

describe('render card whit info pokemon', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByRole('link', { name: /more details/i }));
  });
  it('name pokemon', () => {
    screen.getByText(pokemonTest.name);
  });
  it('type pokemon', () => {
    const type = screen.getByTestId('pokemon-type');
    expect(type.textContent).toBe(pokemonTest.type);
  });
  it('Average weight test', () => {
    const averageWeight = screen.getByTestId('pokemon-weight');
    const { value, measurementUnit } = pokemonTest.averageWeight;
    const result = averageWeight.textContent;
    expect(result)
      .toBe(`Average weight: ${value} ${measurementUnit}`);
  });

  it('image pokemon', () => {
    const img = screen.getByRole('img', { name: `${pokemonTest.name} sprite` });
    expect(img.src).toBe(pokemonTest.image);
  });
});

describe('pathname and if the pokemon is favorite', () => {
  it('test the pathname', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByRole('link', { name: /more details/i }));
    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${pokemonTest.id}`);
  });

  it('test favorite', () => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByRole('link', { name: /more details/i }));
    userEvent.click(screen.getByRole('checkbox'));
    const img = screen
      .getByRole('img', { name: `${pokemonTest.name} is marked as favorite` });
    expect(img).toHaveAttribute('src', '/star-icon.svg');
  });
});
