import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
// import Pokedex from '../components/Pokedex';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

describe('Teste o componente <Pokedex.js />', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  it('Teste se página contém um heading h2 com o texto Encountered pokémons.', () => {
    const h2 = screen.getByRole('heading', { level: 2 });

    expect(h2).toHaveTextContent('Encountered pokémons');
  });

  it('Teste se o botão "Próximo pokémon" mostra um a um os pokemons ao clicar', () => {
    const btnPokemon = screen.getByText('Próximo pokémon');

    expect(btnPokemon.type).toBe('button');
    fireEvent.click(btnPokemon);

    const nextPokemon = screen.getByText(/Charmander/);

    expect(nextPokemon).toBeInTheDocument();
  });

  it('Teste se é mostrado apenas um Pokémon por vez.', () => {
    const onlyPokemon = screen.getAllByTestId('pokemon-name');

    expect(onlyPokemon).toHaveLength(1);
  });

  it('Teste se a Pokédex tem os botões de filtro.', () => {
    const pokeType = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    const filter = screen.getAllByTestId('pokemon-type-button');
    filter.forEach((filtered, item) => {
      expect(filtered).toBeInTheDocument();
      expect(filtered).toHaveTextContent(pokeType[item]);
    });
  });

  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    const btnAll = screen.getByText('All');
    fireEvent.click(btnAll);
    const poke = screen.getByText('Pikachu');

    expect(poke).toBeInTheDocument();
  });
});
