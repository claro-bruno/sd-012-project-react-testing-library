import React from 'react';
import { screen, cleanup } from '@testing-library/react';
import event from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';
import App from '../App';

describe('Testando o componente Pokedex.js', () => {
  beforeEach(() => renderWithRouter(<App />));
  // pokemons={ pokemons }
  // isPokemonFavoriteById={ mockIsPokemonFavoriteById }
  // />,
  afterEach(cleanup);
  const pokemonTypes = [...new Set(pokemons.map((pokemon) => pokemon.type))];

  test('Testando o H2 e seu conteúdo`', () => {
    const h2 = screen.getByRole('heading', { name: /Encountered pokémons/i, level: 2 });
    expect(h2).toBeInTheDocument();
  });

  test('Testando Próximos Pokemons clickados`', () => {
    expect(screen.getByRole('button', { name: /Próximo pokémon/i })).toBeInTheDocument();

    pokemons.forEach((pokemon) => {
      const btnNext = screen.getByRole('button', { name: /Próximo pokémon/i });
      const poke = screen.getByTestId('pokemon-name');
      expect(poke).toHaveTextContent(pokemon.name);
      event.click(btnNext);
    });
  });
  test('Testando exibição de um unico pokemon', () => {
    expect(screen.getAllByTestId('pokemon-name').length).toBe(1);
  });

  test('Testando Botões de Filtro', () => {
    const retButtons = screen.getAllByRole('button');
    pokemonTypes.forEach((type) => {
      const buttonFilter = retButtons.filter((button) => button.textContent === type);
      expect(buttonFilter.length).toBe(1);

      const btnType = screen.getByRole('button', { name: type });
      expect(btnType).toBeInTheDocument();

      const btnAll = screen.getByRole('button', { name: /All/i });
      expect(btnAll).toBeInTheDocument();

      event.click(btnType);
      const listPokemons = screen.getAllByTestId('pokemon-type');
      const FilteredPokemons = listPokemons.filter((typ) => typ.textContent === type);
      expect(FilteredPokemons.length).toBe(listPokemons.length);
    });
  });

  test('Testando o botão All Reset', () => {
    const btnAll = screen.getByRole('button', { name: /All/i });
    const btnPsyc = screen.getByRole('button', { name: 'Psychic' });

    expect(btnAll).toBeInTheDocument();
    const lenghtAllPokemons = 9;
    const allPokemons = pokemons.length;

    expect(allPokemons).toBe(lenghtAllPokemons);

    event.click(btnPsyc);
    const qtdPsyc = pokemons.filter((pok) => pok.type === 'Psychic');
    expect(qtdPsyc.length).toBe(2);

    event.click(btnAll);
    expect(allPokemons).toBe(lenghtAllPokemons);
  });
});
