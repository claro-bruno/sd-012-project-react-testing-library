import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

beforeEach(() => {
  renderWithRouter(<App />);
});

describe('Teste o componente <Pokedex.js />', () => {
  it('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    const heading = screen.getByRole('heading', { name: /encountered pokémons/i });
    expect(heading).toBeInTheDocument();
  });

  it(`Teste se é exibido o próximo Pokémon da lista
  quando o botão Próximo pokémon é clicado.`, () => {
    const arrayPokemon = [
      'Pikachu',
      'Charmander',
      'Caterpie',
      'Ekans',
      'Alakazam',
      'Mew',
      'Rapidash',
      'Snorlax',
      'Dragonair',
    ];
    arrayPokemon.forEach((pokemon) => {
      const button = screen.getByRole('button', { name: /próximo pokémon/i });
      const poke = screen.getByText(pokemon);
      expect(poke).toBeInTheDocument();
      userEvent.click(button);
    });
    const firstPoke = screen.getByText(arrayPokemon[0]);
    expect(firstPoke).toBeInTheDocument();
  });

  it('Teste se é mostrado apenas um Pokémon por vez.', async () => {
    const pikachu = screen.queryByText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();
    const button = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(button);
    const charmander = screen.getByText(/charmander/i);
    expect(charmander).toBeInTheDocument();
    const pikachuu = screen.queryByText(/pikachu/i);
    expect(pikachuu).toBeNull();
  });

  it('Teste se a Pokédex tem os botões de filtro', () => {
    const arrType = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    arrType.forEach((type, index) => {
      const button = screen.queryAllByTestId('pokemon-type-button');
      expect(button[index]).toHaveTextContent(type);
      userEvent.click(button[index]);
      const testType = screen.getByTestId('pokemon-type');
      expect(testType).toHaveTextContent(type);
    });
    const buttonAll = screen.queryAllByRole('button', { hidden: false });
    expect(buttonAll[0]).toHaveTextContent(/all/i);
  });

  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    const button = screen.queryAllByRole('button', { hidden: false });
    expect(button[0]).toHaveTextContent(/all/i);
    userEvent.click(button[0]);
    const arrayPokemon = [
      'Pikachu',
      'Charmander',
      'Caterpie',
      'Ekans',
      'Alakazam',
      'Mew',
      'Rapidash',
      'Snorlax',
      'Dragonair',
    ];
    arrayPokemon.forEach((pokemon) => {
      const buttonNext = screen.getByRole('button', { name: /próximo pokémon/i });
      const poke = screen.getByText(pokemon);
      expect(poke).toBeInTheDocument();
      userEvent.click(buttonNext);
    });
  });
});
