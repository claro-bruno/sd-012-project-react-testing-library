import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('testa componente PokemonDetails', () => {
  it('testa renderizacao do componente', () => {
    renderWithRouter(<App />);
    const linkDetails = screen.getByRole('link', { name: /More details/i });
    userEvent.click(linkDetails);
    const titleDetails = screen.getByRole('heading', {
      level: 2,
      name: /Pikachu Details/i,
    });
    expect(titleDetails).toBeInTheDocument();
    expect(linkDetails).not.toBeInTheDocument();

    const summary = screen.getByRole('heading', { level: 2, name: /Summary/i });
    expect(summary).toBeInTheDocument();

    const pokeParagraph = screen.getByText(`${pokemons[0].summary}`);
    expect(pokeParagraph).toBeInTheDocument();

    const locations = screen.getByText(/Game Locations of Pikachu/i);
    expect(locations).toBeInTheDocument();

    const locsImgs = screen.getAllByAltText('Pikachu location');
    expect(locsImgs.length).toBe(pokemons[0].foundAt.length);
    locsImgs.forEach((img, i) => {
      expect(img).toHaveAttribute('src', pokemons[0].foundAt[i].map);
    });

    pokemons[0].foundAt.forEach((loc) => {
      const locName = screen.getByText(loc.location);
      expect(locName).toBeInTheDocument();
    });
  });

  it('testa opcao de favoritar', () => {
    renderWithRouter(<App />);
    const linkDetails = screen.getByRole('link', { name: /More details/i });
    userEvent.click(linkDetails);
    const favCheck = screen.getByLabelText(/Pokémon favoritado?/i);
    expect(favCheck).toBeInTheDocument();
  });
});
