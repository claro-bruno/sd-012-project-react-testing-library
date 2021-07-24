import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RenderWithRouter from './RenderWithRouter';
import App from '../App';

describe('Teste do componente Pokedex', () => {
  const typeIDTest = 'pokemon-type';
  test('Testa se a pagina contem um heading h2 com o texto correto', () => {
    RenderWithRouter(<App />);
    const headPokedex = screen.getByRole('heading', {
      name: /encountered pokémons/i,
    });
    expect(headPokedex).toBeInTheDocument();
  });

  test('Testa se é exibido o prox pokemon da list', () => {
    RenderWithRouter(<App />);

    const btnNextPokemon = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    expect(btnNextPokemon).toBeInTheDocument();
    userEvent.click(btnNextPokemon);
    const charmander = screen.getByText(/charmander/i);
    expect(charmander).toBeInTheDocument();

    const lastPokemon = 8;

    for (let index = 0; index < lastPokemon; index += 1) {
      userEvent.click(btnNextPokemon);
    }
    const pikachu = screen.getByText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();
  });

  test('Testa se é mostrado apenas um poke por vez', () => {
    RenderWithRouter(<App />);

    const renderOnlyOnePokemon = screen.getAllByTestId('pokemon-name');
    expect(renderOnlyOnePokemon.length).toBe(1);
  });

  test('Testa se a pokedex tem os botoes de filtro', () => {
    RenderWithRouter(<App />);

    const btnTypePoke = screen.getByRole('button', {
      name: /electric/i,
    });

    const renderTypePoke = screen.getByTestId(typeIDTest);

    userEvent.click(btnTypePoke);
    expect(renderTypePoke.innerHTML).toEqual('Electric');
  });

  test('Testa se a pokedex tem um botao para resetar filtro', () => {
    RenderWithRouter(<App />);

    const btnReset = screen.getByRole('button', {
      name: /all/i,
    });
    expect(btnReset).toBeInTheDocument();

    const btnType = screen.getByRole('button', {
      name: /bug/i,
    });
    userEvent.click(btnType);

    const btnNext = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });

    userEvent.click(btnNext);
    let renderTypePoke = screen.getByTestId(typeIDTest);
    expect(renderTypePoke.innerHTML).toEqual('Bug');

    userEvent.click(btnReset);
    userEvent.click(btnNext);
    renderTypePoke = screen.getByTestId('pokemon-name');
    expect(renderTypePoke.innerHTML).toEqual('Charmander');
  });

  test('Testa se é criado botao de filtro', () => {
    RenderWithRouter(<App />);

    const pokeQnt = 9;
    const typeQnt = 7;

    const btnNextPokemon = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });

    for (let index = 0; index < pokeQnt; index += 1) {
      const PokemonType = screen.getByTestId(typeIDTest);
      const btnPokemonType = screen.getByRole('button', {
        name: PokemonType.innerHTML,
      });
      expect(btnPokemonType).toBeInTheDocument();
      userEvent.click(btnNextPokemon);
    }

    const btnsPokeType = screen.getAllByTestId('pokemon-type-button');
    expect(btnsPokeType.length).toBe(typeQnt);
  });
});
