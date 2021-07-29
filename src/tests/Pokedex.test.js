import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import { Pokedex } from '../components';
import pokemons from '../data';

const mockFavoritePokemonIds = [parseInt('id', 25), parseInt('id', 10)];

const mockIsPokemonFavoriteById = pokemons.reduce((acc, { id }) => {
  acc[id] = mockFavoritePokemonIds.includes(id);
  return acc;
}, {});

describe('Testa o component Pokedex', () => {
  it('Testa subtítulo específico', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ mockIsPokemonFavoriteById }
      />,
    );

    const subtitulo = screen.getByRole('heading', { name: /encountered pokémons/i });

    expect(subtitulo).toBeInTheDocument();
  });

  it('Testa botão de próximo pokémon', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ mockIsPokemonFavoriteById }
      />,
    );

    const btn = screen.getByRole('button', { name: /próximo pokémon/i });

    expect(btn).toBeInTheDocument();
    expect(screen.queryByText(pokemons[0].name)).toBeInTheDocument();
    expect(screen.queryByText(pokemons[1].name)).toBeNull();
    expect(screen.queryByText(pokemons[8].name)).toBeNull();

    Array.from({ length: pokemons.length - 1 })
      .forEach(() => userEvent.click(btn));

    expect(screen.queryByText(pokemons[8].name)).toBeInTheDocument();
    expect(screen.queryByText(pokemons[0].name)).toBeNull();

    userEvent.click(btn);

    expect(screen.queryByText(pokemons[0].name)).toBeInTheDocument();
    expect(screen.queryByText(pokemons[8].name)).toBeNull();
  });

  it('Testa botões de filtro', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ mockIsPokemonFavoriteById }
      />,
    );

    const allBtn = screen.getByRole('button', { name: /all/i });
    const typeBtns = screen.getAllByTestId('pokemon-type-button');

    typeBtns.forEach((typeBtn) => {
      userEvent.click(typeBtn);
      const nomeAtual = screen.queryByTestId('pokemon-name');
      const { name } = pokemons.find(({ type }) => type === typeBtn.innerHTML);

      expect(nomeAtual).toHaveTextContent(name);
    });

    userEvent.click(allBtn);
    const nomeAtual = screen.queryByTestId('pokemon-name');

    expect(nomeAtual).toHaveTextContent(pokemons[0].name);
  });

  it('Testa se o botão "Próximo Pokémon" desativa', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ mockIsPokemonFavoriteById }
      />,
    );

    const electricBtn = screen.getByRole('button', { name: /electric/i });
    const nextBtn = screen.getByRole('button', { name: /próximo pokémon/i });

    expect(nextBtn).toBeEnabled();
    userEvent.click(electricBtn);
    expect(nextBtn).toBeDisabled();
  });
});
