import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('testa se componente pokemonDetails', () => {
  it('exibe as informações detalhadas do pokemon selecionado', () => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByText(/More details/));
    expect(screen.getByText(/Pikachu Details/)).toBeInTheDocument();
    expect(screen.queryByText(/More details/)).toBeNull();
    expect(screen.getByRole('heading', { name: 'Summary', level: 2 }))
      .toBeInTheDocument();
    expect(screen.getByText(/This intelligent Pokémon roasts hard berries/))
      .toBeInTheDocument();
  });

  it('exibe mapa com a localização do pokemon', () => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByText(/More details/));
    const pokemonPikachu = screen
      .getByRole('heading', { name: 'Game Locations of Pikachu', level: 2 });
    expect(pokemonPikachu).toBeInTheDocument();
    expect(screen.getAllByRole('img', { name: 'Pikachu location' })).toHaveLength(2);
    expect(screen.getByText('Kanto Viridian Forest')).toBeInTheDocument();
    expect(screen.getByText('Kanto Power Plant')).toBeInTheDocument();
    const pikachuLocation = screen.getAllByRole('img', { name: 'Pikachu location' });
    expect(pikachuLocation[0]).toHaveProperty('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(pikachuLocation[1]).toHaveProperty('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });

  it('possibilita favoritar o pokemon', () => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByText(/More details/));
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    userEvent.click(screen.getByRole('checkbox'));
    expect(screen.getByAltText(/pikachu is marked as favorite/i)).toBeInTheDocument();
    userEvent.click(screen.getByRole('checkbox'));
    expect(screen.queryByAltText(/pikachu is marked as favorite/i)).toBeNull();
    expect(screen.getByLabelText('Pokémon favoritado?')).toBeInTheDocument();
  });
});
