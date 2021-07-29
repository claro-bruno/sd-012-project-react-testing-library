import React from 'react';
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
});
