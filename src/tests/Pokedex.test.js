import React from 'react';
import { cleanup, fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';

const isPokemonFavorite = pokemons.reduce((acc, pokemon) => {
  acc[pokemon.id] = false;
  return acc;
}, {});

const pokemonListName = pokemons.map(({ name }) => name);

const lastOne = pokemonListName.length - 1;

const pokemonTypes = [...new Set(pokemons.map(({ type }) => type))];

const psychicPokemons = pokemons.filter(({ type }) => type === 'Psychic');

const proximoPokemon = 'Próximo pokémon';
const idPokemonName = 'pokemon-name';

describe('Testes do componente Pokedex', () => {
  beforeEach(() => renderWithRouter(
    <Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavorite }
    />,
  ));
  afterEach(cleanup);

  it('Testa se a página contém um heading h2 com um texto específico', () => {
    const encounteredText = screen.getByRole('heading', { level: 2 });
    expect(encounteredText).toHaveTextContent('Encountered pokémons');
  });

  it('Testa se o botão contem o texto Próximo pokémon', () => {
    const nextButton = screen.getByRole('button', { name: proximoPokemon });
    expect(nextButton).toBeInTheDocument();
  });

  it('Testa se os próximos pokémons são mostrados um a um ao clicar no botão', () => {
    const nextButton = screen.getByRole('button', { name: proximoPokemon });
    pokemonListName.forEach((pokemon) => {
      const pokemonName = screen.getByTestId(idPokemonName);
      expect(pokemonName).toHaveTextContent(pokemon);
      fireEvent.click(nextButton);
    });
  });

  it('Testa se o primeiro pokémon é mostrado depois do último ao clicar no botão', () => {
    const nextButton = screen.getByRole('button', { name: proximoPokemon });
    const firstPokemon = screen.getByText(pokemonListName[0]);
    pokemonListName.forEach((pokemon, index) => {
      if (index < lastOne) fireEvent.click(nextButton);
      fireEvent.click(nextButton);
      expect(firstPokemon).toBeInTheDocument();
    });
  });

  it('Testa se é mostrado apenas um pokémon por vez', () => {
    const images = screen.getAllByTestId(idPokemonName);
    expect(images).toHaveLength(1);
  });

  it('Testa se existe um botão de filtragem para cada tipo de Pokémon', () => {
    pokemonTypes.forEach((type) => {
      const typeButton = screen.getByRole('button', { name: type });
      expect(typeButton).toBeInTheDocument();
    });
    const quantityTypes = pokemonTypes.length;
    const typeButtons = screen.getAllByTestId(/pokemon-type-button/i);
    expect(typeButtons).toHaveLength(quantityTypes);
  });

  it('Testa filtragem por tipo a partir do clique do botão', () => {
    const psychicButton = screen.getByRole('button', { name: 'Psychic' });
    psychicPokemons.forEach(({ type }) => {
      expect(type).toBe('Psychic');
      fireEvent.click(psychicButton);
    });
  });

  it('Testa se o botão All está sempre visível', () => {
    const allButton = screen.getByRole('button', { name: 'All' });
    expect(allButton).toBeInTheDocument();
  });

  it('Testa se o texto do botão é All', () => {
    const allButton = screen.getByRole('button', { name: 'All' });
    expect(allButton).toHaveTextContent('All');
  });

  it('Testa se a Pokedex mostra os Pokemons sem filtros após clicar no botão All', () => {
    const allButton = screen.getByRole('button', { name: 'All' });
    const nextButton = screen.getByRole('button', { name: proximoPokemon });
    const pokemonName = screen.getByTestId(idPokemonName);
    fireEvent.click(allButton);
    pokemonListName.forEach((pokemon) => {
      expect(pokemonName).toHaveTextContent(pokemon);
      fireEvent.click(nextButton);
    });
  });
});
