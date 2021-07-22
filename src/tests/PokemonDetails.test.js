// novamente inspirado na lógica de Eric Kreis
// https://github.com/tryber/sd-012-project-react-testing-library/pull/48/commits/634133feed6d76451f05d30454c5ab1635620404

import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

const pokemonList = pokemons[4];

describe('Testa o componente Pokemon Details', () => {
  it('Testa informações detalhadas do pokémon selecionado', () => {
    const { history } = renderWithRouter(<App />);
    const { name, id, summary } = pokemonList;
    history.push(`/pokemons/${id}`);

    expect(history.location.pathname).toBe(`/pokemons/${id}`);
    expect(screen.getByText(`${name} Details`)).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /more details/i })).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /summary/i })).toBeInTheDocument();
    expect(screen.getByText(/this enables it to use its abilities to their extremes/i))
      .toHaveTextContent(summary);
  });

  it('Testa se existe na página uma seção com os mapas', () => {
    const { history } = renderWithRouter(<App />);
    const { name, foundAt, id } = pokemonList;
    history.push(`/pokemons/${id}`);

    expect(history.location.pathname).toBe(`/pokemons/${id}`);

    expect(screen.getByText(`Game Locations of ${name}`)).toBeInTheDocument();
    const pokeImg = screen.queryByRole('img', { name: `${name} location` });
    expect(pokeImg.src).toBe(`${foundAt[0].map}`);
    expect(screen.getByText(`${foundAt[0].location}`)).toBeInTheDocument();
  });

  it('Testa se o usuário pode favoritar o pokémon através da página de detalhes', () => {
    const { history } = renderWithRouter(<App />);
    const { id, name } = pokemonList;
    history.push(`/pokemons/${id}`);

    const isFavorite = screen.getByLabelText(/pokémon favoritado/i);
    expect(isFavorite).toBeInTheDocument();
    expect(screen.queryByAltText(`${name} is marked as favorite`)).toBeNull();
    userEvent.click(isFavorite);
    expect(screen.queryByAltText(`${name} is marked as favorite`)).toBeInTheDocument();
  });
});
