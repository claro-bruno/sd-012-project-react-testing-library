import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import data from '../data';

describe('Testa o componente PokemonDetails', () => {
  const moreD = 'More details';
  it('Verifica se as informações na tela de detalhas estão corretas', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByText(moreD);
    expect(moreDetails).toBeInTheDocument();
    userEvent.click(moreDetails);
    expect(moreDetails).not.toBeInTheDocument();
    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    expect(pokemonName.innerHTML).toBe('Pikachu');
    expect(pokemonType.innerHTML).toBe('Electric');
    expect(pokemonWeight.innerHTML).toBe('Average weight: 6.0 kg');
    const summaryText = screen.getByText('Summary');
    const paragraphResume = screen.getByText('This intelligent', { exact: false });
    expect(summaryText).toBeInTheDocument();
    expect(paragraphResume).toBeInTheDocument();
  });
  it('Verifica se existe titulo e sessão com os mapas', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByText(moreD);
    userEvent.click(moreDetails);
    const h2Text = screen.getByText('Game Locations of', { exact: false });
    expect(h2Text).toBeInTheDocument();
    expect(h2Text).toHaveTextContent('Pikachu', { exact: false });
    const locationName1 = screen.getByText('Kanto Viridian Forest');
    const locationName2 = screen.getByText('Kanto Power Plant');
    expect(locationName1).toHaveTextContent(data[0].foundAt[0].location);
    expect(locationName2).toHaveTextContent(data[0].foundAt[1].location);
    const mapLocations = screen.getAllByAltText('Pikachu location');
    expect(mapLocations.length).toBe(data[0].foundAt.length);
    const map1 = 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png';
    const map2 = 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png';
    expect(mapLocations[0].src).toBe(map1);
    expect(mapLocations[1].src).toBe(map2);
  });
  it('Verifica se é possível favoritar o pokémon', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByText('More details');
    userEvent.click(moreDetails);
    const checkBox = screen.getByRole('checkbox', { name: 'Pokémon favoritado?' });
    userEvent.click(checkBox);
    const favoriteIcon = screen.getByAltText(/Pikachu is marked as favorite/i);
    expect(favoriteIcon).toBeInTheDocument();
    userEvent.click(checkBox);
    expect(favoriteIcon).not.toBeInTheDocument();
  });
});
