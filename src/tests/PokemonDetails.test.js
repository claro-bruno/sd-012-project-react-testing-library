import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';
import App from '../App';
import * as pokedexService from '../services/pokedexService';

const pokemon = pokemons[0];
const { name, id, summary, foundAt } = pokemon;
const mapQty = foundAt.length;
const favorites = [];

jest.mock('../services/pokedexService');

pokedexService.updateFavoritePokemons.mockImplementation((idItem) => {
  console.log('mockou');
  favorites.push(idItem);
});

pokedexService.readFavoritePokemonIds.mockImplementation(() => favorites);

describe('Testa o componente PokemonDetails', () => {
  it('verifica as informações detalhadas do pokemon selecionado', () => {
    const { history } = renderWithRouter(<App />);
    history.push(`/pokemons/${id}`);

    const nameDetails = screen.queryByRole('heading', { name: `${name} Details` });
    expect(nameDetails).toBeInTheDocument();

    const linkDetail = screen.queryByRole('link', { name: 'More details' });
    expect(linkDetail).not.toBeInTheDocument();

    const summaryTitle = screen.getByRole('heading', { name: 'Summary' });
    expect(summaryTitle).toBeInTheDocument();

    const summaryText = screen.getByText(summary);
    expect(summaryText).toBeInTheDocument();
  });

  it('verifica se exibe mapas com a localização do pokemon em exibição', () => {
    const { history } = renderWithRouter(<App />);

    const locationName = `Game Locations of ${name}`;
    history.push(`/pokemons/${id}`);
    const locationTitle = screen.getByRole('heading', { name: locationName });
    expect(locationTitle).toBeInTheDocument();

    const maps = screen.getAllByAltText(`${name} location`);
    expect(maps).toHaveLength(mapQty);
    const srcs = maps.map(({ src }) => src);
    foundAt.forEach(({ location, map }) => {
      const locationText = screen.getByText(location);
      expect(locationText).toBeInTheDocument();
      expect(srcs).toContain(map);
    });
  });

  it('Testa se o usuário pode favoritar um pokémon através da página de detalhes', () => {
    const { history } = renderWithRouter(<App />);
    history.push(`/pokemons/${id}`);
    const favorite = screen.getByLabelText('Pokémon favoritado?');
    expect(favorite).toBeInTheDocument();
    fireEvent.click(favorite);
    expect(favorite).toBeChecked();
    expect(pokedexService.updateFavoritePokemons).toHaveBeenCalled();
    expect(favorites).toContain(id);
  });
});
