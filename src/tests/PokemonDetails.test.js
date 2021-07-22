import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

const resume = 'This intelligent Pokémon roasts hard berries with electricity to make';
const URL1 = 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png';
const URL2 = 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png';
const detaiils = 'More details';
const testId = 'pokemon-name';

describe('Testa componente <PokemonDetails />', () => {
  it('Testa se as informações do pokemons são mostradas', () => {
    renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', { name: detaiils });
    userEvent.click(detailsLink);
    const pokemonName = screen.getByTestId(testId);
    expect(screen.getByRole('heading', { name: 'Summary' })).toBeInTheDocument();
    expect(screen.getByText(`${pokemonName.innerHTML} Details`)).toBeInTheDocument();
    expect(detailsLink).not.toBeInTheDocument();
    const pokemonDetails = screen.getByText(/this intelligent/i);
    expect(pokemonDetails).toHaveTextContent(resume);
  });

  it('Testa se existe seção com os mapas', () => {
    renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', { name: detaiils });
    userEvent.click(detailsLink);
    expect(screen.getByRole('heading', { name: 'Game Locations of Pikachu' }))
      .toBeInTheDocument();
    const locations = screen.getAllByAltText(/pikachu location/i);
    expect(locations).toHaveLength(2);
    expect(locations[0]).toHaveAttribute('src', URL1);
    expect(locations[1]).toHaveAttribute('src', URL2);
  });

  it('testa favoritar atraves de datalhes', () => {
    renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', { name: 'More details' });
    const favoriteLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(detailsLink);
    const favoriteButton = screen.getByLabelText('Pokémon favoritado?');
    expect(favoriteButton).toHaveAttribute('type', 'checkbox');
    userEvent.click(favoriteButton);
    expect(favoriteButton).toBeChecked();
    userEvent.click(favoriteLink);
    const favorites = screen.getAllByTestId(testId);
    expect(favorites.length).toBe(1);
    userEvent.click(detailsLink);
    expect(favoriteButton).toBeChecked();
    fireEvent.click(favoriteButton);
    expect(favoriteButton).not.toBeChecked();
    // const starIcon = screen.getByRole('img', { name: 'Pikachu is marked as favorite' });
    // expect(starIcon).not.toBeInTheDocument();
    // userEvent.click(favoriteLink);
    // expect(screen.getByText('No favorite pokemon found')).toBeInTheDocument();
    // favorites = screen.getAllByTestId(testId);
    // expect(favorites[0]).not.toBeInTheDocument();
  });
});
