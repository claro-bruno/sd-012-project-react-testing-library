import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

const { id, name, foundAt, summary } = pokemons[0];

describe('Testes do PokemonDetails.js', () => {
  it('Checa as inf, ao selecionar um Pokémn', () => {
    const { history } = renderWithRouter(<App />);
    history.push(`/pokemons/${id}`);
    const pokeDetails = screen.getByText(`${name} Details`);
    const detailsLink = screen.queryByRole('link', { name: 'More Details' });
    const detailsTitle = screen.getByRole('heading', { name: 'Summary' });
    const pokeSummary = screen.getByText(summary);

    expect(pokeDetails).toBeInTheDocument();
    expect(detailsLink).not.toBeInTheDocument();
    expect(detailsTitle).toBeInTheDocument();
    expect(pokeSummary).toBeInTheDocument();
  });

  it('Checa a seção de mapas', () => {
    const { history } = renderWithRouter(<App />);
    history.push(`/pokemons/${id}`);
    const detailsTitle = screen
      .getByRole('heading', { name: `Game Locations of ${name}` });
    const pokeMap = screen.getAllByRole('img', { name: `${name} location` });

    foundAt.forEach(({ location, map }, index) => {
      const pokeLocation = screen.getByText(location);
      expect(pokeLocation).toBeInTheDocument();

      expect(pokeMap[index]).toHaveAttribute('src', map);
      expect(pokeMap[index]).toHaveAttribute('alt', `${name} location`);
    });

    expect(detailsTitle).toBeInTheDocument();
  });

  it('Checa o favorite da pag details', () => {
    const { history } = renderWithRouter(<App />);
    history.push(`/pokemons/${id}`);

    const pokeCheck = screen.getByRole('checkbox', { name: 'Pokémon favoritado?' });

    expect(pokeCheck).not.toBeChecked();

    fireEvent.click(pokeCheck);

    expect(pokeCheck).toBeChecked();

    fireEvent.click(pokeCheck);

    expect(pokeCheck).not.toBeChecked();
  });
});
