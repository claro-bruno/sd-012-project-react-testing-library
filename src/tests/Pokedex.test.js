import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './RenderWithRouter';
import App from '../App';

const types = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];

describe('Testando o componente "Pokedex"', () => {
  it('Testando se a página contém um h2 com o texto "Encountered pokémons"', () => {
    renderWithRouter(<App />);
    const heading = screen.getByRole('heading', { name: /Encountered pokémons/i });
    expect(heading).toBeDefined();
  });
});

describe('Testando botão "Próximo pokémon"', () => {
  it('Testando se o botão contém o texto "Próximo pokémon"', () => {
    renderWithRouter(<App />);
    const btn = screen.getByRole('button', { name: /Próximo pokémon/i });
    expect(btn).toBeDefined();
  });

  it('Os próximos pokemons da lista são exibidos ao clicar no botão', () => {
    renderWithRouter(<App />);
    const pokeList = ['Charmander', 'Caterpie', 'Ekans', 'Alakazam', 'Mew', 'Rapidash'];
    const btnNext = screen.getByTestId('next-pokemon');
    const currentlyPoke = screen.getByText('Pikachu');

    expect(currentlyPoke).toBeDefined();
    pokeList.forEach((pokemon) => {
      userEvent.click(btnNext);
      const nextPoke = screen.getByText(pokemon);
      expect(nextPoke).toBeDefined();
    });
  });
});

describe('Testando listagem de pokemons', () => {
  it('Testando se o primeiro pokemon é exibido ao termino da lista', () => {
    renderWithRouter(<App />);
    const btnNext = screen.getByTestId('next-pokemon');
    const btnAll = screen.getByRole('button', { name: 'All' });

    userEvent.click(btnAll);
    const numberOfPokes = 9;
    for (let index = 0; index < numberOfPokes; index += 1) {
      userEvent.click(btnNext);
    }
    const firstPoke = screen.getByText('Pikachu');
    expect(firstPoke).toBeDefined();
  });
  it('Testando se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);
    const pokeScreen = screen.getAllByTestId('pokemon-name');
    expect(pokeScreen.length).toBe(1);
  });
  it('Verificando a existencia de botões de filtro', () => {
    renderWithRouter(<App />);

    types.forEach((type) => {
      expect(screen.getByRole('button', { name: type })).toBeDefined();
      expect(screen.getAllByTestId('pokemon-type-button').length).toBe(types.length);
    });
  });
  it('Testando se o botão "All" está visível', () => {
    renderWithRouter(<App />);
    const btnAll = screen.getByRole('button', { name: /All/i });
    expect(btnAll).toBeDefined();
  });
});
