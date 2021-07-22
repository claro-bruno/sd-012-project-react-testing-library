import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import Filter from './Filter';

describe('Testa o componente Pokemon.js', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  test('Testa se contém um h2 com o texto Encoutered pokémons', () => {
    const h2Text = screen.getByRole('heading', { name: /Encountered pokémons/ });
    expect(h2Text).toBeInTheDocument();
  });

  test('testa se é exibido o próximo pokémon ao clicar no botão Próximo pokémon', () => {
    const button = screen.getByRole('button', { name: /Próximo pokémon/ });
    expect(button).toBeInTheDocument();
    const arrayOfPokemons = ['Pikachu', 'Charmander', 'Caterpie',
      'Ekans', 'Alakazam', 'Mew', 'Rapidash', 'Snorlax', 'Dragonair'];
    for (let index = 1; index < arrayOfPokemons.length; index += 1) {
      fireEvent.click(screen.getByRole('button', { name: /Próximo pokémon/ }));
      const name = arrayOfPokemons[index];
      const screenName = screen.getByText(arrayOfPokemons[index]);
      expect(screenName).toContainHTML(name);
    }
    fireEvent.click(screen.getByRole('button', { name: /Próximo pokémon/ }));
    const firstPokemon = screen.getByText(/Pikachu/);
    expect(firstPokemon).toContainHTML('Pikachu');
  });

  test('Testa é mostrado apenas um Pokémon por vez', () => {
    const pokemon = screen.getAllByRole('link', { name: 'More details' });
    expect(pokemon.length).toBe(1);
  });

  test('Filtro All', () => {
    const button = screen.getByRole('button', { name: 'All' });
    expect(button).toBeInTheDocument();
    const btn = screen.getAllByRole('button', { name: 'All' });
    expect(btn.length).toBe(1);
    fireEvent.click(button);
    const pokemon = screen.getByText('Pikachu');
    expect(pokemon).toBeDefined();
  });
});

describe('Testa se a Pokédex tem os botões de filtro', () => {
  afterEach(() => {
    const button = screen.getByRole('button', { name: /All/ });
    expect(button).toBeEnabled();
  });

  test('Filtro Electric', () => {
    const Electric = Filter('Electric');
    const finded = Electric.button.find((r) => r.innerHTML === 'Electric');
    expect(finded).toBeInTheDocument();
    expect(finded.nodeType).toBe(1);
    expect(Electric.pokemon).toContainHTML('Pikachu');
    expect(Electric.type).toContainHTML(finded.innerHTML);
  });

  test('Filtro Fire', () => {
    const Fire = Filter('Fire');
    const finded = Fire.button.find((r) => r.innerHTML === 'Fire');
    expect(finded).toBeInTheDocument();
    expect(finded.nodeType).toBe(1);
    expect(Fire.pokemon).toContainHTML('Charmander');
    expect(Fire.type).toContainHTML(finded.innerHTML);
    fireEvent.click(finded);
    fireEvent.click(screen.getByRole('button', { name: /Próximo/ }));
    const newPoke = screen.getByTestId('pokemon-name');
    expect(newPoke).toContainHTML('Rapidash');
  });

  test('Filtro Bug', () => {
    const Bug = Filter('Bug');
    const finded = Bug.button.find((r) => r.innerHTML === 'Bug');
    expect(finded).toBeInTheDocument();
    expect(finded.nodeType).toBe(1);
    expect(Bug.pokemon).toContainHTML('Caterpie');
    expect(Bug.type).toContainHTML(finded.innerHTML);
  });

  test('Filtro Poison', () => {
    const Poison = Filter('Poison');
    const finded = Poison.button.find((r) => r.innerHTML === 'Poison');
    expect(finded).toBeInTheDocument();
    expect(finded.nodeType).toBe(1);
    expect(Poison.pokemon).toContainHTML('Ekans');
    expect(Poison.type).toContainHTML(finded.innerHTML);
  });

  test('Filtro Psychic', () => {
    const Psychic = Filter('Psychic');
    const finded = Psychic.button.find((r) => r.innerHTML === 'Psychic');
    expect(finded).toBeInTheDocument();
    expect(finded.nodeType).toBe(1);
    expect(Psychic.pokemon).toContainHTML('Alakazam');
    expect(Psychic.type).toContainHTML(finded.innerHTML);
    fireEvent.click(finded);
    fireEvent.click(screen.getByRole('button', { name: /Próximo/ }));
    const newPoke = screen.getByTestId('pokemon-name');
    expect(newPoke).toContainHTML('Mew');
  });

  test('Filtro Normal', () => {
    const Normal = Filter('Normal');
    const finded = Normal.button.find((r) => r.innerHTML === 'Normal');
    expect(finded).toBeInTheDocument();
    expect(finded.nodeType).toBe(1);
    expect(Normal.pokemon).toContainHTML('Snorlax');
    expect(Normal.type).toContainHTML(finded.innerHTML);
  });

  test('Filtro Dragon', () => {
    const Dragon = Filter('Dragon');
    const finded = Dragon.button.find((r) => r.innerHTML === 'Dragon');
    expect(finded).toBeInTheDocument();
    expect(finded.nodeType).toBe(1);
    expect(Dragon.pokemon).toContainHTML('Dragonair');
    expect(Dragon.type).toContainHTML(finded.innerHTML);
  });
});
