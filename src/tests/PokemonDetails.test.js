import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../etc/renderWithRouter';

describe('PokemonDetails.js', () => {
  it('Detalhes', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /More details/i });
    expect(moreDetails).toBeInTheDocument();
    userEvent.click(moreDetails);
    const name = screen.getByText(/Pikachu Details/i);
    expect(name).toBeInTheDocument();
    expect(moreDetails).not.toBeInTheDocument();
    const summary = screen.getByRole('heading',
      { name: /Summary/i, level: 2 });
    expect(summary).toBeInTheDocument();
    const p = screen.getByText(/This intelligent Pokémon roasts hard/i);
    expect(p).toBeInTheDocument();
  });

  it('Mapas', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /More details/i });
    userEvent.click(moreDetails);
    const locations = screen.getByRole('heading',
      { name: /Game Locations of Pikachu/i, level: 2 });
    expect(locations).toBeInTheDocument();
    const allLocations = screen.getAllByRole('img', { name: 'Pikachu location' });
    expect(allLocations.length).toBe(2);
    expect(allLocations[0]).toHaveProperty(
      'src',
      'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
    );
    expect(allLocations[1]).toHaveProperty(
      'src',
      'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
    );
    const locationsNames = screen.getByText(
      /Kanto Viridian Forest/i,
      /Kanto Power Plant/i,
    );
    expect(locationsNames).toBeInTheDocument();
  });

  it('Favoritar', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /More details/i });
    userEvent.click(moreDetails);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    const img = screen.queryByAltText(/Pikachu is marked as favorite/i);
    expect(img).not.toBeInTheDocument();
    userEvent.click(checkbox, () => { expect(img).toBeInTheDocument(); }); // esperar clicar, aí verificar
    const label = screen.getByLabelText(/Pokémon favoritado/i);
    expect(label).toBeInTheDocument();
  });
});
