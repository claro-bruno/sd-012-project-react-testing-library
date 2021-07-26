import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

describe('Testa o component FavoritPokemons', () => {
  const typePkObj = [
    {
      type: 'Electric',
      name: 'Pikachu',
    },
    {
      type: 'Fire',
      name: 'Charmander',
    },
    {
      type: 'Bug',
      name: 'Caterpie',
    },
    {
      type: 'Poison',
      name: 'Ekans',
    },
    {
      type: 'Psychic',
      name: 'Alakazam',
    },
    {
      type: 'Normal',
      name: 'Snorlax',
    },
    {
      type: 'Dragon',
      name: 'Dragonair',
    },
  ];
  test('Testa se "No favorite pokemon found" é mostrado na tela', () => {
    renderWithRouter(<App />);
    const favoritePK = screen.getByRole('link', { name: /Favorite Pokémons/i });
    userEvent.click(favoritePK);
    const notFound = screen.getByText(/No favorite pokemon found/i);
    expect(notFound).toBeDefined();
  });

  test('Testa se todos pokemons favoritados é exibido em "Favorite Pokémons"', () => {
    renderWithRouter(<App />);
    typePkObj.forEach((pokemon) => {
      const { type, name } = pokemon;
      const btn = screen.getByRole('button', { name: type });
      userEvent.click(btn);
      const details = screen.getByRole('link', { name: /More details/i });
      userEvent.click(details);
      const favCheck = screen.getByRole('checkbox', { name: /Pokémon favoritado?/i });
      userEvent.click(favCheck);
      expect(favCheck).toBeChecked();
      const favoritePK = screen.getByRole('link', { name: /Favorite Pokémons/i });
      userEvent.click(favoritePK);
      const namePK = screen.getByText(name);
      expect(namePK).toBeDefined();
      const home = screen.getByRole('link', { name: /Home/i });
      userEvent.click(home);
    });
  });
});
