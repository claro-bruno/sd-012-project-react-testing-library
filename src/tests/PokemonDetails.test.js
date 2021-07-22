import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('7. Teste o componente <PokemonDetails.js />', () => {
  it('Teste se as informações detalhadas do Pokémon são mostradas na tela.', () => {
    renderWithRouter(<App />);
    fireEvent.click(screen.getByRole('link', { name: /More Details/i }));

    const heading = screen.getByText(/summary/i);
    expect(heading).toBeInTheDocument();

    const summary = screen.getByText(/th/i);
    expect(summary).toBeInTheDocument();

    const pokemonName = screen.getByTestId('pokemon-name').innerHTML;
    const detailsHeading = screen.getByText(`${pokemonName} Details`);
    expect(detailsHeading).toBeInTheDocument();
  });
  it('Teste se existe na página mapas contendo as localizações do pokémon', () => {
    renderWithRouter(<App />);
    fireEvent.click(screen.getByRole('link', { name: /More Details/i }));

    const pokemonName = screen.getByTestId('pokemon-name').innerHTML;
    const map = screen.getAllByRole('img')[2];
    expect(map.src).toMatch(/bulbagarden/);
    expect(map.alt).toBe(`${pokemonName} location`);

    const locations = screen.getByText(`Game Locations of ${pokemonName}`);
    expect(locations).toBeInTheDocument();
  });
  it('Teste se o usuário pode favoritar um pokémon na página de detalhes.', () => {
    renderWithRouter(<App />);
    fireEvent.click(screen.getByRole('link', { name: /More Details/i }));

    const favoriteQuery = screen.getByLabelText(/Pokémon favoritado?/i);
    expect(favoriteQuery).toBeInTheDocument();
  });
});
