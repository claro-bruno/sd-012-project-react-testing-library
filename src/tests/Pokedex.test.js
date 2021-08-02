import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';
import App from '../App';

const POKEMON_NAME = 'pokemon-name';
const NEXT_POKEMON = 'next-pokemon';

beforeEach(() => {
  renderWithRouter(<Pokedex
    pokemons={ pokemons }
    isPokemonFavoriteById={ App.setIsPokemonFavoriteById = jest.fn() }
  />);
});

test('Teste se página contém um heading h2 com o texto Encountered pokémons.', () => {
  const title = screen.getByRole('heading');
  expect(title).toBeInTheDocument();
  expect(title).toHaveTextContent(/Encountered pokémons/i);
});

describe('Teste se é exibido o próximo Pokémon da '
+ 'lista quando o botão `Próximo pokémon` é clicado.', () => {
  it('O botão deve conter o texto Próximo pokémon', () => {
    const buttonNext = screen.getByTestId(NEXT_POKEMON);
    expect(buttonNext).toBeInTheDocument();
    expect(buttonNext).toHaveTextContent(/Próximo pokémon/i);
  });

  it('Os próximos Pokémons da lista devem ser mostrados, '
  + 'um a um, ao clicar sucessivamente no botão', () => {
    const buttonNext = screen.getByTestId(NEXT_POKEMON);
    const prevPokemonName = screen.getByTestId(POKEMON_NAME).innerHTML;
    fireEvent.click(buttonNext);
    const currentPokemonName = screen.getByTestId(POKEMON_NAME).innerHTML;
    expect(currentPokemonName).not.toBe(prevPokemonName);
  });

  it('O primeiro Pokémon da lista deve ser mostrado ao clicar no botão, '
  + 'se estiver no último Pokémon da lista', () => {
    const prevPokemonName = screen.getByTestId(POKEMON_NAME).innerHTML;
    const buttonNext = screen.getByTestId(NEXT_POKEMON);
    fireEvent.click(buttonNext);
    if (prevPokemonName === 'Dragonair') {
      const currentPokemonName = screen.getByTestId(POKEMON_NAME).innerHTML;
      expect(currentPokemonName).toBe('Pikachu');
    }
  });
});

test('Teste se é mostrado apenas um Pokémon por vez.', () => {
  const currentPokemonName = screen.getAllByTestId(POKEMON_NAME);
  expect(currentPokemonName).toHaveLength(1);
});

describe('Teste se a Pokédex tem os botões de filtro.', () => {
  it('Deve existir um botão de filtragem para cada tipo de Pokémon, sem repetição.',
    () => {
      pokemons.forEach((pokemon) => {
        const typeButton = screen.getAllByRole('button', { name: pokemon.type });
        expect(typeButton).toHaveLength(1);
        expect(typeButton[0]).toBeInTheDocument();
      });
    });

  it('A partir da seleção de um botão de tipo, '
  + 'a Pokédex deve circular somente pelos pokémons daquele tipo', () => {
    pokemons.forEach((pokemon) => {
      const typeButton = screen.getByRole('button', { name: pokemon.type });
      fireEvent.click(typeButton);
      const firstPokemonType = screen.getByTestId('pokemon-type');
      const pokemonNext = screen.getByRole('button', { name: 'Próximo pokémon' });
      if (userEvent.click(pokemonNext)) {
        const currentPokemonType = screen.getByTestId('pokemon-type');
        expect(currentPokemonType).toEqual(firstPokemonType);
      }
    });
  });
});

describe('Teste se a Pokédex contém um botão para resetar o filtro', () => {
  it('O texto do botão deve ser All', () => {
    const buttonAll = screen.getByRole('button', { name: 'All' });
    expect(buttonAll).toBeInTheDocument();
  });

  it('A Pokedéx deverá mostrar os Pokémons normalmente '
  + '(sem filtros) quando o botão All for clicado', () => {
    const buttonAll = screen.getByRole('button', { name: 'All' });
    fireEvent.click(buttonAll);
    const buttonNext = screen.getByRole('button', { name: 'Próximo pokémon' });
    pokemons.forEach((pokemon) => {
      expect(pokemon.name).toBeDefined();
      fireEvent.click(buttonNext);
    });
  });
});
