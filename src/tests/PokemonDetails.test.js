import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Verifica PokemonDetails.test.js', () => {
  test('', () => {
    renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', { name: /More details/i });
    userEvent.click(detailsLink);

    expect(screen.getByText(/Pikachu Details/i)).toBeDefined();
    expect(detailsLink).not.toBeInTheDocument();

    const pokeName = screen.getByTestId('pokemon-name');
    expect(pokeName.textContent).toBe('Pikachu');

    const PikachuLtn = screen.getByText('Game Locations of Pikachu');
    expect(PikachuLtn).toBeInTheDocument();

    const locationPok = screen.getAllByRole('img');
    expect(locationPok[1].src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(locationPok[1].alt).toBe('Pikachu location');
    expect(locationPok[2].src).toBe('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    expect(locationPok[2].alt).toBe('Pikachu location');

    expect(screen.getByRole('heading', { name: /Summary/i })).toBeInTheDocument();
    // Não entendi por que não conseguie colocar string com mais de 90 sem o lint reclamar mesmo sendo somente texto
    expect(screen.getByText(pokemons[0].summary)).toBeInTheDocument();

    userEvent.click(screen.getByLabelText(/pokémon favoritado?/i));

    const startPoke = screen.getByAltText('Pikachu is marked as favorite');
    expect(startPoke).toBeInTheDocument();

    userEvent.click(screen.getByLabelText(/pokémon favoritado?/i));
    expect(startPoke).not.toBeInTheDocument();
  });
});
