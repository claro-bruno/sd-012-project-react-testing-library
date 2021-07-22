import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import Pokedex from '../components/Pokedex';
// import pokemons from '../data';

describe('Testa o componente Pokedex.js', () => {
  const pokemons = [
    {
      id: 25,
      name: 'Pikachu',
      type: 'Electric',
      averageWeight: {
        value: '6.0',
        measurementUnit: 'kg',
      },
      image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    },
    {
      id: 4,
      name: 'Charmander',
      type: 'Fire',
      averageWeight: {
        value: '8.5',
        measurementUnit: 'kg',
      },
      image: 'https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png',
    },
  ];

  beforeEach(() => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ App.setIsPokemonFavoriteById() }
    />);
  });

  it('Testa heading', () => {
    expect(screen.getByText('Encountered pokémons')).toBeDefined();
  });

  it('Testa next button', () => {
    const nextButton = screen.getByTestId('next-pokemon');
    expect(nextButton.innerHTML).toBe('Próximo pokémon');
    expect(screen.getByText('Pikachu')).toBeDefined();
    userEvent.click(nextButton);
    expect(screen.getByText('Charmander')).toBeDefined();
    userEvent.click(nextButton);
    expect(screen.getByText('Pikachu')).toBeDefined();
  });

  it('Testa se há apenas um pokemon na tela', () => {
    expect(screen.getByText('Pikachu')).toBeDefined();
    expect(screen.queryByText('Charmander')).toBeNull();
  });

  it('Testa se há botões de filtro para cada tipo', () => {
    pokemons.forEach((pokemon) => {
      const { type } = pokemon;
      expect(screen.getByRole('button', { name: `${type}` })).toBeDefined();
    });
    const fire = screen.getByRole('button', { name: 'Fire' });
    const electric = screen.getByRole('button', { name: 'Electric' });
    userEvent.click(electric);
    expect(screen.getByText('Pikachu')).toBeDefined();
    userEvent.click(fire);
    expect(screen.getByText('Charmander')).toBeDefined();
    expect(screen.getByRole('button', { name: 'All' })).toBeEnabled();
  });

  it('Testa se o botão All reseta o filtro', () => {
    const buttonAll = screen.getByRole('button', { name: 'All' });
    const nextButton = screen.getByTestId('next-pokemon');
    userEvent.click(buttonAll);
    userEvent.click(nextButton);
    expect(screen.getByText('Charmander')).toBeDefined();
  });
});
