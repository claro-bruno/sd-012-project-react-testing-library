import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testa PokemonDetails.js', () => {
  it('Existe um H2 com nome "NomeDoPoKemon + Details"', () => {
    const { history } = renderWithRouter(<App />);

    pokemons.forEach((pokemon) => {
      const { name, id } = pokemon;

      history.push(`/pokemons/${id}`);

      const title = screen.getByRole('heading', { name: `${name} Details`, level: 2 });
      expect(title).toBeDefined();
    });
  });

  it('Existe paragrafo com o resumo do Pokemon', () => {
    const { history } = renderWithRouter(<App />);

    pokemons.forEach((pokemon) => {
      const { summary, id } = pokemon;

      history.push(`/pokemons/${id}`);

      const paragraphSummary = screen.getByText(summary);
      expect(paragraphSummary).toBeDefined();
    });
  });

  it('Existe um H2 com nome "Game Locations of + NomeDoPokemon"', () => {
    const { history } = renderWithRouter(<App />);

    pokemons.forEach((pokemon) => {
      const { name, id } = pokemon;

      history.push(`/pokemons/${id}`);

      const title = screen
        .getByRole('heading', { name: `Game Locations of ${name}`, level: 2 });
      expect(title).toBeDefined();
    });
  });

  it('É renderizado todas as imagens com a localização do Pokemon', () => {
    const { history } = renderWithRouter(<App />);

    pokemons.forEach((pokemon) => {
      const { name, foundAt, id } = pokemon;

      history.push(`/pokemons/${id}`);

      const localizationsAlt = screen.getAllByAltText(`${name} location`);
      const sizeLocalization = foundAt.length;
      expect(localizationsAlt.length).toBe(sizeLocalization);

      foundAt.forEach((found, index) => {
        const { map, location } = found;
        expect(localizationsAlt[index].src).toBe(map);

        const titleLocalization = screen.getAllByText(location);
        expect(titleLocalization).toBeDefined();
      });
    });
  });

  it('Existe um H2 com nome "Summary"', () => {
    renderWithRouter(<App />);

    const linkDetails = screen.getByRole('link', { name: /More details/ });
    expect(linkDetails).toBeDefined();

    userEvent.click(linkDetails);

    const title = screen.getByRole('heading', { name: 'Summary', level: 2 });
    expect(title).toBeDefined();
  });

  it('Existe checkbox "Pokémon favoritado?"', () => {
    renderWithRouter(<App />);

    const linkDetails = screen.getByRole('link', { name: /More details/ });
    expect(linkDetails).toBeDefined();

    userEvent.click(linkDetails);

    const FavoritePokemon = screen.getByLabelText('Pokémon favoritado?');
    expect(FavoritePokemon).toBeDefined();
  });
});
