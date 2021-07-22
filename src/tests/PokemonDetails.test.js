import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import pokemons from '../data';
import App from '../App';

describe('Requisito 7 - Teste o componente <PokemonDetails.js /> ', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
    const detailsLink = screen.getByText('More details');
    userEvent.click(detailsLink);
  });
  it('Testa se é mostrado as informações corretas de um pokemon', () => {
    expect(screen.getByText(`${pokemons[0].name} Details`)).toBeDefined();
    // expect(screen.getByText('More details')).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Summary' })).toBeDefined();
    expect(screen.getByText(/This intelligent Pokémon roasts/)).toBeDefined();
  });
  it('Testa se existe os mapas com as localizações do pokémon', () => {
    const { foundAt } = pokemons[0];
    const mapsTitle = screen.getByText(`Game Locations of ${pokemons[0].name}`);
    expect(mapsTitle).toBeDefined();
    const locations = screen.getAllByAltText(/location/i);
    expect(locations.length).toBe(foundAt.length);
    foundAt.forEach((location, i) => {
      expect(screen.getByText(location.location)).toBeDefined();
      expect(screen.getAllByAltText(`${pokemons[0].name} location`)[i].src)
        .toBe(foundAt[i].map);
      expect(screen.getAllByAltText(`${pokemons[0].name} location`)[i].alt)
        .toBe(`${pokemons[0].name} location`);
    });
  });
  it('Testa se o usuário pode favoritar um pokemon em PokemonDetails', () => {
    const favoriteCheck = screen.getByLabelText('Pokémon favoritado?');
    userEvent.click(favoriteCheck);
    const favStar = screen.getByAltText(`${pokemons[0].name} is marked as favorite`);
    expect(favStar.src).toBe('http://localhost/star-icon.svg');
    userEvent.click(favoriteCheck);
    expect(favStar).not.toBeInTheDocument();
    expect(screen.getByLabelText('Pokémon favoritado?')).toBeDefined();
  });
});
