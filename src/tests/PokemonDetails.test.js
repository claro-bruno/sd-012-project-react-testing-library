import React from 'react';
import { screen } from '@testing-library/react';
import event from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

const { id, name, foundAt, summary } = pokemons[0];

describe('Teste do componente <PokemonDetails />', () => {
  it(
    'As informações detalhadas do Pokémon selecionado são mostradas na tela',
    () => {
      const { history } = renderWithRouter(<App />);
      history.push(`/pokemons/${id}`);

      const pokemonDetails = screen.getByText(`${name} Details`);
      expect(pokemonDetails).toBeInTheDocument();

      const pokeDetailsLink = screen.queryByRole('link', { name: 'More Details' });
      expect(pokeDetailsLink).not.toBeInTheDocument();

      const detailsSummaryTitle = screen.getByRole('heading', { name: 'Summary' });
      expect(detailsSummaryTitle).toBeInTheDocument();

      const pokemonSummary = screen.getByText(summary);
      expect(pokemonSummary).toBeInTheDocument();
    },
  );

  it(
    'A página contém uma seção com os mapas contendo as localizações do pokémon',
    () => {
      const { history } = renderWithRouter(<App />);
      history.push(`/pokemons/${id}`);

      const detailsSummaryTitle = screen.getByRole(
        'heading',
        { name: `Game Locations of ${name}` },
      );
      expect(detailsSummaryTitle).toBeInTheDocument();

      const pokemonMapImage = screen.getAllByRole('img', { name: `${name} location` });
      foundAt.forEach(({ location, map }, index) => {
        const pokemonLocation = screen.getByText(location);
        expect(pokemonLocation).toBeInTheDocument();

        expect(pokemonMapImage[index]).toHaveAttribute('src', map);
        expect(pokemonMapImage[index]).toHaveAttribute('alt', `${name} location`);
      });
    },
  );

  /**
  * Consultei o PR do Eric Kreis para resolver essa parte.
  * https://github.com/tryber/sd-012-project-react-testing-library/pull/48
  */
  it(
    'O usuário pode favoritar um pokémon através da página de detalhes',
    () => {
      const { history } = renderWithRouter(<App />);
      history.push(`/pokemons/${id}`);

      const favoritePokemonCheckbox = screen.getByRole(
        'checkbox',
        { name: 'Pokémon favoritado?' },
      );
      expect(favoritePokemonCheckbox).not.toBeChecked();

      event.click(favoritePokemonCheckbox);
      expect(favoritePokemonCheckbox).toBeChecked();

      event.click(favoritePokemonCheckbox);
      expect(favoritePokemonCheckbox).not.toBeChecked();
    },
  );
});
