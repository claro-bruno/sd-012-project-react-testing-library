import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

const oneResume = 'This intelligent Pokémon roasts hard berries with electricity to make';
const URL1 = 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png';
const URL2 = 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png';
const thisDetails = 'More details';
const testId = 'pokemon-name';

describe('Testa componente PokemonDetails', () => {
  test('Testa se a pagina mostra infomaçoes detalhadas', () => {
    renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', { name: thisDetails });
    userEvent.click(detailsLink);
    const pokemonName = screen.getByTestId(testId);
    expect(screen.getByRole('heading', { name: 'Summary' })).toBeInTheDocument();
    expect(screen.getByText(`${pokemonName.innerHTML} Details`)).toBeInTheDocument();
    expect(detailsLink).not.toBeInTheDocument();
    const pokemonDetails = screen.getByText(/this intelligent/i);
    expect(pokemonDetails).toHaveTextContent(oneResume);
  });

  test('Testa se existe na pagina seção com os mapas', () => {
    renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', { name: thisDetails });
    userEvent.click(detailsLink);
    expect(screen.getByRole('heading', { name: 'Game Locations of Pikachu' }))
      .toBeInTheDocument();
    const saveLocations = screen.getAllByAltText(/pikachu location/i);
    expect(saveLocations).toHaveLength(2);
    expect(saveLocations[0]).toHaveAttribute('src', URL1);
    expect(saveLocations[1]).toHaveAttribute('src', URL2);
  });

  test('Testa se usuario pode favoritar atraves da pagina de detalhes', () => {
    renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(detailsLink);

    userEvent.click(screen.getByLabelText(/pokémon favoritado?/i));

    const favoriteImage = screen.getByAltText('Pikachu is marked as favorite');
    expect(favoriteImage).toBeInTheDocument();

    userEvent.click(screen.getByLabelText(/pokémon favoritado?/i));
    expect(favoriteImage).not.toBeInTheDocument();
  });
});
