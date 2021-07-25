import React from 'react';
import { Router } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
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
        const { name, type, averageWeight, image } = pokemon;
        const pokeName = screen.getByTestId('pokemon-name');
        expect(pokeName).toHaveTextContent(name);
        const pokeType = screen.getByTestId('pokemon-type');
        expect(pokeType).toHaveTextContent(type);
        const pokeWeight = screen.getByTestId('pokemon-weight');
        expect(pokeWeight).toHaveTextContent(
          `Average weight: ${averageWeight.value} ${averageWeight.measurementUnit}`,
        );
        const pokeImg = screen
          .getByAltText(`${name} sprite`);
        expect(pokeImg).toHaveProperty('src', image);
        fireEvent.click(screen.getByTestId('next-pokemon'));
      });
    });
    test('Verifica existência do link details', () => {
      renderWithRouter(<App />);
      const detailLink = screen.getByText(/More details/i);
      expect(detailLink).toBeInTheDocument();
    });
    test('Verifica pathname na pagina details', () => {
      const { history } = renderWithRouter(<App />);
      fireEvent.click(screen.getByText(/More details/i));
      const { pathname } = history.location;
      expect(screen.getByText(/Game Locations of/i)).toBeInTheDocument();
      expect(pathname).toBe('/pokemons/25');
      const faveCheckbox = screen.getByLabelText('Pokémon favoritado?');
      fireEvent.click(faveCheckbox);
      const faveImg = screen
        .getByAltText('Pikachu is marked as favorite');
      expect(faveImg).toHaveProperty('src', 'http://localhost/star-icon.svg');
    });
  },
);
