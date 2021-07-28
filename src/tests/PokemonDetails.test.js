import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import pokemons from '../data';
import App from '../App';

const { id, foundAt, name, summary } = pokemons[0];

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={ history }>{component}</Router>), history,
  });
};

describe(' Testa o componente <PokemonDetails.js />', () => {
  test('Se as informações detalhadas do Pokemons são exibidas', () => {
    const { history } = renderWithRouter(<App />);
    history.push(`/pokemons/${id}`);

    const pokemonTitleTxt = `${name} Details`;
    const pokemonTitle = screen.getByText(pokemonTitleTxt);
    expect(pokemonTitle).toBeInTheDocument();

    const moreDetails = screen.queryByRole('link', { name: 'More Details' });
    expect(moreDetails).not.toBeInTheDocument();

    const headingSummary = screen.getByRole('heading', { name: 'Summary' });
    expect(headingSummary).toBeInTheDocument();

    const paragraph = screen.getByText(summary);
    expect(paragraph).toBeInTheDocument();
  });
  test('Se existe uma seção com os mapas contendo as localizações do pokémon', () => {
    const { history } = renderWithRouter(<App />);
    history.push(`/pokemons/${id}`);

    const pokemonGameLocation = `Game Locations of ${name}`;
    const gameLocation = screen.getByRole('heading', { name: pokemonGameLocation });
    expect(gameLocation).toBeInTheDocument();

    const altImg = `${name} location`;
    const allLocations = screen.getAllByAltText(altImg);
    expect(allLocations.length).toBe(foundAt.length);

    foundAt.forEach(({ location, map }, index) => {
      const pokemonLocation = screen.getByText(location);
      expect(pokemonLocation).toBeInTheDocument();

      expect(allLocations[index]).toHaveAttribute('src', map);
      expect(allLocations[index]).toHaveAttribute('alt', `${name} location`);
    });
  });
  test('Se o usuário pode favoritar um pokémon através da página de detalhes', () => {
    const { history } = renderWithRouter(<App />);
    history.push(`/pokemons/${id}`);

    const favorite = screen.getByRole('checkbox', { name: 'Pokémon favoritado?' });
    expect(favorite).toBeInTheDocument();

    expect(favorite).not.toBeChecked();
    fireEvent.click(favorite);
    expect(favorite).toBeChecked();
    fireEvent.click(favorite);
    expect(favorite).not.toBeChecked();
  });
});
