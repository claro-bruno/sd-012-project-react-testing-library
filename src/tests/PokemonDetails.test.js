import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

const mockPokemon = pokemons[2];

describe('Teste o componente PokemonDetails', () => {
  beforeEach(() => {
    const { history } = renderWithRouter(<App />);
    history.push(`/pokemons/${mockPokemon.id}`);
  });

  test('Teste se as informações detalhadas do Pokémon selecionado são mostradas na tela.',
    () => {
      const headings = screen.getAllByRole('heading');
      const detailsLink = screen.queryByRole('link', { name: /More details/i });
      const summary = screen.getByText(mockPokemon.summary);

      expect(headings[1].textContent).toBe(`${mockPokemon.name} Details`);
      expect(detailsLink).not.toBeInTheDocument();
      expect(headings[2].textContent).toBe('Summary');
      expect(headings[2].tagName).toBe('H2');
      expect(summary.tagName).toBe('P');
    });

  test('Se existe na página uma seção com os mapas contendo as localizações do pokémon',
    () => {
      const locationImg = screen.getAllByRole('img', {
        name: `${mockPokemon.name} location` });
      const locations = mockPokemon.foundAt;
      const heading = screen.getByRole(
        'heading',
        { name: `Game Locations of ${mockPokemon.name}` },
      );

      expect(heading).toBeInTheDocument();
      expect(locationImg).toHaveLength(mockPokemon.foundAt.length);
      locations.forEach(({ location, map }, index) => {
        const pokemonLocal = screen.getByText(location);
        expect(pokemonLocal).toBeInTheDocument();

        expect(locationImg[index]).toHaveAttribute('src', map);
        expect(locationImg[index]).toHaveAttribute('alt', `${mockPokemon.name} location`);
      });
    });

  test('Teste se o usuário pode favoritar um pokémon através da página de detalhes.',
    () => {
      const checkbox = screen.getByRole(
        'checkbox',
        { name: 'Pokémon favoritado?' },
      );
      expect(checkbox).not.toBeChecked();

      fireEvent.click(checkbox);
      expect(checkbox).toBeChecked();

      fireEvent.click(checkbox);
      expect(checkbox).not.toBeChecked();
    });
});
