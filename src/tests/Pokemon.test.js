import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import pokemons from '../data';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe(
  'Verifica informaçoes presentes no card de cada pokémon no componente Pokemon', () => {
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
    test('Verifica existência do link "More details"', () => {
      renderWithRouter(<App />);
      const detailLink = screen.getByText(/More details/i);
      expect(detailLink).toBeInTheDocument();
    });
    test('Verifica se o link redireciona para página de detalhes', () => {
      const { history } = renderWithRouter(<App />);
      fireEvent.click(screen.getByText(/More details/i));
      const { pathname } = history.location;
      expect(screen.getByText(/Game Locations of/i)).toBeInTheDocument();
      expect(pathname).toBe('/pokemons/25');
    });
    test('Verifica se é exibida a imagem de estrela no pokémon favoritado', () => {
      renderWithRouter(<App />);
      fireEvent.click(screen.getByText(/More details/i));
      const faveCheckbox = screen.getByLabelText('Pokémon favoritado?');
      fireEvent.click(faveCheckbox);
      const faveImg = screen
        .getByAltText('Pikachu is marked as favorite');
      expect(faveImg).toHaveProperty('src', 'http://localhost/star-icon.svg');
    });
  },
);
