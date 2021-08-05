import React from 'react';
<<<<<<< HEAD
import { screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

const resume = 'This intelligent Pokémon roasts hard berries with electricity to make';
const URL1 = 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png';
const URL2 = 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png';
const detaiils = 'More details';
const testId = 'pokemon-name';

describe('Testa componente PokemonDetails', () => {
  it('Testa se a pagina mostra infomaçoes detalhadas', () => {
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

  it('Testa se existe na pagina seção com os mapas', () => {
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

  it('Testa se usuario pode favoritar atraves da pagina de detalhes', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: 'More details' });
    const favoriteLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(moreDetails);
    const favoriteButton = screen.getByLabelText('Pokémon favoritado?');
    expect(favoriteButton).toHaveAttribute('type', 'checkbox');
    userEvent.click(favoriteButton);
    expect(favoriteButton).toBeChecked();
    userEvent.click(favoriteLink);
    const favorites = screen.getAllByTestId(testId);
    expect(favorites.length).toBe(1);
    userEvent.click(moreDetails);
    expect(favoriteButton).toBeChecked();
    fireEvent.click(favoriteButton);
    expect(favoriteButton).not.toBeChecked();
  });
=======
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testa componente PokemonDetails', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByRole('link', { name: /More details/i }));
  });

  test('Teste se a pagina mostra informacoes detalhadas', () => {
    const { name, summary } = pokemons[0];
    const h2pokemon = screen.getByRole('heading', { name: `${name} Details` });
    expect(h2pokemon.localName).toBe('h2');

    const link = screen.queryByRole('link', { name: /More details/i });
    expect(link).not.toBeInTheDocument();

    const summaryheading = screen.getByRole('heading', { name: /Summary/i });
    expect(summaryheading.localName).toBe('h2');

    const summaryParagraph = screen.getByText(summary);
    expect(summaryParagraph).toBeInTheDocument();
    expect(summaryParagraph.localName).toBe('p');
  });
  test('Teste se existe na página uma seção com mapas contendo as localizações do pokémon',
    () => {
      const URL1 = 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png';
      const URL2 = 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png';

      const detailsScreen = screen.getByRole('link', { name: /more details/i });
      userEvent.click(detailsScreen);

      expect(screen.getByRole('heading', { name: 'Game Locations of Pikachu' }))
        .toBeInTheDocument();
      const locations = screen.getAllByAltText(/pikachu location/i);
      expect(locations).toHaveLength(2);
      expect(locations[0]).toHaveAttribute('src', URL1);
      expect(locations[1]).toHaveAttribute('src', URL2);
    });
});
test('Testa se usuario pode favoritar um pokémon pela pagina de detalhes', () => {
  const { name } = pokemons[0];
    const checkbox = screen.getByLabelText(/pokémon favoritado?/i);
    userEvent.click(checkbox);

    const altScreen = `${name} is marked as favorite`;
    expect(screen.getByAltText(altScreen)).toBeInTheDocument();

    userEvent.click(checkbox);
    expect(screen.queryByAltText(altScreen)).not.toBeInTheDocument();
>>>>>>> 7273cc6db3ec345b85c29ab2cfa463bc11a1a8eb
});
