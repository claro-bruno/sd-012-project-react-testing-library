import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Verifica PokemonDetails.js', () => {
  it('Verifica se texto Summary é renderizado e se exibe card do Pikachu', () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: /more details/i });

    userEvent.click(moreDetails);

    expect(moreDetails).toBeDefined();
    expect(screen.getByText('Summary')).toBeDefined();
  });

  it('Testa se exibe detalhes do pikachu', () => {
    const { history } = renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: /more details/i });
    const pokemonName = screen.getByTestId('pokemon-name');

    userEvent.click(moreDetails);

    const checkbox = screen.getByRole('checkbox');
    const { pathname } = history.location;

    expect(checkbox).toBeDefined();
    expect(pokemonName).toHaveTextContent('Pikachu');
    expect(moreDetails).toHaveAttribute('href', '/pokemons/25');
    expect(pathname).toBe('/pokemons/25');
  });

  it('Testa se favorita Pikachu na more details', () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: /more details/i });

    userEvent.click(moreDetails);

    const checkbox = screen.getByRole('checkbox');
    expect(screen.getByText('Summary')).toBeDefined();
    userEvent.click(checkbox);

    const iconFavorite = screen.getAllByRole('img');

    expect(iconFavorite[1]).toHaveAttribute('src', '/star-icon.svg');
    expect(iconFavorite[1]).toHaveAttribute('alt', 'Pikachu is marked as favorite');
  });

  it('Testa frase descritiva do pikachu', () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: /more details/i });

    userEvent.click(moreDetails);

    const phraseOne = 'This intelligent Pokémon roasts hard berries with electricity to';
    expect(screen.getByText(/this intelligent/i)).toHaveTextContent(phraseOne);
  });

  it('Testa se seção dos mapas são renderizados', () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: /more details/i });

    userEvent.click(moreDetails);

    const titleMap = screen.getByRole('heading', { name: 'Game Locations of Pikachu' });
    expect(titleMap).toBeDefined();
  });

  it('Testa se exibe os mapas de localização', () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: /more details/i });

    userEvent.click(moreDetails);

    const mapOne = 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png';
    const mapTwo = 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png';
    const locationPikachu = screen.getAllByAltText(/pikachu location/i);

    expect(locationPikachu).toHaveLength(2);
    expect(locationPikachu[0]).toHaveAttribute('src', mapOne);
    expect(locationPikachu[1]).toHaveAttribute('src', mapTwo);
  });

  it('Testa se label pokémon favoritado? é renderizado', () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: /more details/i });

    userEvent.click(moreDetails);

    const labelFavorite = screen.getByLabelText(/Pokémon favoritado?/i);
    expect(labelFavorite).toBeDefined();
  });
});
