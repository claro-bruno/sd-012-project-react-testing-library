import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('7- Teste o componente <PokemonDetails.js', () => {
  test('1-Teste se as informações detalhadas do Pokémon selecionado', () => {
    renderWithRouter(<App />);
    // Testando o Sumário
    const moreDetails = (screen.getByText(/More details/));
    fireEvent.click(moreDetails);
    const sumary = (screen.getByRole('heading', { level: 2, name: /Summary/ }));
    expect(sumary).toBeInTheDocument();
    // Testando o Parágrafo
    const paragraph = (screen.getByText(/This intelligent Pokémon/));
    expect(paragraph).toBeInTheDocument();
    // Testa o checkBox
    const checkLabel = screen.getByLabelText(/Pokémon favoritado?/);
    expect(checkLabel).toBeInTheDocument();
    fireEvent.click(checkLabel);
    const markedFavorite = screen.getByAltText(/Pikachu is marked as favorite/);
    expect(markedFavorite).toBeInTheDocument();
    // Verifica as imagens
    const mapImage = screen.getByText(/Game Locations of Pikachu/);
    const pokLocation = screen.getAllByAltText(/Pikachu location/);
    expect(mapImage).toBeInTheDocument();
    expect(pokLocation[0].src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(pokLocation[1].src).toBe('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });
});
