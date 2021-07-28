import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pokedex } from '../components';
import data from '../data';
import renderWithRouter from './renderWithRouter';
// Codigo de Bruno Yamamoto https://github.com/tryber/sd-012-project-react-testing-library/pull/40/files?file-filters%5B%5D=.js
const favoritesPkmn = {
  4: false,
  10: false,
  23: false,
  25: false,
  65: true,
  78: false,
  143: false,
  148: true,
  151: false,
};

describe('Testa o componente Pokedex', () => {
  it('Verifica se renderiza o header com o texto correspondente', () => {
    renderWithRouter(<Pokedex
      pokemons={ data }
      isPokemonFavoriteById={ favoritesPkmn }
    />);
    expect(screen.getByRole('heading', { name: 'Encountered pokémons' }));
  });

  it('Verifica se o botão proximo pokemon funciona corretamente', () => {
    renderWithRouter(<Pokedex
      pokemons={ data }
      isPokemonFavoriteById={ favoritesPkmn }
    />);
    const button = screen.getByRole('button', { name: /Próximo pokémon/i });

    const pokeInicial = screen.getByText('Pikachu');
    expect(pokeInicial).toBeDefined();

    data.forEach((item) => {
      const pokemon = screen.getByText(item.name);
      expect(pokemon).toBeDefined();
      userEvent.click(button);
    });

    expect(pokeInicial).toBeDefined();
  });

  it('Ter apenas um pokémon sendo carregado na página', () => {
    renderWithRouter(<Pokedex
      pokemons={ data }
      isPokemonFavoriteById={ favoritesPkmn }
    />);
    const pokeId = screen.getAllByTestId('pokemon-name');
    expect(pokeId).toHaveLength(1);
  });

  it('Testa os filtros do pokémon', () => {
    renderWithRouter(<Pokedex
      pokemons={ data }
      isPokemonFavoriteById={ favoritesPkmn }
    />);

    const buttonAll = screen.getByRole('button', { name: 'All' });
    const typeBtnLen = 7;
    const allButtons = screen.getAllByTestId('pokemon-type-button');
    expect(allButtons).toHaveLength(typeBtnLen);

    data.forEach((item) => {
      const button = screen.getByRole('button', { name: item.type });
      expect(button).toBeDefined();
      expect(buttonAll).toBeDefined();
    });
  });

  it('Testa se reseta o filtro', () => {
    renderWithRouter(<Pokedex
      pokemons={ data }
      isPokemonFavoriteById={ favoritesPkmn }
    />);
    const noFilter = screen.getByText('Pikachu');
    expect(noFilter).toBeDefined();

    userEvent.click(screen.getByRole('button', { name: 'Fire' }));
    expect(screen.getByText('Charmander')).toBeDefined();
    userEvent.click(screen.getByRole('button', { name: /Próximo Pokémon/i }));
    expect(screen.getByText('Rapidash')).toBeDefined();

    userEvent.click(screen.getByRole('button', { name: 'All' }));
    expect(noFilter).toBeDefined();
  });
});
