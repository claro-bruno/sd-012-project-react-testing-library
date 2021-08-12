import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import { Pokedex } from '../components';
import App from '../App';
import {
  TEST_ID_NAME,
  TEST_ID_TYPE,
  NEXT_POKEMON,
  pokemons,
  pokemonNull,
  single,
  setIsPokemonFavoriteById,
} from './data';

describe('5. Teste o componente <Pokedex.js />', () => {
  it('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ setIsPokemonFavoriteById }
      />,
    );
    const headingsList = screen.getAllByRole('heading');
    const headingText = 'Encountered pokémons';
    const listLength = 1;

    expect(headingsList).toHaveLength(listLength);
    expect(headingsList[0]).toBeInTheDocument();
    expect(headingsList[0]).toHaveTextContent(headingText);
  });

  it('Teste se é exibido o próximo Pokémon'
    + ' da lista quando o botão Próximo pokémon é clicado', () => {
    const { history } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ setIsPokemonFavoriteById }
      />,
    );
    const listLength = 1;
    const nextPokemon = screen.getByText(NEXT_POKEMON);
    let pokemon = [];

    expect(history.location.pathname).toBe('/');

    pokemon = screen.getAllByTestId(TEST_ID_NAME);
    expect(pokemon).toHaveLength(listLength);
    expect(pokemon[0]).toBeInTheDocument();
    expect(pokemon[0]).toHaveTextContent(pokemons[0].name);
    expect(history.location.pathname).toBe('/');

    expect(nextPokemon).toBeInTheDocument();
    userEvent.click(nextPokemon);
    pokemon = screen.getAllByTestId(TEST_ID_NAME);
    expect(pokemon).toHaveLength(listLength);
    expect(pokemon[0]).toBeInTheDocument();
    expect(pokemon[0]).toHaveTextContent(pokemons[1].name);
    expect(history.location.pathname).toBe('/');

    expect(nextPokemon).toBeInTheDocument();
    userEvent.click(nextPokemon);
    pokemon = screen.getAllByTestId(TEST_ID_NAME);
    expect(pokemon[0]).toBeInTheDocument();
    expect(pokemon[0]).toHaveTextContent(pokemons[2].name);
    expect(history.location.pathname).toBe('/');

    expect(nextPokemon).toBeInTheDocument();
    userEvent.click(nextPokemon);
    pokemon = screen.getAllByTestId(TEST_ID_NAME);
    expect(pokemon[0]).toBeInTheDocument();
    expect(pokemon[0]).toHaveTextContent(pokemons[0].name);
    expect(history.location.pathname).toBe('/');
  });

  it('Teste se é mostrado apenas um Pokémon por vez.', () => {
    const { history } = renderWithRouter(<App />);

    expect(history.location.pathname).toBe('/');

    const firstPokemon = screen.getAllByTestId(TEST_ID_NAME);
    const listLength = 1;

    expect(firstPokemon).toHaveLength(listLength);
    expect(firstPokemon[0]).toBeInTheDocument();
    expect(firstPokemon[0]).toHaveTextContent(pokemons[1].name);
    expect(history.location.pathname).toBe('/');
  });
});

describe('5. Teste o componente <Pokedex.js /> parte 2', () => {
  it('Teste se a Pokédex tem os botões de filtro.', () => {
    const { history } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ setIsPokemonFavoriteById }
      />,
    );
    const listLength = 4;
    const buttonsList = screen.getAllByRole('button');
    let pokemon = [];

    expect(history.location.pathname).toBe('/');
    expect(buttonsList).toHaveLength(listLength);
    expect(buttonsList[0]).toBeInTheDocument();
    expect(buttonsList[0]).toHaveTextContent('All');
    expect(buttonsList[0]).toBeInTheDocument();
    expect(buttonsList[1]).toBeInTheDocument();
    expect(buttonsList[1]).toHaveTextContent(pokemons[0].type);
    expect(buttonsList[0]).toBeInTheDocument();
    expect(buttonsList[2]).toBeInTheDocument();
    expect(buttonsList[2]).toHaveTextContent(pokemons[1].type);

    userEvent.click(buttonsList[1]);
    pokemon = screen.getAllByTestId(TEST_ID_TYPE);
    expect(pokemon).toHaveLength(single);
    expect(pokemon[0]).toBeInTheDocument();
    expect(buttonsList[0]).toBeInTheDocument();
    expect(pokemon[0]).toHaveTextContent(pokemons[0].type);
    expect(history.location.pathname).toBe('/');

    userEvent.click(buttonsList[3]);
    pokemon = screen.getAllByTestId(TEST_ID_TYPE);
    expect(pokemon).toHaveLength(single);
    expect(pokemon[0]).toBeInTheDocument();
    expect(buttonsList[0]).toBeInTheDocument();
    expect(pokemon[0]).toHaveTextContent(pokemons[0].type);
    expect(history.location.pathname).toBe('/');

    userEvent.click(buttonsList[2]);
    expect(buttonsList[3]).toHaveAttribute('disabled');
    pokemon = screen.getAllByTestId(TEST_ID_TYPE);
    expect(pokemon).toHaveLength(single);
    expect(pokemon[0]).toBeInTheDocument();
    expect(buttonsList[0]).toBeInTheDocument();
    expect(pokemon[0]).toHaveTextContent(pokemons[1].type);
    expect(history.location.pathname).toBe('/');
  });

  it('Teste se o Botão All sempre aparece', () => {
    const { history } = renderWithRouter(
      <Pokedex
        pokemons={ pokemonNull }
        isPokemonFavoriteById={ setIsPokemonFavoriteById }
      />,
    );
    const listLength = 3;
    const buttonsList = screen.getAllByRole('button');
    expect(history.location.pathname).toBe('/');
    expect(buttonsList).toHaveLength(listLength);
    expect(buttonsList[0]).toBeInTheDocument();
    expect(buttonsList[0]).toHaveTextContent('All');
  });
  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    const { history } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ setIsPokemonFavoriteById }
      />,
    );
    let pokemon = [];
    const listLength = 4;
    const buttonsList = screen.getAllByRole('button');
    buttonsList.forEach((button) => console.log(button.innerHTML));
    expect(history.location.pathname).toBe('/');
    expect(buttonsList).toHaveLength(listLength);
    expect(buttonsList[0]).toBeInTheDocument();
    expect(buttonsList[0]).toHaveTextContent('All');

    userEvent.click(buttonsList[1]);
    userEvent.click(buttonsList[3]);
    pokemon = screen.getAllByTestId(TEST_ID_TYPE);
    expect(pokemon).toHaveLength(single);
    expect(pokemon[0]).toBeInTheDocument();
    expect(buttonsList[0]).toBeInTheDocument();
    expect(pokemon[0]).toHaveTextContent(pokemons[0].type);
    expect(history.location.pathname).toBe('/');

    userEvent.click(buttonsList[3]);
    userEvent.click(buttonsList[0]);
    pokemon = screen.getAllByTestId(TEST_ID_TYPE);
    expect(pokemon).toHaveLength(single);
    expect(pokemon[0]).toBeInTheDocument();
    expect(buttonsList[0]).toBeInTheDocument();
    expect(pokemon[0]).toHaveTextContent(pokemons[0].type);
    expect(history.location.pathname).toBe('/');

    userEvent.click(buttonsList[3]);
    pokemon = screen.getAllByTestId(TEST_ID_TYPE);
    expect(pokemon).toHaveLength(single);
    expect(pokemon[0]).toBeInTheDocument();
    expect(buttonsList[0]).toBeInTheDocument();
    expect(pokemon[0]).toHaveTextContent(pokemons[1].type);
    expect(history.location.pathname).toBe('/');

    userEvent.click(buttonsList[3]);
    pokemon = screen.getAllByTestId(TEST_ID_TYPE);
    expect(pokemon).toHaveLength(single);
    expect(pokemon[0]).toBeInTheDocument();
    expect(buttonsList[0]).toBeInTheDocument();
    expect(pokemon[0]).toHaveTextContent(pokemons[2].type);
    expect(history.location.pathname).toBe('/');
  });
});
