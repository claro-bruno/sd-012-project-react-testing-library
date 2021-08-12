import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

describe('Requisito 7', () => {
  beforeEach(() => renderWithRouter(<App />));

  test('Testa se as informações detalhadas do Pokémon são mostradas na tela', () => {
    const details = screen.getByRole('link', { name: /More Details/i });
    expect(details).toBeInTheDocument();
    userEvent.click(details);

    const name = screen.getByRole('heading', { name: /Summary/i });
    expect(name).toBeInTheDocument();
    const pokeName = screen.getByRole('heading', { name: 'Pikachu Details' });
    expect(pokeName).toBeInTheDocument();
    const locations = screen.getByRole('heading', { name: /Game Locations of Pikachu/i });
    expect(locations).toBeInTheDocument();
    const paragraph = screen.getByText(/This intelligent Pokémon/i);
    expect(paragraph).toBeInTheDocument();
  });

  test('Testa se existe uma seção com os mapas com as localizações do pokémon', () => {
    const details = screen.getByRole('link', { name: /More Details/i });
    expect(details).toBeInTheDocument();
    userEvent.click(details);

    const maps = screen.getAllByRole('img', { name: /Pikachu location/i });
    expect(maps).toHaveLength(2);
    expect(maps[0].src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(maps[1].src).toBe('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });

  test('Testa se o usuário pode favoritar através da página de detalhes', () => {
    const details = screen.getByRole('link', { name: /More Details/i });
    expect(details).toBeInTheDocument();
    userEvent.click(details);

    const favorites = screen.getByRole('checkbox', { name: /Pokémon favoritado?/i });
    expect(favorites).toBeInTheDocument();
  });
});
