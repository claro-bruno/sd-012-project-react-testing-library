import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testa o componente PokemonDetails', () => {
  it(`Teste se as informações detalhadas do Pokémon
  selecionado são mostradas na tela`, () => {
    renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: /More details/i });
    userEvent.click(link);
    expect(screen.getByText('Pikachu Details')).toBeDefined();
    expect(screen.queryByRole('link', { name: /more details/i })).not.toBeInTheDocument();
    const h2 = screen.getByRole('heading', { name: /summary/i, level: 2 });
    expect(h2).toBeInTheDocument();
    const p = 'This intelligent Pokémon roasts hard berries with'
    + ' electricity to make them tender enough to eat.';
    expect(screen.getByText(p)).toBeDefined();
  });

  it(`Teste se existe na página uma seção com os mapas
  contendo as localizações do pokémon`, () => {
    renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: /More details/i });
    userEvent.click(link);
    const h2 = screen.queryByRole('heading',
      { name: /Game Locations of Pikachu/i, level: 2 });
    expect(h2).toBeInTheDocument();
    expect(screen.getAllByRole('img').length - 1).toBe(2);
    expect(screen.getByText('Kanto Viridian Forest')).toBeDefined();
    const locationImg1 = screen.getAllByRole('img', { name: 'Pikachu location' });
    expect(locationImg1[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(screen.getByText('Kanto Power Plant')).toBeDefined();
    const locationImg2 = screen.getAllByRole('img', { name: 'Pikachu location' });
    expect(locationImg2[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });

  it(`Teste se o usuário pode favoritar
  um pokémon através da página de detalhes`, () => {
    renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: /More details/i });
    userEvent.click(link);
    expect(screen.getByRole('checkbox')).toBeDefined();
    const check = screen.getByRole('checkbox');
    expect(check).not.toBeChecked();
    userEvent.click(check);
    expect(check).toBeChecked();
    userEvent.click(check);
    expect(check).not.toBeChecked();
    expect(screen.getByLabelText('Pokémon favoritado?')).toBeDefined();
  });
});
