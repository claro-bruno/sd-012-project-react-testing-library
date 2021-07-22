import React from 'react';
import { screen } from '@testing-library/react';
import event from '@testing-library/user-event';
import { Pokedex } from '../components';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';
import mockIsPokemonFavoriteById from '../__mocks__/mockIsPokemonFavoriteById';
import mockPokemonTypes from '../__mocks__/mockPokemonTypes';

describe('Teste do componente <Pokedex />', () => {
  beforeEach(() => renderWithRouter(
    <Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ mockIsPokemonFavoriteById }
    />,
  ));

  it(
    'A página contém um heading "h2" com o texto "Encountered pokémons"',
    () => {
      const pokedexTitle = screen.getByRole('heading', { name: 'Encountered pokémons' });
      expect(pokedexTitle).toBeInTheDocument();
    },
  );

  it(
    'Apenas um Pokémon é mostrado por vez',
    () => {
      const pokemonsByTestId = screen.getAllByTestId('pokemon-name');
      expect(pokemonsByTestId.length).toBe(1);
    },
  );

  it(
    'Os botões de filtro por tipo de Pokémon existem na Pokédex e funcionam corretamente',
    () => {
      const filterByTypeButtons = screen.getAllByTestId('pokemon-type-button');
      expect(filterByTypeButtons.length).toBe(mockPokemonTypes.length);

      const filterByPsychicBtn = screen.getByRole('button', { name: 'Psychic' });
      event.click(filterByPsychicBtn);

      const psychicPokemons = pokemons.filter(({ type }) => type === 'Psychic');
      const nextPokemonBtn = screen.getByTestId('next-pokemon');
      psychicPokemons.forEach((_pokemon, index, array) => {
        if ((array.length - 1) === index) {
          const { name } = array[0];
          event.click(nextPokemonBtn);
          expect(screen.getByText(name)).toBeInTheDocument();
        } else {
          event.click(nextPokemonBtn);
          const { name } = array[index + 1];
          expect(screen.getByText(name)).toBeInTheDocument();
        }
      });
    },
  );

  it(
    'A Pokédex contém o botão "All" para resetar o filtro',
    () => {
      const allBtn = screen.getByRole('button', { name: 'All' });
      expect(allBtn).toBeInTheDocument();
      event.click(allBtn);

      const nextPokemonBtn = screen.getByTestId('next-pokemon');
      pokemons.forEach(({ name }) => {
        expect(screen.getByTestId('pokemon-name')).toHaveTextContent(name);
        event.click(nextPokemonBtn);
      });
    },
  );
});
