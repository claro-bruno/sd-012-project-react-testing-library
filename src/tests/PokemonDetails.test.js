import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import PokemonDetails from '../components/PokemonDetails';
import pokemons from '../data';

const match = { params: { id: 25 } };

describe('Testes para o componente PokemonDetails', () => {
  it('Testa se aparecem as informacoes detalhes na tela', () => {
    const pokemonSelected = pokemons
      .find((pokemon) => pokemon.id === match.params.id);
    const { name, summary } = pokemonSelected;
    renderWithRouter(
      <PokemonDetails
        pokemons={ pokemons }
        match={ match }
        isPokemonFavoriteById={ { 25: true } }
      />,
    );
    const detailsTitle = screen.getByRole('heading', { name: `${name} Details` });
    const linkToDetails = screen.queryByRole('link', /More Details/i);
    const summaryTitle = screen.getByRole('heading', { name: /Summary/i });
    const pokeSummary = screen.getByText(summary);
    expect(detailsTitle).toBeInTheDocument();
    expect(linkToDetails).toBeNull();
    expect(summaryTitle).toBeInTheDocument();
    expect(pokeSummary).toBeInTheDocument();
  });

  it('Teste que verifica se ha uma secao com mapas da localizacao do pokemon', () => {
    const pokemonSelected = pokemons
      .find((pokemon) => pokemon.id === match.params.id);
    renderWithRouter(
      <PokemonDetails
        pokemons={ pokemons }
        match={ match }
        isPokemonFavoriteById={ { 25: true } }
      />,
    );
    const locationsTitle = screen
      .getByRole('heading', { name: `Game Locations of ${pokemon.name}` });
    expect(locationsTitle).toBeInTheDocument();
    pokemonSelected.foundAt.forEach(({ location, map }, index) => {
      const locationName = screen.getByText(location);
      const locationImage = screen.getAllByAltText(`${pokemon.name} location`);
      expect(locationName).toBeInTheDocument();
      expect(locationImage[index]).toHaveAttribute('src', map);
    });
  });
});
