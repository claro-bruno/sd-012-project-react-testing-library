import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithrouter';

beforeEach(() => {
  renderWithRouter(<App />);
  userEvent.click(screen.getByRole('link', { name: /More details/i }));
});

describe('Verifica PokemonDetails.js', () => {
  it('Testa as informações detalhadas do Pokémon. ', () => {
    expect(screen.getByRole('heading', { name: /Pikachu Details/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Summary/i })).toBeInTheDocument();
    expect(screen.getByText(/This intelligent Pokémon/i)).toBeInTheDocument();
  });

  it('Testa se existe na página uma seção com os mapas. ', () => {
    expect(screen.getByRole('heading', { name: /Game Locations of Pikachu/i }))
      .toBeInTheDocument();

    expect(screen.getAllByRole('img', { name: /Pikachu location/i }).length)
      .toBe(2);

    const imagens = screen.getAllByRole('img', { name: /Pikachu location/i });
    expect(imagens[0].src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
  });

  it('Testa se o usuário pode favoritar um pokémon. ', () => {
    expect(screen.getByText(/Pokémon favoritado?/i)).toBeInTheDocument();
    userEvent.click(screen.getByRole('checkbox'));
    userEvent.click(screen.getByRole('link', { name: /Favorite Pokémons/i }));

    const pokemon = screen.getByText(/Pikachu/i);
    expect(pokemon).toBeInTheDocument();
  });
});
