import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import data from '../data';

const pokemonTest = data[0];

describe('test details', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByRole('link', { name: /more details/i }));
  });

  it('heading test', () => {
    const titles = screen.getAllByRole('heading');
    expect(titles[1].textContent).toBe(`${pokemonTest.name} Details`);
    expect(titles[2].textContent).toBe('Summary');
    expect(titles[2].tagName).toBe('H2');
    expect(titles[3].tagName).toBe('H2');
    expect(titles[3].textContent).toBe(`Game Locations of ${pokemonTest.name}`);
  });

  it('without link to details', () => {
    const testLink = screen.queryByRole('link', { name: /more datails/i });
    expect(testLink).not.toBeInTheDocument();
  });

  it('summary pokemon', () => {
    const test = screen.getByText(pokemonTest.summary);
    expect(test.tagName).toBe('P');
  });
  it('find', () => {
    const imgLocation = screen
      .getAllByRole('img', { name: `${pokemonTest.name} location` });
    expect(imgLocation).toHaveLength(pokemonTest.foundAt.length);
    const pokeLocaction = pokemonTest.foundAt;
    pokeLocaction.forEach((local, index) => {
      screen.getByText(local.location);
      expect(imgLocation[index].src).toBe(local.map);
    });
  });

  it('pokemon favorite?', () => {
    userEvent.click(screen.getByRole('checkbox', { name: 'Pokémon favoritado?' }));
    const img = screen
      .getByRole('img', { name: `${pokemonTest.name} is marked as favorite` });
    userEvent.click(screen.getByRole('checkbox', { name: 'Pokémon favoritado?' }));
    expect(img).not.toBeInTheDocument();
  });
});
