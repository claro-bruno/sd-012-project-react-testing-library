import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Data from '../data';
import App from '../App';
// oi
describe('Verifica requisitos do desafio 5', () => {
  it('Verifica se a página contem um h2', () => {
    renderWithRouter(<App />);

    const heading = screen.getByRole('heading', {
      name: /Encountered pokémons/i,
    });

    expect(heading).toBeInTheDocument();
  });
  it('Verifica se a página renderiza o proximo pokemon ao ser clicada', () => {
    renderWithRouter(<App />);

    const button = screen.getByRole('button', {
      name: /Próximo pokémon/i,
    });

    userEvent.click(button);
  });
  it('Testa botoes de filtro da pagina', () => {
    renderWithRouter(<App />);

    const allButton = screen.getByRole('button', {
      name: /All/i,
    });
    const buttons = screen.getAllByTestId('pokemon-type-button');
    const expectLenght = 7;
    expect(allButton).toBeInTheDocument();
    expect(buttons.length).toBe(expectLenght);
  });
  it('Testa botao All', () => {
    renderWithRouter(<App />);

    const allButton = screen.getByRole('button', {
      name: /All/i,
    });
    userEvent.click(allButton);
  });
  it('Testa nome dos botoes', () => {
    renderWithRouter(<App />);

    Data.forEach((pokemon) => {
      expect(pokemon.innerHTML === pokemon.type);
    });
  });
});
