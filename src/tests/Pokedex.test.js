import React from 'react';
import { screen, fireEvent } from '@testing-library/react';

import App from '../App';
import renderWithRouter from '../helper/renderWithRouter';

import pokemons from '../data';

const nameTestId = 'pokemon-name';
const typeTestId = 'pokemon-type';
const typeButtonTestId = 'pokemon-type-button';

const pokemonTypes = pokemons.map((pokemon) => pokemon.type);
const uniquePokemonTypes = [...new Set(pokemonTypes)];

const checkAllPokemons = (nextPkmBtn) => {
  pokemons.forEach((pokemon) => {
    const pokemonName = screen.getByTestId(nameTestId);
    expect(pokemonName).toHaveTextContent(pokemon.name);
    fireEvent.click(nextPkmBtn);
  });
};

describe('[ 5 ] Testa o componente Pokedex.js', () => {
  describe('Testa o heading da página', () => {
    test('Testa se página contém um h2 com o texto Encountered pokémons', () => {
      renderWithRouter(<App />);
      const h2 = screen.getByRole('heading', { name: /Encountered pokémons/i });
      expect(h2).toBeInTheDocument();
    });
  });
  describe('Testa se exibe o próximo Pokémon se Próximo pokémon é clicado', () => {
    test('O botão deve conter o texto Próximo pokémon', () => {
      renderWithRouter(<App />);
      const nextPkmBtn = screen.getByRole('button', { name: /Próximo pokémon/i });
      expect(nextPkmBtn).toBeInTheDocument();
    });
    test('Os próximos Pokémons são mostrados, um a um, ao clicar sucessivamente no botão',
      () => {
        renderWithRouter(<App />);
        const nextPkmBtn = screen.getByRole('button', { name: /Próximo pokémon/i });
        checkAllPokemons(nextPkmBtn);
      });
    test('O primeiro Pokémon deve ser mostrado se estiver no último Pokémon da lista',
      () => {
        renderWithRouter(<App />);
        const nextPkmBtn = screen.getByRole('button', { name: /Próximo pokémon/i });
        pokemons.forEach(() => {
          fireEvent.click(nextPkmBtn);
        });
        const firstPokemon = screen.getByTestId(nameTestId);
        expect(firstPokemon).toHaveTextContent(pokemons[0].name);
      });
  });
  describe('Testa se é mostrado apenas um Pokémon por vez', () => {
    test('Testa se é mostrado apenas um Pokémon por vez', () => {
      renderWithRouter(<App />);
      const onlyOnePokemon = screen.getAllByTestId(nameTestId);
      expect(onlyOnePokemon).toHaveLength(1);
    });
  });
  describe('Testa se a Pokédex tem os botões de filtro', () => {
    test('Deve existir um botão para cada tipo de Pokémon, sem repetição', () => {
      renderWithRouter(<App />);
      uniquePokemonTypes.forEach((pokemonType, index) => {
        expect(screen.getAllByTestId(typeButtonTestId)[index])
          .toHaveTextContent(pokemonType);
      });
    });
    test('Se selecionado Tipo, a Pokédex deve circular apenas por pokémons daquele tipo',
      () => {
        renderWithRouter(<App />);
        uniquePokemonTypes.forEach((pokemonType, index) => {
          fireEvent.click(screen.getAllByTestId(typeButtonTestId)[index]);
          fireEvent.click(screen.getByTestId('next-pokemon'));
          expect(screen.getByTestId(typeTestId)).toHaveTextContent(pokemonType);
        });
      });
    test('O texto do botão deve corresponder ao nome do tipo, ex. Psychic',
      () => {
        renderWithRouter(<App />);
        uniquePokemonTypes.forEach((pokemonType, index) => {
          fireEvent.click(screen.getAllByTestId(typeButtonTestId)[index]);
          expect(screen.getByTestId(typeTestId)).toHaveTextContent(pokemonType);
        });
      });
    test('O botão All precisa estar sempre visível', () => {
      renderWithRouter(<App />);
      uniquePokemonTypes.forEach((pokemonType, index) => {
        fireEvent.click(screen.getAllByTestId(typeButtonTestId)[index]);
        fireEvent.click(screen.getByTestId('next-pokemon'));
        expect(screen.getByRole('button', { name: /all/i })).toBeInTheDocument();
      });
    });
  });
  describe('Testa se a Pokédex contém um botão para resetar o filtro', () => {
    test('O texto do botão deve ser All', () => {
      renderWithRouter(<App />);
      expect(screen.getByRole('button', { name: /all/i })).toHaveTextContent('All');
    });
    test('A Pokedéx deverá mostrar os Pokémons sem filtros quando All for clicado',
      () => {
        renderWithRouter(<App />);
        const nextPkmBtn = screen.getByRole('button', { name: /Próximo pokémon/i });
        uniquePokemonTypes.forEach((pokemonType, index) => {
          fireEvent.click(screen.getAllByTestId(typeButtonTestId)[index]);
          fireEvent.click(screen.getByRole('button', { name: /all/i }));
          checkAllPokemons(nextPkmBtn);
        });
      });
  });
});
