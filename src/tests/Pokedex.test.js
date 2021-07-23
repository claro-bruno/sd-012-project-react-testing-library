import React from 'react';
import { screen, cleanup, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

beforeEach(() => renderWithRouter(<App />));
afterEach(cleanup);

describe('Teste o componente <Pokedex.js />', () => {
  test('Teste se página tem um heading h2 com o texto Encountered pokémons', () => {
    const h2 = screen.getByRole('heading',
      { name: /Encountered pokémons/i, level: 2 });
    expect(h2).toBeInTheDocument();
  });

  test('Teste o próximo Pokémon da lista quando o botão é clicado', () => {
    const nextButton = screen.getByRole('button',
      { name: /Próximo pokémon/i });
    expect(nextButton).toBeInTheDocument();
    const pikachu = screen.getByText('Pikachu');
    expect(pikachu).toBeInTheDocument();
    fireEvent.click(nextButton);
    const charmander = screen.getByText('Charmander');
    expect(charmander).toBeInTheDocument();
  });

  test('O primeiro da lista deve ser mostrado se estiver no último Pokémon', () => {
    const nextButton = screen.getByRole('button',
      { name: /Próximo pokémon/i });
    expect(nextButton).toBeInTheDocument();
    const pikachu = screen.getByText('Pikachu');
    expect(pikachu).toBeInTheDocument();
    const OITO = 8;
    for (let i = 0; i < OITO; i += 1) {
      fireEvent.click(nextButton);
    }
    expect(pikachu).toBeInTheDocument();
  });

  test('Teste se a Pokédex tem os botões de filtro', () => {
    const SETE = 7;
    const allButton = screen.getByText('All');
    const buttons = screen.getAllByTestId('pokemon-type-button');

    expect(buttons.length).toBe(SETE);
    expect(allButton).toBeInTheDocument();
    expect(buttons[0].innerHTML).toBe('Electric');
  });

  test('Pokedéx deverá mostrar os Pokémons sem filtros quando clicado botão All', () => {
    const allButton = screen.getByText('All');
    fireEvent.click(allButton);
    const pikachu = screen.getByText('Pikachu');
    expect(pikachu).toBeInTheDocument();
    const nextButton = screen.getByTestId('next-pokemon');
    expect(nextButton).toBeInTheDocument();
    fireEvent.click(nextButton);
    const charmander = screen.getByText('Charmander');
    expect(charmander).toBeInTheDocument();
  });
});
