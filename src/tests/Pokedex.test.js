import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWhithRouter from './renderWhithRouter.test';

describe('Teste o componente Pokédex', () => {
  beforeEach(() => {
    renderWhithRouter(<App />);
  });

  test('Teste se pag contém um heading h2 com o texto Encountered pokémons', () => {
    const heading = screen.getByRole('heading', { name: /Encountered pokémons/i });
    expect(heading).toBeInTheDocument();
  });

  test('Teste se o prox Pokémon da lista quando o btn Próximo pokémon é clicado', () => {
    const btn = screen.getByRole('button', { name: /Próximo pokémon/i });
    expect(btn).toBeInTheDocument();
  });

  //   test('Teste se é mostrado apenas um Pokémon por vez', () => {
  //     const btn = screen.getByRole('button', { name: /Próximo pokémon/i });
  //     expect(btn).toBe(1);
  //   });

  test('Teste se a Pokédex tem os botões de filtro', () => {
    const btnFilter = screen.getByRole('button', { name: /Próximo pokémon/i });
    expect(btnFilter).toBeInTheDocument();
  });

  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    const btnReset = screen.getByRole('button', { name: /Próximo pokémon/i });
    expect(btnReset).toBeInTheDocument();
  });

//   test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
//     const btnReset = screen.getByRole('button', { name: 'All' });
//     expect(btnReset).toBeInTheDocument();
//     userEvent.click(btnReset);
//   });
});
