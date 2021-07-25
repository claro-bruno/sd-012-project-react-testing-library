import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente <PokemonDetails/>', () => {
  test('Testa toda a pagina de detalhes: titulo, mapa, fav', () => {
    renderWithRouter(<App />);

    const pokemonDetails = screen.getByRole('link', { name: 'More details' });
    expect(pokemonDetails).toBeInTheDocument();

    fireEvent.click(pokemonDetails);

    const pokemonNameDetails = screen.getByText('Pikachu Details');
    const h2 = screen.getByRole('heading',
      { name: /Summary/i, level: 2 });
    const p = screen.getByText(/This intelligent Pokémon roasts hard/i);
    const h2Map = screen.getByRole('heading',
      { name: /Summary/i, level: 2 });
    const h2GameLocations = screen.getByRole('heading',
      { name: /Game Locations of Pikachu/i, level: 2 });
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    const pokemonImgAltDetails = screen.getAllByAltText('Pikachu location');
    expect(pokemonNameDetails).toBeInTheDocument();
    expect(pokemonDetails).not.toBeInTheDocument();
    expect(h2).toBeInTheDocument();
    expect(p).toBeInTheDocument();
    expect(h2Map).toBeInTheDocument();
    expect(h2GameLocations).toBeInTheDocument();
    expect(pokemonWeight).toBeInTheDocument();
    expect(pokemonImgAltDetails.length).toBe(2);
    expect(pokemonImgAltDetails[0].src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    const checkbox = screen.getByLabelText('Pokémon favoritado?');
    fireEvent.click(checkbox);

    const starAlt = screen.getByAltText('Pikachu is marked as favorite');
    expect(starAlt).toBeInTheDocument();
  });
});
