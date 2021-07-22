import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

const name = 'pokemon-name';
const typeButton = 'pokemon-type-button';
const type = 'pokemon-type';

describe('5. Teste o componente <Pokedex.js />', () => {
  it('Teste se página contém um heading h2 com o texto Encountered pokémons.', () => {
    renderWithRouter(<App />);
    const heading = screen.getByText('Encountered pokémons');
    expect(heading).toBeInTheDocument();
  });
  it('Teste se é exibido o próximo Pokémon da lista quando o botão é clicado.', () => {
    renderWithRouter(<App />);
    const pokemons = [];
    const quantity = 9;
    for (let i = 0; i <= quantity; i += 1) {
      pokemons.push(screen.getByTestId(name));
      fireEvent.click(screen.getByRole('button', { name: /Próximo pokémon/i }));
      const condition = pokemons[i] === pokemons[i - 1];
      if (pokemons[i - 1]) {
        expect(condition).toEqual(true);
      } else expect(condition).toEqual(false);
    }
    fireEvent.click(screen.getByRole('button', { name: /Próximo pokémon/i }));
    expect(screen.getByTestId(name)).toEqual(pokemons[quantity - 1]);
  });
  it('Teste se é mostrado apenas um Pokémon por vez.', () => {
    renderWithRouter(<App />);
    const pokemons = screen.getAllByTestId(name);
    expect(pokemons.length).toBe(1);
  });
  it('Teste se a Pokédex tem os botões de filtro.', () => {
    renderWithRouter(<App />);
    const filterQuantity = 7;
    const filters = screen.getAllByTestId(typeButton);
    expect(filters.length).toBe(filterQuantity);

    fireEvent.click(screen.getAllByTestId(typeButton)[3]);
    const firstPokemon = screen.getByTestId(type).innerHTML;

    fireEvent.click(screen.getAllByTestId(typeButton)[4]);
    const secondPokemon = screen.getByTestId(type).innerHTML;

    expect(screen.getByTestId('pokemon-type').innerHTML)
      .toBe(screen.getAllByTestId(typeButton)[4].innerHTML);

    const condition = firstPokemon === secondPokemon;
    expect(condition).toBe(false);

    const resetFilter = screen.getByRole('button', { name: /All/ });
    expect(resetFilter).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /All/ }));
    expect(screen.getByTestId(name).innerHTML).toBe('Pikachu');
  });
});
