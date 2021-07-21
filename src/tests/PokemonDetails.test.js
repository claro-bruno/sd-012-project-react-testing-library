import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

const { screen } = require('@testing-library/react');

describe('Testa o componente PokemonDetails.js', () => {
  it('Testa informações detalhadas do Pokémon selecionado na tela.', () => {
    renderWithRouter(<App />);
    const links = screen.getAllByRole('link');
    userEvent.click(links[3]);
    const pikachu = screen.getByText('Pikachu Details');
    expect(pikachu).toBeInTheDocument();
    const summary = screen.getByRole('heading', { name: /Summary/i });
    expect(summary).toBeInTheDocument();
    const string1 = 'This intelligent Pokémon roasts hard berries ';
    const string2 = 'with electricity to make them tender enough to eat.';
    const string = string1 + string2;
    const p = screen.getByText(string);
    expect(p).toBeInTheDocument();
  });
  it('Testa uma seção com os mapas contendo as localizações do pokémon', () => {
    renderWithRouter(<App />);
    const links = screen.getAllByRole('link');
    userEvent.click(links[3]);
    const location = screen.getByRole('heading', { name: /Game Locations of Pikachu/i });
    expect(location).toBeInTheDocument();
    const imgs = screen.getAllByRole('img');
    expect(imgs[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(imgs[2]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    expect(imgs[1]).toHaveAttribute('alt', 'Pikachu location');
    expect(imgs[2]).toHaveAttribute('alt', 'Pikachu location');
  });
  it('Testa se é possível favoritar um pokémon através da página de detalhes.', () => {
    renderWithRouter(<App />);
    const links = screen.getAllByRole('link');
    userEvent.click(links[3]);
    const text = screen.getByText('Pokémon favoritado?');
    expect(text).toBeInTheDocument();
  });
});
