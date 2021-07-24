import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testa Pokédex', () => {
  it('Testa se contém heading Encountered pokémons', () => {
    renderWithRouter(<App />);
    const heading = screen.getByRole('heading', { name: /Encountered pokémons/i });

    expect(heading).toBeInTheDocument();
  });

  it('Testa se button Próximo Pokémon funciona', () => {
    renderWithRouter(<App />);

    const firstPokemon = screen.getByText(/Pikachu/i);
    expect(firstPokemon).toBeInTheDocument();

    const btnNextPokemon = screen.getByRole('button', { name: /Próximo pokémon/i });
    expect(btnNextPokemon).toBeInTheDocument();

    userEvent.click(btnNextPokemon);

    const secondPokemon = screen.getByText(/Charmander/i);
    expect(secondPokemon).toBeInTheDocument();
  });

  it('Testa se após último pokémon volta para o primeiro', () => {});

  it('Testa buttons de filtro', () => {
    renderWithRouter(<App />);

    const btns = screen.getAllByTestId('pokemon-type-button');
    expect(btns[0]).toHaveTextContent('Electric');
    expect(btns[1]).toHaveTextContent('Fire');
    expect(btns[2]).toHaveTextContent('Bug');
    expect(btns[3]).toHaveTextContent('Poison');
    expect(btns[4]).toHaveTextContent('Psychic');
    expect(btns[5]).toHaveTextContent('Normal');
    expect(btns[6]).toHaveTextContent('Dragon');

    userEvent.click(btns[0]);
    const typePokemon = screen.getByTestId('pokemon-type');
    expect(typePokemon).toHaveTextContent('Electric');

    userEvent.click(btns[1]);
    expect(typePokemon).toHaveTextContent('Fire');
  });

  it('Testa button All', () => {
    renderWithRouter(<App />);

    const btnAll = screen.getByRole('button', { name: /All/i });
    const pikachu = screen.getByText(/Pikachu/i);

    userEvent.click(btnAll);
    expect(pikachu).toBeInTheDocument();
  });
});
