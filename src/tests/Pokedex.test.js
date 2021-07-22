import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testa componente <Pokedex.js />', () => {
  it('Página contém Heading', () => {
    const { history } = renderWithRouter(<App />);
    const header = screen.getByRole('heading', { name: /Encountered pokémons/i });
    const { pathname } = history.location;
    expect(pathname).toBe('/');
    expect(header).toBeInTheDocument();
  });

  it('Exibe próximo pokémon', () => {
    renderWithRouter(<App />);
    const button = screen.getByTestId('next-pokemon');
    expect(button).toHaveTextContent('Próximo pokémon');
    userEvent.click(button);
    const newPokemon = screen.getByTestId('pokemon-name');
    expect(newPokemon.textContent).not.toBe('Pikachu');
    userEvent.click(button);
    userEvent.click(button);
    userEvent.click(button);
    userEvent.click(button);
    userEvent.click(button);
    userEvent.click(button);
    userEvent.click(button);
    userEvent.click(button);

    expect(newPokemon.textContent).toBe('Pikachu');
  });

  it('Mostra apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);
    const button = screen.getByTestId('next-pokemon');
    const card = screen.getByTestId('pokemon-name');
    expect(card).toHaveTextContent('Pikachu');

    userEvent.click(button);
    expect(card).not.toHaveTextContent('Pikachu');
  });

  it('Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    const button = screen.getAllByTestId('pokemon-type-button');
    button.forEach((name, i) => {
      const pokemons = [
        'Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon',
      ];
      expect(name.textContent).toBe(pokemons[i]);
    });

    userEvent.click(button[0]);
    const typePokemon = screen
      .getByTestId('pokemon-type');
    expect(typePokemon.textContent).toBe('Electric');

    const buttonAll = screen.getByTestId('');
    expect(buttonAll).toBeInTheDocument();
  });

  it('Pokédex contém um botão para resetar filtro', () => {
    renderWithRouter(<App />);

    const buttonAll = screen.getByTestId('');
    expect(buttonAll).toHaveTextContent('All');

    userEvent.click(buttonAll);
  });
});
