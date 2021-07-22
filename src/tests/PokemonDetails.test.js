import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testa PokemonDetails.js', () => {
  beforeEach(() => renderWithRouter(<App />));

  it('Existe um H2 com nome "Pikachu Details"', () => {
    const { name } = pokemons[0];

    const linkDetails = screen.getByRole('link', { name: /More details/ });
    expect(linkDetails).toBeDefined();

    userEvent.click(linkDetails);

    const title = screen.getByRole('heading', { name: `${name} Details` });
    expect(title).toBeDefined();
  });

  it('Existe um H2 com nome "Summary"', () => {
    const linkDetails = screen.getByRole('link', { name: /More details/ });
    expect(linkDetails).toBeDefined();

    userEvent.click(linkDetails);

    const title = screen.getByRole('heading', { name: 'Summary' });
    expect(title).toBeDefined();
  });

  it('Existe paragrafo com o resumo do "Pikachu"', () => {
    const { summary } = pokemons[0];

    const linkDetails = screen.getByRole('link', { name: /More details/ });
    expect(linkDetails).toBeDefined();

    userEvent.click(linkDetails);

    const paragraphSummary = screen.getByText(summary);
    expect(paragraphSummary).toBeDefined();
  });

  it('Existe um H2 com nome "Game Locations of Pikachu"', () => {
    const { name } = pokemons[0];
    const linkDetails = screen.getByRole('link', { name: /More details/ });
    expect(linkDetails).toBeDefined();

    userEvent.click(linkDetails);

    const title = screen.getByRole('heading', { name: `Game Locations of ${name}` });
    expect(title).toBeDefined();
  });

  it('É renderizado todas as imagens com a localização do "Pikchu"', () => {
    const { name, foundAt } = pokemons[0];
    const linkDetails = screen.getByRole('link', { name: /More details/ });
    expect(linkDetails).toBeDefined();

    userEvent.click(linkDetails);

    const localizationsAlt = screen.getAllByAltText(`${name} location`);
    const sizeLocalization = foundAt.length;
    expect(localizationsAlt.length).toBe(sizeLocalization);

    for (let index = 0; index < foundAt.length; index += 1) {
      const { map, location } = foundAt[index];
      expect(localizationsAlt[index].src).toBe(map);

      const titleLocalization = screen.getAllByText(location);
      expect(titleLocalization).toBeDefined();
    }
  });

  it('Existe checkbox "Pokémon favoritado?"', () => {
    const linkDetails = screen.getByRole('link', { name: /More details/ });
    expect(linkDetails).toBeDefined();

    userEvent.click(linkDetails);

    const FavoritePokemon = screen.getByLabelText('Pokémon favoritado?');
    expect(FavoritePokemon).toBeDefined();
  });
});
