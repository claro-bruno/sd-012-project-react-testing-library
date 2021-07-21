import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { Pokedex } from '../components';
import pokemons from '../data';

const favoritesPoke = () => pokemons.reduce((acc, value) => {
  acc[value.id] = false;
  return acc;
}, {});

describe('Testa o componente Pokedex.js', () => {
  test('Testa se existe um h2 com o texto "Encountered pokémons"', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ favoritesPoke() }
    />);

    expect(screen.getByRole('heading')).toBeInTheDocument();
    expect(screen.getByText(/Encountered pokémons/i)).toBeInTheDocument();
  });

  test('Testa se o botão "Próximo pokémon" funciona ao clicado', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ favoritesPoke() }
    />);
    const nextButton = screen.getByRole('button', { name: /próximo pokémon/i });
    pokemons.forEach((poke) => {
      expect(screen.queryByText(poke.name)).toBeInTheDocument();
      fireEvent.click(nextButton);
    });
  });

  test('Testa se mostra somente um poke por vez', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ favoritesPoke() }
    />);
    const shownPoke = screen.getAllByTestId('pokemon-name');
    expect(shownPoke.length).toBe(1);
  });

  test('Testa se existe os botões de filtro', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ favoritesPoke() }
    />);
    const filterButtons = screen.getAllByTestId('pokemon-type-button');
    expect(filterButtons[0]).toBeVisible();
    expect(filterButtons[filterButtons.length - 1]).toBeVisible();
  });

  test('Testa se existe um botão para resetar o filtro', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ favoritesPoke() }
    />);
    const resetButton = screen.getByText(/All/i);
    expect(resetButton).toBeInTheDocument();
    fireEvent.click(resetButton);
    const initialPoke = screen.getByText(/Pikachu/i);
    expect(initialPoke).toBeInTheDocument();
  });

  test('Testa se o botão "Próximo poke" é inativo se tivermos só um pokemon', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ favoritesPoke() }
    />);
    const poisonFilter = screen.getByText(/Poison/i);
    fireEvent.click(poisonFilter);
    expect(poisonFilter).toBeInTheDocument();

    const nextButton = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(nextButton).toBeDisabled();
  });
});
