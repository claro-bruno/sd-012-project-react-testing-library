import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Pokedex from '../components/Pokedex';
import App from '../App';
import pokemons from '../data';

describe('Testa todo Pokedex.js', () => {
  const nextPokemonId = 'next-pokemon';
  const pokemonNameId = 'pokemon-name';

  const types = [...new Set(pokemons
    .reduce((Types, { type }) => [...Types, type], []))];

  const isPokemonFavoriteById = App.setIsPokemonFavoriteById();

  it('renderiza titulo "Encountered pokémons"', () => {
    const { history } = renderWithRouter(<App />);

    const { pathname } = history.location;
    expect(pathname).toBe('/');

    const heading = screen.getByRole('heading', { name: /Encountered pokémons/i });
    expect(heading).toBeInTheDocument();
  });

  it('clicando no botão "Próximo pokémon"', () => {
    // const isPokemonFavoriteById = App.setIsPokemonFavoriteById();
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);

    const btnNext = screen.getByTestId(nextPokemonId);
    expect(btnNext).toBeInTheDocument();

    const firstPokemon = screen.getByTestId(pokemonNameId);
    expect(firstPokemon).toHaveTextContent(pokemons[0].name);

    userEvent.click(btnNext);
    const secondPokemon = screen.getByTestId(pokemonNameId);
    expect(secondPokemon).toHaveTextContent(pokemons[1].name);
  });

  it('clicando diversas vezes no botão "Próximo pokémon', () => {
    // const isPokemonFavoriteById = App.setIsPokemonFavoriteById();
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);

    const btnNext = screen.getByTestId(nextPokemonId);
    expect(btnNext).toBeInTheDocument();

    const firstPokemon = screen.getByTestId(pokemonNameId);
    expect(firstPokemon).toHaveTextContent(pokemons[0].name);

    pokemons.forEach(() => {
      userEvent.click(btnNext);
    });

    const afterClicks = screen.getByTestId(pokemonNameId);
    expect(afterClicks).toHaveTextContent(pokemons[0].name);
  });

  it('mostra apenas um pokemon', () => {
    // const isPokemonFavoriteById = App.setIsPokemonFavoriteById();
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);

    const firstPokemon = screen.queryByText(pokemons[0].name);
    expect(firstPokemon).toBeInTheDocument();

    const secondPokemon = screen.queryByText(pokemons[1].name);
    expect(secondPokemon).not.toBeInTheDocument();
  });

  it('renderiza botões de filtro', () => {
    // const isPokemonFavoriteById = App.setIsPokemonFavoriteById();
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);

    types.forEach((type) => {
      const btnType = screen.getByRole('button', { name: type });
      expect(btnType).toBeInTheDocument();
    });

    const oneType = pokemons.filter((pokemon) => pokemon.type === 'Fire');
    const btnFire = screen.getByRole('button', { name: /Fire/i });

    userEvent.click(btnFire);
    const firstPokemon = screen.getByTestId(pokemonNameId);
    expect(firstPokemon).toHaveTextContent(oneType[0].name);

    const btnNext = screen.getByTestId(nextPokemonId);

    const btnAll = screen.getByRole('button', { name: /All/i });
    expect(btnAll).toBeInTheDocument();

    userEvent.click(btnNext);
    const afterClick01 = screen.getByTestId(pokemonNameId);
    expect(afterClick01).toHaveTextContent(oneType[1].name);

    userEvent.click(btnNext);
    const afterClick02 = screen.getByTestId(pokemonNameId);
    expect(afterClick02).toHaveTextContent(oneType[0].name);
  });

  it('renderiza botão "All"', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);

    const secondBtnType = screen.getByRole('button', { name: types[1] });
    userEvent.click(secondBtnType);

    const pokemonName = screen.getByTestId(pokemonNameId);
    expect(pokemonName).not.toHaveTextContent(pokemons[0].name);

    const btnAll = screen.getByRole('button', { name: /All/i });
    userEvent.click(btnAll);

    const pokemonAfterClick = screen.getByTestId(pokemonNameId);
    expect(pokemonAfterClick).toHaveTextContent(pokemons[0].name);
  });
});
