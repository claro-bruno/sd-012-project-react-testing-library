import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

describe('Verifica o componente "PokeminDetails.js"', () => {
  test('Verifica se as informações detalhadas do Pokémon na tela', () => {
    const { history } = renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /More Details/i });
    userEvent.click(moreDetails);

    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');

    expect(moreDetails).not.toBeInTheDocument();
  });

  test('Verifica informações na tela', () => {
    renderWithRouter(<App />);
    const details = screen.getByRole('link', { name: /More Details/i });
    userEvent.click(details);

    const h2Title = screen.getByRole('heading', { name: /pIKACHU dETAILS/i });
    expect(h2Title).toBeInTheDocument();

    const pokemon = screen.getByTestId('pokemon-name');
    expect(pokemon).toHaveTextContent(/Pikachu/i);

    const infoPokemon = screen.getByText(/This intelligent Pokémon/i);
    expect(infoPokemon).toBeDefined();

    const summary = screen.getByRole('heading', { name: /summary/i });
    expect(summary).toBeInTheDocument();

    const locationTitle = screen.getByRole('heading',
      { name: /Game Locations of Pikachu/i });
    expect(locationTitle).toBeInTheDocument();

    renderWithRouter(<App />);
    const map = screen.getAllByAltText(/pikachu location/i);
    expect(map).toHaveLength(2);

    const mapLeft = screen.getByText(/Kanto Viridian Forest/i);
    expect(map[0].src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(mapLeft).toBeInTheDocument();

    const mapRight = screen.getByText(/Kanto Power Plant/i);
    expect(map[1].src).toBe('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    expect(mapRight).toBeInTheDocument();
  });

  // test('Verifica os mapas', () => {
  //   renderWithRouter(<App />);
  //   const map = screen.getAllByAltText(/pikachu location/i);
  //   expect(map).toHaveLength(2);

  //   const mapLeft = screen.getByText(/Kanto Viridian Forest/i);
  //   expect(map[0].src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
  //   expect(mapLeft).toBeInTheDocument();

  //   const mapRight = screen.getByText(/Kanto Power Plant/i);
  //   expect(map[1].src).toBe('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  //   expect(mapRight).toBeInTheDocument();
  // });

  test('Verifica se o usuário pode favoritar um pokemon', () => {
    renderWithRouter(<App />);
    const details = screen.getByRole('link', { name: /more details/i });
    userEvent.click(details);

    const favorite = screen.getByLabelText(/pokémon favoritado?/i);
    expect(favorite).toBeInTheDocument();

    const checkbox = screen.getByRole('checkbox', { checked: false });
    userEvent.click(checkbox);

    const favoritePokemon = screen.getByAltText('Pikachu is marked as favorite');
    expect(favoritePokemon).toBeInTheDocument();

    userEvent.click(checkbox);
    expect(checkbox).toBeInTheDocument();
  });
});
