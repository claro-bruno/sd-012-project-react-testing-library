import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testa componente PokemonDetails', () => {
  test('Testa conteúdo de PokemonDetails', () => {
    const { history } = renderWithRouter(<App />);
    const detailsButton = screen.getByRole('link', { name: 'More details' });
    const { name, id, summary, foundAt } = pokemons[0];
    fireEvent.click(detailsButton);
    const pokemonDetails = screen.getByText(`${name} Details`);
    const detailsHeading = screen.getByRole('heading', { name: 'Summary', level: 2 });
    const locationHeading = screen
      .getByRole('heading', { name: `Game Locations of ${name}`, level: 2 });
    const summ = screen.getByText(summary);
    expect(pokemonDetails).toBeInTheDocument();
    expect(detailsButton).not.toBeInTheDocument();
    expect(detailsHeading).toBeInTheDocument();
    expect(summ).toBeInTheDocument();
    expect(locationHeading).toBeInTheDocument();
    foundAt.forEach((locc) => {
      const location = screen.getByText(locc.location);
      const locationMap = screen.getAllByAltText(`${name} location`)
        .find((map) => map.src === locc.map);
      expect(location).toBeInTheDocument();
      expect(locationMap).toBeInTheDocument();
    });
    expect(history.location.pathname).toBe(`/pokemons/${id}`);
  });

  test('Testa checkbox pokemon favorito', () => {
    renderWithRouter(<App />);
    const detailsButton = screen.getByRole('link', { name: 'More details' });
    fireEvent.click(detailsButton);
    const checkbox = screen.getByLabelText('Pokémon favoritado?');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox.type).toBe('checkbox');
    expect(checkbox.checked).toBe(false);
    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(true);
    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(false);
  });
});
