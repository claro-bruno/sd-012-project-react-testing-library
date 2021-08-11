import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testa Pokémon Details', () => {
  test('Testa render de Pokémon Details', () => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByRole('link', { name: /more details/i }));
    expect(screen.getByRole('heading', { name: /Pikachu Details/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Summary/i })).toBeInTheDocument();
  });

  test('Testa rendes dos mapas de localização dos Pokémons', () => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByRole('link', { name: /more details/i }));
    expect(screen.getByRole('heading', { name: /Game Locations of Pikachu/i }))
      .toBeInTheDocument();
    const paragraph = screen
      .getByText(/This intelligent Pokémon /i);

    expect(paragraph).toBeInTheDocument();
    expect(screen.getAllByAltText(/pikachu location/i)).toHaveLength(2);
    const MAP_URL1 = 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png';
    const MAP_URL2 = 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png';
    const img = screen.getAllByRole('img');
    expect(img[1]).toHaveAttribute('src', MAP_URL1);
    expect(img[2]).toHaveAttribute('src', MAP_URL2);
  });

  test('Testa checkbox Pokémon Favorito', () => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByRole('link', { name: /more details/i }));
    expect(screen.getByLabelText('Pokémon favoritado?').type).toBe('checkbox');
    expect(screen.getByRole('checkbox', { checked: false })).toBeInTheDocument();
    userEvent.click(screen.getByRole('checkbox', { checked: false }));
    expect(screen.getByRole('checkbox', { checked: true })).toBeInTheDocument();
  });
});
