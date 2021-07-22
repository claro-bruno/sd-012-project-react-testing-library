import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RenderWithRouter from './RenderWithRouter';
import App from '../App';

describe('Teste do componente Pokedex', () => {
  const typeTestId = 'pokemon-type';
  test('Testa se a pagina contem um heading h2 com o texto correto', () => {
    RenderWithRouter(<App />);
    const headingPokedex = screen.getByRole('heading', {
      name: /encountered pokémons/i,
    });
    expect(headingPokedex).toBeInTheDocument();
  });

  test('Testa se é exibido o prox pokemon da list', () => {
    RenderWithRouter(<App />);

    const btnNextPoke = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    expect(btnNextPoke).toBeInTheDocument();
    userEvent.click(btnNextPoke);
    const charmander = screen.getByText(/charmander/i);
    expect(charmander).toBeInTheDocument();

    const lastPokemon = 8;

    for (let index = 0; index < lastPokemon; index += 1) {
      userEvent.click(btnNextPoke);
    }
    const pikachu = screen.getByText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();
  });

  test('Testa se é mostrado apenas um poke por vez', () => {
    RenderWithRouter(<App />);

    const renderOnlyOne = screen.getAllByTestId('pokemon-name');
    expect(renderOnlyOne.length).toBe(1);
  });

  test('Testa se a pokedex tem os botoes de filtro', () => {
    RenderWithRouter(<App />);

    const btnTypePoke = screen.getByRole('button', {
      name: /electric/i,
    });

    const renderTypePoke = screen.getByTestId(typeTestId);

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
    let renderTypePoke = screen.getByTestId(typeTestId);
    expect(renderTypePoke.innerHTML).toEqual('Bug');

    userEvent.click(btnReset);
    userEvent.click(btnNext);
    renderTypePoke = screen.getByTestId('pokemon-name');
    expect(renderTypePoke.innerHTML).toEqual('Charmander');
  });

  test('Testa se é criado botao de filtro', () => {
    RenderWithRouter(<App />);

    const pokeQuantity = 9;
    const typeQuantity = 7;

    const btnNext = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });

    for (let index = 0; index < pokeQuantity; index += 1) {
      const typePoke = screen.getByTestId(typeTestId);
      const btnTypePoke = screen.getByRole('button', {
        name: typePoke.innerHTML,
      });
      expect(btnTypePoke).toBeInTheDocument();
      userEvent.click(btnNext);
    }

    const btnsPokeType = screen.getAllByTestId('pokemon-type-button');
    expect(btnsPokeType.length).toBe(typeQuantity);
  });
});
