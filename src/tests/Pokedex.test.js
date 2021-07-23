import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Verifica requisitos do desafio 5', () => {
  test('Verifica se a página contem um h2', () => {
    renderWithRouter(<App />);

    const heading = screen.getByRole('heading', {
      name: /Encountered pokémons/i,
    });

    expect(heading).toBeInTheDocument();
  });
  test('Verifica se a página renderiza o proximo pokemon ao ser clicada', () => {
    renderWithRouter(<App />);

    const button = screen.getByRole('button', {
      name: /Próximo pokémon/i,
    });

    userEvent.click(button);
  });
  test('Testa botoes de filtro da pagina', () => {
    renderWithRouter(<App />);

    const allButton = screen.getByRole('button', {
      name: /All/i,
    });
    const buttons = screen.getAllByTestId('pokemon-type-button');
    const expectLenght = 7;
    expect(allButton).toBeInTheDocument();
    expect(buttons.length).toBe(expectLenght);
  });
  test('Testa botao All', () => {
    renderWithRouter(<App />);

    const allButton = screen.getByRole('button', {
      name: /All/i,
    });
    userEvent.click(allButton);
  });
  test('Testa nome dos botoes', () => {
    renderWithRouter(<App />);

    const electric = screen.getByRole('button', {
      name: /Electric/i,
    });
    expect(electric.innerHTML).toBe('Electric');

    // const fire = screen.getByRole('button', {
    //   name: 'Fire',
    // });
    // expect(fire.innerHTML).toBe('Fire');

    // const bug = screen.getByRole('button', {
    //   name: 'Bug',
    // });
    // expect(bug.innerHTML).toBe('Bug');

    // const poison = screen.getByRole('button', {
    //   name: 'Poison',
    // });
    // expect(poison.innerHTML).toBe('Poison');

    // const physic = screen.getByRole('button', {
    //   name: 'Psychic',
    // });
    // expect(physic.innerHTML).toBe('Psychic');

    // const normal = screen.getByRole('button', {
    //   name: 'Normal',
    // });
    // expect(normal.innerHTML).toBe('Normal');

    // const dragon = screen.getByRole('button', {
    //   name: 'Dragon',
    // });
    // expect(dragon.innerHTML).toBe('Dragon');
  });
});
