import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import Pokedex from '../components/Pokedex';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';
import App from '../App';
// import mockIsPokemonFavoriteById from '../__mocks__/mockIsPokemonFavoriteById';
// import mockPokemonTypes from '../__mocks__/mockPokemonTypes';

describe('Testes do <Pokedex />', () => {
  test('Testa se renderiza o texto: Encountered pokémons', () => {
    renderWithRouter(<App />);
    const msg = screen.getByText(/Encountered pokémons/i);

    expect(msg).toBeInTheDocument();
  });

  test('Testa se é exibido o próximo Pokémon quando o botão é clicado.', () => {
    renderWithRouter(<App />);
    const pokemon1 = screen.getByText(/Pikachu/i);

    expect(pokemon1).toBeInTheDocument();

    const button = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(button);
    const pokemon2 = screen.getByText(/Charmander/i);

    expect(pokemon2).toBeInTheDocument();
  });

  test('Testa se é mostrado apenas um Pokémon por vez.', () => {
    renderWithRouter(<App />);
    const button = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(button);
    const linkMoreDetails = screen.getAllByRole('link', { name: /More details/i });
    expect(linkMoreDetails.length).toBe(1);
  });

  test('1 - Testa se a Pokédex tem os botões de filtro.', () => {
    renderWithRouter(<App />);

    expect(screen.getByRole('button', { name: /All/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /electric/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /fire/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /bug/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /poison/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /psychic/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /normal/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /dragon/i })).toBeInTheDocument();
  });

  test('2 - Testa se a Pokédex tem os botões de filtro.', () => {
    renderWithRouter(<App />);
    const btnType = screen.getAllByTestId('pokemon-type-button');
    expect(btnType[1]).toHaveTextContent(/fire/i);
    userEvent.click(btnType[1]);
    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toHaveTextContent(/fire/i);
  });

  test('Testa se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const buttonAll = screen.getByRole('button', { name: /All/i });

    expect(buttonAll).toBeInTheDocument();

    const buttonNext = screen.getByRole('button', { name: /Próximo pokémon/i });
    pokemons.forEach(({ name }) => {
      expect(screen.getByTestId('pokemon-name')).toHaveTextContent(name);
      userEvent.click(buttonNext);
    });
  });
});
