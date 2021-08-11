import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testando o componente PokemonDetails />', () => {
  test('Testa se as informações do Pokémon selecionado são mostradas na tela', () => {
    renderWithRouter(<App />);
    const buttonDetails = screen.getByText(/More Details/i);
    fireEvent.click(buttonDetails);
    expect(buttonDetails).not.toBeInTheDocument();
    const PokemonDetails = screen.getByText('Pikachu Details');
    expect(PokemonDetails).toBeInTheDocument();
    const sectionDetails = screen.getByText('Summary');
    expect(sectionDetails).toBeInTheDocument();
    const resumePokemon = screen
      .getByText(/Pokémon roasts hard berries with electricity to/i);
    expect(resumePokemon).toBeInTheDocument();
  });
  test('Testa se tem pág c/ seção com mapas contendo localizações do pokémon', () => {
    renderWithRouter(<App />);
    fireEvent.click(screen.getByText(/More Details/i));

    expect(screen.getByText('Game Locations of Pikachu')).toBeDefined();

    const images = screen.getAllByAltText('Pikachu location');

    expect(images[0].src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(images[1].src).toBe('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });

  test('Testa se o usuário pode favoritar um pokémon através da página detalhes.', () => {
    renderWithRouter(<App />);
    const moreDetailsBt = screen.getByText(/more details/i);
    expect(moreDetailsBt).toBeInTheDocument();
    fireEvent.click(moreDetailsBt);
    const checkbox = screen.getByLabelText('Pokémon favoritado?');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox.type).toBe('checkbox');
    expect(checkbox.checked).toBe(false);
    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(true);
    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(false);
  });
});
