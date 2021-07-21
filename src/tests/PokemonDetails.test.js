import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testanto o component Pokemon Details', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  test('Verifica renderiza o nome do Pokemon correto', () => {
    fireEvent.click(screen.getByText(/More details/i));
    expect(screen.getByText(/Pikachu details/i).innerHTML).toBe('Pikachu Details');
  });

  test('Verifica se os mapas estão corretos', () => {
    const pikachuMap = 'Game Locations of Pikachu';
    const imgLink = 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png';
    fireEvent.click(screen.getByText(/More details/i));
    expect(screen.getByText(/Game Locations of Pikachu/i).innerHTML).toBe(pikachuMap);
    expect(screen.getAllByAltText(/Pikachu location/i)[0].src).toBe(imgLink);
  });

  test('Verifica estrelinha', () => {
    fireEvent.click(screen.getByText(/More details/i));
    expect(screen.getByText(/Pokémon favoritado?/)).toBeInTheDocument();
  });

  test('Verifica sumário', () => {
    fireEvent.click(screen.getByText(/More details/i));
    expect(screen.getByText(/Summary/i).innerHTML).toBe('Summary');
    expect(screen.getByText(/This intelligent/i)).toBeInTheDocument();
  });
});
