import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

describe('Testa PokemonDetails', () => {
  test('Testa se o conteúdo correto aparece', () => {
    const { history } = renderWithRouter(<App />);
    const { id, name, summary, foundAt } = pokemons[0];
    const detailsBtn = screen.getByRole('link', { name: 'More details' });
    expect(detailsBtn).toBeInTheDocument();
    fireEvent.click(detailsBtn);
    expect(history.location.pathname).toBe(`/pokemons/${id}`);
    const pokemonDetails = screen.getByText(`${name} Details`);
    expect(pokemonDetails).toBeInTheDocument();
    expect(detailsBtn).not.toBeInTheDocument();
    const summaryH2 = screen.getByRole('heading', { name: 'Summary' });
    expect(summaryH2).toBeInTheDocument();
    const summaryP = screen.getByText(summary);
    expect(summaryP).toBeInTheDocument();
    const gameLocationsH2 = screen
      .getByRole('heading', { name: `Game Locations of ${name}` });
    expect(gameLocationsH2).toBeInTheDocument();
    const images = screen.getAllByAltText(`${name} location`);
    expect(images).toHaveLength(foundAt.length);
    foundAt.forEach((spot) => {
      const { location, map } = spot;
      expect(screen.getByText(location)).toBeInTheDocument();
      const image = images.find((img) => img.src === map);
      expect(image).toBeInTheDocument();
    });
  });

  test('Testa favoritar', () => {
    renderWithRouter(<App />);
    const detailsBtn = screen.getByRole('link', { name: 'More details' });
    fireEvent.click(detailsBtn);
    const check = screen.getByLabelText('Pokémon favoritado?');
    expect(check).toBeInTheDocument();
    expect(check.type).toBe('checkbox');
  });
});
