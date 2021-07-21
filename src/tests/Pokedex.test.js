import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pokedex from '../components/Pokedex';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

const isFav = {
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

describe('testa componente pokedex', () => {
  it('testa render de pokedex', () => {
    renderWithRouter(<Pokedex pokemons={ pokemons } isPokemonFavoriteById={ isFav } />);
    const pageHeading = screen.getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    });
    expect(pageHeading).toBeInTheDocument();
  });

  it('testa funcionamento do botao de proximo', () => {
    renderWithRouter(<Pokedex pokemons={ pokemons } isPokemonFavoriteById={ isFav } />);
    const nextBtn = screen.getByRole('button', { name: /Próximo pokémon/i });
    expect(nextBtn).toBeInTheDocument();

    pokemons.forEach(() => userEvent.click(nextBtn));
    const pikachuText = screen.getByText(/Pikachu/i);
    expect(pikachuText).toBeInTheDocument();

    userEvent.click(nextBtn);
    userEvent.click(nextBtn);
    userEvent.click(nextBtn);
    const ekansText = screen.getByText(/Ekans/i);
    expect(ekansText).toBeInTheDocument();
  });

  it('testa quantidade de pokes na tela', () => {
    renderWithRouter(<Pokedex pokemons={ pokemons } isPokemonFavoriteById={ isFav } />);
    const pokesOnScreen = screen.getAllByTestId('pokemon-name');
    expect(pokesOnScreen.length).toBe(1);
  });

  it('testa botoes de filtro', () => {
    renderWithRouter(<Pokedex pokemons={ pokemons } isPokemonFavoriteById={ isFav } />);

    const pokesTypes = pokemons
      .map((elem) => elem.type)
      .filter((elem, index, array) => index === array.indexOf(elem));

    const filterBtns = screen.getAllByTestId('pokemon-type-button');
    expect(filterBtns.length).toBe(pokesTypes.length);
    const allBtn = screen.getByRole('button', { name: /all/i });
    expect(allBtn).toBeVisible();
    const pikachuText = screen.getByText(/Pikachu/i);

    filterBtns.forEach(({ innerHTML }, index) => expect(innerHTML)
      .toBe(pokesTypes[index]));

    const fireTypeBtn = screen.getByRole('button', { name: /electric/i });
    const nextBtn = screen.getByTestId('next-pokemon');
    expect(nextBtn).not.toBeDisabled();
    userEvent.click(fireTypeBtn);
    expect(nextBtn).toBeDisabled();

    expect(allBtn).toBeVisible();

    userEvent.click(allBtn);
    expect(pikachuText).toBeInTheDocument();
  });
});
