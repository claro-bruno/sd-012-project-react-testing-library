import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import PokemonDetails from '../components/PokemonDetails';
import pokemons from '../data';

const match = { params: { id: 25 } };
const favoritePokemon = { 25: true };

describe('Testes para o componente PokemonDetails', () => {
  const pokemonSelected = pokemons
    .find((pokemon) => pokemon.id === match.params.id);
  const { name, summary, foundAt } = pokemonSelected;
  it('Verifica se aparecem as informacoes detalhes na tela', () => {
    renderWithRouter(
      <PokemonDetails
        pokemons={ pokemons }
        match={ match }
        isPokemonFavoriteById={ favoritePokemon }
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

  it('Verifica se ha uma secao com mapas da localizacao do pokemon', () => {
    renderWithRouter(
      <PokemonDetails
        pokemons={ pokemons }
        match={ match }
        isPokemonFavoriteById={ favoritePokemon }
      />,
    );
    const locationsTitle = screen
      .getByRole('heading', { name: `Game Locations of ${name}` });
    expect(locationsTitle).toBeInTheDocument();
    foundAt.forEach(({ location, map }, index) => {
      const locationName = screen.getByText(location);
      const locationImage = screen.getAllByAltText(`${name} location`);
      expect(locationName).toBeInTheDocument();
      expect(locationImage[index]).toHaveAttribute('src', map);
    });
  });

  it('Verifica se ha um checkbox para favoritar e se ele funciona', () => {
    // ideia retirada do codigo do rogrigo merlone : https://github.com/tryber/sd-012-project-react-testing-library/pull/2/files
    renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', { name: /More Details/i });
    userEvent.click(detailsLink);
    const favCheckbox = screen.getByLabelText(/Pokémon favoritado\?/i);
    expect(favCheckbox).toBeInTheDocument();
    userEvent.click(favCheckbox);
    const favIcon = screen.getByAltText(`${name} is marked as favorite`);
    expect(favIcon).toBeInTheDocument();
  });
});
