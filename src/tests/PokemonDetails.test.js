import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

const moreDetails = 'More details';
const localization1 = 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png';
const localization2 = 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png';

describe('Testa o componente "PokemonDetails"', () => {
  it('Verifica se são exibidas na tela as informações do pokemon', () => {
    renderWithRouter(<App />);
    const details = screen.getByRole('link', { name: moreDetails });
    userEvent.click(details);
    const pokemonName = screen.getByTestId('pokemon-name');
    expect(screen.getByRole('heading', { name: 'Summary' })).toBeInTheDocument();
    expect(screen.getByText(`${pokemonName.innerHTML} Details`)).toBeInTheDocument();
    expect(details).not.toBeInTheDocument();
    const pokemonDetails = screen.getByText(/this intelligent/i);
    expect(pokemonDetails).toHaveTextContent(
      'This intelligent Pokémon roasts hard berries with electricity to make',
    );
  });

  it('Verifica se existe uma seção com os mapas com a localizações do pokémon', () => {
    renderWithRouter(<App />);
    const details = screen.getByRole('link', { name: moreDetails });
    userEvent.click(details);
    expect(screen.getByRole('heading', { name: 'Game Locations of Pikachu' }))
      .toBeInTheDocument();
    const localization = screen.getAllByAltText(/pikachu location/i);
    expect(localization).toHaveLength(2);
    expect(localization[0]).toHaveAttribute('src', localization1);
    expect(localization[1]).toHaveAttribute('src', localization2);
  });

  it('Verifica se é possível favoritar um pokémon através da página de detalhes', () => {
    renderWithRouter(<App />);
    const details = screen.getByRole('link', { name: moreDetails });
    const favoriteLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(details);
    const favoriteButton = screen.getByLabelText('Pokémon favoritado?');
    expect(favoriteButton).toHaveAttribute('type', 'checkbox');
    userEvent.click(favoriteButton);
    expect(favoriteButton).toBeChecked();
    userEvent.click(favoriteLink);
    const favorites = screen.getAllByTestId('pokemon-name');
    expect(favorites.length).toBe(1);
    userEvent.click(details);
    expect(favoriteButton).toBeChecked();
    userEvent.click(favoriteButton);
    expect(favoriteButton).not.toBeChecked();
  });
});
