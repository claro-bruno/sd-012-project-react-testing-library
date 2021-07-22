import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import pokemons from '../data';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa renderização do componente pokemon', () => {
  it('Verifica se o card é renderizado corretamente', () => {
    renderWithRouter(<App />);
    const { averageWeight, image, name, type } = pokemons[0];
    const { measurementUnit, value } = averageWeight;
    const pokemonName = screen.getByText(name);
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByText(`Average weight: ${value} ${measurementUnit}`);
    const pokemonImg = screen.getByRole('img');
    expect(pokemonName).toBeDefined();
    expect(pokemonType).toHaveTextContent(type);
    expect(pokemonWeight).toBeDefined();
    expect(pokemonImg.src).toBe(image);
    expect(pokemonImg.alt).toBe(`${name} sprite`);
  });

  it('Verifica se o card contém um link para detalhes do pokemon', () => {
    renderWithRouter(<App />);
    const { id } = pokemons[0];
    const detailsLink = screen.getByText(/More details/i);
    const wantedUrl = `/pokemons/${id}`;
    expect(detailsLink.href).toMatch(wantedUrl);
    // Matcher 'toMatch' utilizado de acordo com a documentação https://jestjs.io/pt-BR/docs/using-matchers
  });

  it('Testa se, ao clicar no link detalhes, direciona para a detailsPage', () => {
    const { history } = renderWithRouter(<App />);
    const { id } = pokemons[0];
    const detailsLink = screen.getByText('More details');
    userEvent.click(detailsLink);
    const { pathname } = history.location;
    expect(pathname).toMatch(`/pokemons/${id}`);
  });

  it('Testa se estrela é adicionada aos favoritos', () => {
    renderWithRouter(<App />);
    const detailsLink = screen.getByText('More details');
    userEvent.click(detailsLink);
    const addToFavorites = screen.getByLabelText('Pokémon favoritado?');
    userEvent.click(addToFavorites);
    const { name } = pokemons[0];
    const favoritePokemon = screen.getByAltText(`${name} is marked as favorite`);
    expect(favoritePokemon).toBeDefined();
    expect(favoritePokemon.src).toMatch('/star-icon.svg');
  });
});
