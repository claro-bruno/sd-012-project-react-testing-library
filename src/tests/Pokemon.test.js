import React from 'react';
import { screen } from '@testing-library/react';
import event from '@testing-library/user-event';
import { Pokemon } from '../components';
import renderWithRouter from './renderWithRouter';
import mockFavoritePokemons from '../__mocks__/mockFavoritePokemons';

const [pokemon] = mockFavoritePokemons;
const {
  id,
  name,
  type,
  averageWeight: { value, measurementUnit },
  image,
} = pokemon;

describe('Teste do componente <Pokemon />', () => {
  it(
    'Renderiza um card com as informações do pokémon',
    () => {
      renderWithRouter(<Pokemon pokemon={ pokemon } showDetailsLink isFavorite />);

      const altTxtMatch = `${name} sprite`;
      expect(screen.getByTestId('pokemon-name')).toHaveTextContent(name);
      expect(screen.getByTestId('pokemon-type')).toHaveTextContent(type);

      const avgWgtTextMatch = `Average weight: ${value} ${measurementUnit}`;
      expect(screen.getByTestId('pokemon-weight')).toHaveTextContent(avgWgtTextMatch);

      const pokemonImage = screen.getByRole('img', { name: altTxtMatch });
      expect(pokemonImage).toHaveProperty('src', image);
      expect(pokemonImage).toHaveProperty('alt', altTxtMatch);
    },
  );

  it(
    'O card possui um link de navegação para a página de detalhes do pokémon',
    () => {
      renderWithRouter(<Pokemon pokemon={ pokemon } showDetailsLink isFavorite />);

      const moreDetailsLink = screen.getByRole('link');
      expect(moreDetailsLink.pathname).toBe(`/pokemons/${id}`);
    },
  );

  it(
    'Clicar em "More details" redireciona para a página de detalhes do pokémon',
    () => {
      const {
        history,
      } = renderWithRouter(<Pokemon pokemon={ pokemon } showDetailsLink isFavorite />);

      const moreDetailsLink = screen.getByRole('link');
      event.click(moreDetailsLink);

      const { location: { pathname } } = history;
      expect(pathname).toBe(`/pokemons/${id}`);
    },
  );

  it(
    'Existe um ícone de estrela no pokémon favoritado',
    () => {
      renderWithRouter(<Pokemon pokemon={ pokemon } showDetailsLink isFavorite />);

      const altTxtMatch = `${name} is marked as favorite`;
      const starIcon = screen.getByRole('img', { name: /favorite/i });
      expect(starIcon).toHaveAttribute('src', '/star-icon.svg');
      expect(starIcon).toHaveProperty('alt', altTxtMatch);
    },
  );
});
