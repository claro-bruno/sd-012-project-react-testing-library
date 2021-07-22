import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testa informações do componente PokemonDetails.js', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByRole('link', { name: /More details/i }));
  });

  it('Testa se as informações detalhadas do Pokémon são mostradas na tela', () => {
    const { name, summary } = pokemons[0];
    const pokemonHeading = screen.getByRole('heading', { name: `${name} Details` });
    expect(pokemonHeading.localName).toBe('h2');

    const link = screen.queryByRole('link', { name: /More details/i });
    expect(link).not.toBeInTheDocument();

    const summaryHeading = screen.getByRole('heading', { name: /Summary/i });
    expect(summaryHeading.localName).toBe('h2');

    const summaryParagraph = screen.getByText(summary);
    expect(summaryParagraph).toBeInTheDocument();
    expect(summaryParagraph.localName).toBe('p');
  });

  it('Testa se existem mapas com localização do pokemon', () => {
    const { name, foundAt } = pokemons[0];
    const locations = screen.getByRole('heading', { name: `Game Locations of ${name}` });
    expect(locations.localName).toBe('h2');

    const images = screen.getAllByAltText(`${name} location`);

    foundAt.forEach(({ location, map }, index) => {
      expect(screen.getByText(location)).toBeInTheDocument();
      expect(images[index]).toHaveProperty('src', map);
    });
  });

  it('Testa se  usuário pode favoritar um pokémon através da página de detalhes', () => {
    const { name } = pokemons[0];
    const checkbox = screen.getByLabelText(/Pokémon favoritado?/i);
    userEvent.click(checkbox);

    const altImg = `${name} is marked as favorite`;
    expect(screen.getByAltText(altImg)).toBeInTheDocument();

    userEvent.click(checkbox);
    expect(screen.queryByAltText(altImg)).not.toBeInTheDocument();
  });
});
