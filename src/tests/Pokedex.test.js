import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import Pokedex from '../components/Pokedex';
import data from '../data';

describe('Testando o componente Pokedex', () => {
  const favoriteFake = {
    4: false,
    10: false,
    23: false,
    25: false,
    65: false,
    78: false,
    143: false,
    148: false,
    151: false,
  };

  beforeEach(() => {
    renderWithRouter(
      <Pokedex
        pokemons={ data }
        isPokemonFavoriteById={ favoriteFake }
      />,
    );
  });

  it(('Testando se a página contém o heading'), () => {
    const encounteredTitle = screen.getByText('Encountered pokémons');
    expect(encounteredTitle).toBeInTheDocument();
  });

  it(('Testando funcionalidade do "botão Próximo Pokémon"'), () => {
    const nextPokemonButton = screen.getByText('Próximo pokémon');
    expect(nextPokemonButton).toBeInTheDocument();
    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    const detailsButton = screen.getByText('More details');
    // Matcher -toHaveTextContent- visto no link shorturl.at/antT2;
    data.forEach(({ name, type, averageWeight: { value, measurementUnit } }) => {
      expect(pokemonName).toHaveTextContent(name);
      expect(pokemonType).toHaveTextContent(type);
      expect(pokemonWeight).toHaveTextContent(
        `Average weight: ${value} ${measurementUnit}`,
      );
      expect(detailsButton).toBeInTheDocument();
      userEvent.click(nextPokemonButton);
    });
  });

  it(('Testando botão de filtro'), () => {
    // const typeButton = screen.getAllByTestId('pokemon-type-button');
    const typesOfPokemon = data.reduce((types, { type }) => [...types, type], ['All']);
    typesOfPokemon.forEach((type) => {
      const typeButton = screen.getByRole('button', { name: type });
      expect(typeButton).toBeInTheDocument();
    });
  });

  it(('Testando o botão de resetar filtro'), () => {
    const allButton = screen.getByRole('button', { name: 'All' });
    expect(allButton).toBeInTheDocument();
    const pokemonName = screen.getByTestId('pokemon-name');
    const nextPokemonButton = screen.getByText('Próximo pokémon');
    data.forEach(({ name }) => {
      expect(pokemonName).toHaveTextContent(name);
      userEvent.click(nextPokemonButton);
    });
    const fireButton = screen.getByRole('button', { name: 'Fire' });
    userEvent.click(fireButton);
    userEvent.click(allButton);
    data.forEach(({ name }) => {
      expect(pokemonName).toHaveTextContent(name);
      userEvent.click(nextPokemonButton);
    });
  });
});
