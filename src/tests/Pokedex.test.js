import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import data from '../data';
import App from '../App';

describe('Testes no componente <Pokedex.js />', () => {
  beforeEach(() => renderWithRouter(<App />));
  test('Heading h2 = "Encountered pokémons"; texto do botão = "próximo pokémon"', () => {
    const heading = screen.getByRole('heading', { name: /Encountered pokémons/i });
    expect(heading).toBeInTheDocument();
    const button = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(button).toBeInTheDocument();
  });

  test('Cliques sucessivos mostram cada pokémon. O primeiro deve ser "pikachu"', () => {
    // Feito com a ajuda de Elias Forte - turma 12.
    data.map(({ name }) => {
      const pokemonName = screen.getByText(name);
      const buttonNext = screen.getByRole('button', { name: /próximo pokémon/i });
      expect(pokemonName).toBeInTheDocument();
      return userEvent.click(buttonNext);
    });

    expect(screen // após passar por todo os itens do array, o primeiro nome a ser mostrado deve ser pikachu.
      .getByText(/pikachu/i))
      .toBeInTheDocument();
  });

  test('Apenas um pokemon é mostrado por vez', () => {
    expect(screen
      .getAllByTestId(/pokemon-name/i))
      .toHaveLength(1);
  });
});

describe('A Pokédex tem os botões de filtro.', () => {
  beforeEach(() => renderWithRouter(<App />));

  test('São mostrados todos os botões de filtro', () => {
    expect(screen
      .getByRole('button', { name: 'All' }))
      .toBeInTheDocument();
    const length = 7;
    expect(screen
      .getAllByTestId('pokemon-type-button'))
      .toHaveLength(length);
  });

  test('Existe um botão de filtragem para cada tipo de Pokémon, sem repetição.', () => {
    data.forEach(({ type }) => {
      const typeButton = screen.getByRole('button', { name: type });
      expect(typeButton).toHaveTextContent(type);
      userEvent.click(typeButton);
    });

    const buttonAll = screen.getByRole('button', { name: 'All' });
    expect(buttonAll).toBeInTheDocument();
    userEvent.click(buttonAll);
  });
});
