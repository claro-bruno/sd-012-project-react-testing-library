import React from 'react';
import { Router } from 'react-router-dom';
import { fireEvent, getByTestId, render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import pokemons from '../data';
import App from '../App';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(
      <Router history={ history }>
        {component}
      </Router>,
    ),
    history,
  });
};

describe(
  'Verifica informaçoes presentes no card de cada pokémon no comp. Pokémon', () => {
    test('Verifica nome, tipo, peso e imagem de cada pokémon', () => {
      renderWithRouter(<App />);
      pokemons.forEach((pokemon) => {
        const { name, type, averageWeight } = pokemon;
        const pokeName = screen.getByTestId('pokemon-name');
        expect(pokeName).toHaveTextContent(name);
        const pokeType = screen.getByTestId('pokemon-type');
        expect(pokeType).toHaveTextContent(type);
        const pokeWeight = screen.getByTestId('pokemon-weight');
        expect(pokeWeight).toHaveTextContent(
          `Average weight: ${averageWeight.value} ${averageWeight.measurementUnit}`,
        );
        const pokeImg = screen
          .getByAltText('');
        expect(pokeImg).toHaveProperty('src', URL);
        fireEvent.click(screen.getByTestId('next-pokemon'));
      });
    });
}
);
