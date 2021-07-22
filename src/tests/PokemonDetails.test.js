import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Teste o componente pokemonDetails', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
    const linkDetails = screen.getByRole('link', { name: 'More details' });
    userEvent.click(linkDetails);
  });
  test('Teste se as informações do Pokémon selecionado são mostradas na tela.', () => {
    const pikachuDetail = screen.getByText('Pikachu Details');
    const summary = screen.getByRole('heading', { level: 2, name: 'Summary' });
    expect(summary).toBeInTheDocument();
    const summContent = screen.getByText('This intelligent Pokémon roasts hard'
    + ' berries with electricity to make them tender enough to eat.');
    expect(summContent).toBeInTheDocument();
    const pokeName = screen.getByTestId('pokemon-name');
    expect(pokeName).toBeInTheDocument();
    expect(summContent[Object.keys(summContent)[0]].elementType).toBe('p');
    expect(pikachuDetail);
  });

  test('Teste se existe uma seção com os mapas com as localizações do pokémon', () => {
    const locationH2 = screen.getByRole(
      'heading', { level: 2, name: 'Game Locations of Pikachu' },
    );
    const map = screen.getAllByAltText('Pikachu location');
    expect(map[0].src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(map[1].src).toBe('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    expect(map[0]).toBeInTheDocument();
    expect(map[1]).toBeInTheDocument();
    const mapName1 = screen.getByText('Kanto Viridian Forest');
    const mapName2 = screen.getByText('Kanto Power Plant');
    expect(mapName1).toBeInTheDocument();
    expect(mapName2).toBeInTheDocument();
    expect(locationH2).toBeInTheDocument();
  });

  test('Teste se o usuário pode favoritar o pokémon na página de detalhes.', () => {
    const favStarOff = screen.queryByAltText('Pikachu is marked as favorite');
    const checkbox = screen.getByLabelText('Pokémon favoritado?');
    expect(favStarOff).toBeNull();
    userEvent.click(checkbox);
    const favStarOn = screen.getByAltText('Pikachu is marked as favorite');
    expect(favStarOn).toBeInTheDocument();
  });
});
