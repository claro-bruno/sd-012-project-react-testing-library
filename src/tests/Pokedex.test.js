import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';

describe('Teste se a página contém um heading h2 e o texto Encountered pokémons', () => {
  const types = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];

  it('if there is a h2 heading', () => {
    renderWithRouter(<App />);
    const text = screen.getByRole('heading', { name: /encountered pokémons/i });
    expect(text).toBeInTheDocument();
  });

  it('Teste se exibido o próximo Pokémon da lista', () => {
    renderWithRouter(
      <App>
        <Pokedex pokemons={ pokemons } />
      </App>,
    );
    const button = screen.getByTestId('next-pokemon');
    expect(button).toHaveTextContent('Próximo pokémon');
    userEvent.click(button);
    const pokemon = screen.getByText('Charmander');
    expect(pokemon).toBeInTheDocument();
    userEvent.click(button);
    expect(pokemon).not.toHaveTextContent('Charmander');
  });

  it('Teste se Pokédex tem os botões de filtro.', () => {
    renderWithRouter(
      <App>
        <Pokedex pokemons={ pokemons } />
      </App>,
    );
    const buttons = screen.getAllByTestId('pokemon-type-button');
    expect(buttons[0]).toHaveTextContent('Electric');
    userEvent.click(buttons[0]);
    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toHaveTextContent('Pikachu');
    userEvent.click(buttons[1]);
    expect(pokemonName).toHaveTextContent('Charmander');
    const resetButton = screen.getByText('All');
    userEvent.click(resetButton);
    expect(pokemonName).toHaveTextContent('Pikachu');
  });

  it('test the creation of the filters', () => {
    renderWithRouter(
      <App>
        <Pokedex pokemons={ pokemons } />
      </App>,
    );
    const buttons = screen.getAllByTestId('pokemon-type-button');
    buttons.forEach((element, index) => {
      expect(element).toHaveTextContent(types[index]);
    });
  });
});
