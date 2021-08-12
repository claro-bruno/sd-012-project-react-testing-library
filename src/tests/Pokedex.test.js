import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import { Pokedex } from '../components';
import pokemons from '../data';

describe('test the component Pokedex', () => {
  it('test the page contains one heading on the screen', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ {} }
    />);

    const $textPokedex = screen.getByText(/Encountered pokémons/i);
    expect($textPokedex).toBeInTheDocument('');
  });

  it('Test the button then display show the next Pokemon', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ {} }
    />);

    const $pikachu = screen.getByText(/Pikachu/i);
    expect($pikachu).toBeInTheDocument();
    const $button = screen
      .getByRole('button', { name: /próximo pokémon/i });
    expect($button).toBeInTheDocument('');
    userEvent.click($button);

    const $charmander = screen.getByText(/charmander/i);
    expect($charmander).toBeInTheDocument();
    const $button2 = screen
      .getByRole('button', { name: /próximo pokémon/i });

    userEvent.click($button2);
    const $caterpie = screen.getByText(/Caterpie/i);
    expect($caterpie).toBeInTheDocument();
  });

  it('Test whether a Pokédex has filter buttons.', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ {} }
    />);

    const $allButton = screen.getByRole('button', { name: 'All' });
    expect($allButton).toBeInTheDocument();

    const buttons = screen.getAllByTestId('pokemon-type-button');
    expect(buttons[0]).toHaveTextContent('Electric');
    expect(buttons[1]).toHaveTextContent('Fire');
    expect(buttons[2]).toHaveTextContent('Bug');
    expect(buttons[3]).toHaveTextContent('Poison');
    expect(buttons[4]).toHaveTextContent('Psychic');
    expect(buttons[5]).toHaveTextContent('Normal');
    expect(buttons[6]).toHaveTextContent('Dragon');
  });

  it('Test whether a Pokédex has a reset filter button.', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ {} }
    />);

    const pikachu = screen.getByText(/Pikachu/i);
    const allButton = screen.getByRole('button', { name: 'All' });

    userEvent.click(allButton);
    expect(pikachu).toBeInTheDocument();
  });
});
