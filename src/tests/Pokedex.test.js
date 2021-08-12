import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

const Sete = 7;

describe('Requisito 5', () => {
  beforeEach(() => renderWithRouter(<App />));

  test('Testa se página contém um heading h2 com o texto Encountered pokémons', () => {
    const heading = screen.getByRole('heading', { name: 'Encountered pokémons' });
    expect(heading).toBeInTheDocument();
  });

  test('Testa se é exibido o próximo Pokémon da lista quando o botão é clicado', () => {
    const button = screen.getByRole('button', { name: 'Próximo pokémon' });
    expect(button).toBeInTheDocument();
    userEvent.click(button);
    const nextPokemon = screen.getByText(/charmander/i);
    expect(nextPokemon).toBeInTheDocument();
  });

  test('Testa se é mostrado apenas um Pokémon por vez', () => {
    const singlePokemon = screen.getAllByText(/Average weight/i);
    expect(singlePokemon).toHaveLength(1);
  });

  test('Testa se a Pokédex tem os botões de filtro', () => {
    const typeButton = screen.getAllByTestId('pokemon-type-button');
    expect(typeButton).toHaveLength(Sete);
    const nameButton = screen.getAllByText(/Psychic/i);
    expect(nameButton).toHaveLength(1);
  });

  test('Testa se a Pokédex contém um botão para resetar o filtro', () => {
    const button = screen.getByRole('button', { name: 'All' });
    expect(button).toBeInTheDocument();
    userEvent.click(button);
    const allButton = screen.getByText(/Pikachu/i);
    expect(allButton).toBeInTheDocument();
  });
});
