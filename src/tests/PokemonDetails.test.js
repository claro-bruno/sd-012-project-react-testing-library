import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

const resume = 'This intelligent Pokémon roasts hard berries with electricity to make';
const URL1 = 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png';
const URL2 = 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png';
const detaiils = 'More details'; const testId = 'pokemon-name';

describe('Testa componente PokemonDetails', () => {
  test('Testa se a pagina mostra infomaçoes detalhadas', () => {
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

  test('Testa se existe na pagina seção com os mapas', () => {
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

  test('Testa se usuario pode favoritar atraves da pagina de detalhes', () => {
    renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(detailsLink);

    userEvent.click(screen.getByLabelText(/pokémon favoritado?/i));

    const favoriteIcon = screen.getByAltText('Pikachu is marked as favorite');
    expect(favoriteIcon).toBeInTheDocument();

    userEvent.click(screen.getByLabelText(/pokémon favoritado?/i));
    expect(favoriteIcon).not.toBeInTheDocument();
  });
});
