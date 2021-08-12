import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';
import pokemons from '../data';

describe('Requisito 5', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  const btnName = 'Próximo pokémon';
  const pokemonName = 'pokemon-name';
  const types = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
  const typeButtonTestId = 'pokemon-type-button';

  it('Teste se página contém um heading h2 com o texto Encountered pokémons.', () => {
    const headingPokedex = screen.getByRole('heading',
      { level: 2, name: 'Encountered pokémons' });
    expect(headingPokedex).toBeInTheDocument();
  });

  it('O botão deve conter o texto Próximo pokémon', () => {
    const nextPokemonBtn = screen.getByRole('button', { name: btnName });
    expect(nextPokemonBtn).toBeInTheDocument();
  });

  it('Testa se é mostrado o próximo pokémon da lista ao clicar no botão', () => {
    const firstPokemon = screen.getByTestId(pokemonName);
    const nextPokemonBtn = screen.getByRole('button', { name: btnName });
    pokemons.forEach((_pokemon, index) => {
      if (index < pokemons.length - 1) {
        fireEvent.click(nextPokemonBtn);
        const thisPokemon = screen.getByTestId(pokemonName);
        expect(thisPokemon).toHaveTextContent(pokemons[index + 1].name);
      } else {
        fireEvent.click(nextPokemonBtn);
        expect(firstPokemon).toHaveTextContent(pokemons[0].name);
      }
    });
  });

  it('Teste se é mostrado apenas um Pokémon por vez.', () => {
    const pokemonOnScreen = screen.getAllByTestId(pokemonName);
    expect(pokemonOnScreen).toHaveLength(1);
  });

  it('Teste se a Pokédex tem os botões de filtro.', () => {
    const buttonsOnScreen = screen.getAllByTestId(typeButtonTestId);
    expect(buttonsOnScreen).toHaveLength(types.length);
  });

  it('Deve existir um botão de filtragem para cada tipo de Pokémon', () => {
    const buttonsOnScreen = screen.getAllByTestId(typeButtonTestId);
    buttonsOnScreen.forEach(
      (button, index) => expect(button.textContent).toBe(types[index]),
    );
    expect(buttonsOnScreen).toHaveLength(types.length);
  });

  it('A Pokédex deve circular somente pelos pokémons do tipo selecionado', () => {
    const electricButtonType = screen.getByRole('button', { name: 'Electric' });
    fireEvent.click(electricButtonType);
    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType.textContent).toBe('Electric');
  });

  it('O texto do botão deve corresponder ao nome do tipo, ex. Psychic', () => {
    const buttonsOnScreen = screen.getAllByTestId(typeButtonTestId);
    buttonsOnScreen.forEach(
      (button, index) => expect(button.textContent).toBe(types[index]),
    );
  });

  it('O botão All precisa estar sempre visível.', () => {
    const buttonsOnScreen = screen.getAllByTestId(typeButtonTestId);
    const buttonAll = screen.getByRole('button', { name: 'All' });
    buttonsOnScreen.forEach((button) => {
      fireEvent.click(button);
      expect(buttonAll).toBeInTheDocument();
    });
  });

  it('O texto do botão deve ser All;', () => {
    const buttonAll = screen.getByRole('button', { name: 'All' });
    expect(buttonAll).toHaveTextContent('All');
  });
});

it('A Pokedéx deverá mostrar todos os pokemons, quando o botão All for clicado', () => {
  const { history } = renderWithRouter(<App />);
  expect(history.location.pathname).toBe('/');
  const buttonAll = screen.getByRole('button', { name: 'All' });
  fireEvent.click(buttonAll);
  const nextPokemonBtn = screen.getByRole('button', { name: 'Próximo pokémon' });
  pokemons.forEach((pokemon) => {
    const actualPokemon = screen.getByTestId('pokemon-name');
    expect(actualPokemon).toHaveTextContent(pokemon.name);
    fireEvent.click(nextPokemonBtn);
  });
});
