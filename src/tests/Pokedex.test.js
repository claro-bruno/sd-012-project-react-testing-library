import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import pokemons from '../data';
import App from '../App';
import renderWithRouter from './Helper/RendeWithRouter';

describe('Testa componente Pokedex', () => {
  beforeEach(() => renderWithRouter(<App />));

  test('Verifica um "h2" é renderizado com o texto correto', () => {
    const textH2 = screen.getByRole('heading', { name: 'Encountered pokémons',
      level: 2 });
    expect(textH2).toBeInTheDocument();
  });
  test('Verifica todos os botões', () => {
    const nextBtn = screen.getByRole('button', { name: 'Próximo pokémon' });
    userEvent.click(nextBtn);
    expect(nextBtn).toBeInTheDocument();
  });
  test('Verifica se renderiza os botões de todos os pokemons', () => {
    pokemons.forEach((pokemon) => {
      const butonns = screen.queryByRole('button', { name: pokemon.type });
      userEvent.click(butonns);
    });
  });
  test('Verifica se funciona o botão "All" ', () => {
    const btnAll = screen.getAllByTestId('pokemon-type-button');
    const length = 7;
    expect(btnAll.length).toBe(length);

    const btnPsychic = screen.getByRole('button', { name: 'Psychic' });
    userEvent.click(btnPsychic);
    const alakazan = screen.getByText('Alakazam');
    expect(alakazan).toBeInTheDocument();

    const nextBtn = screen.getByRole('button', { name: 'Próximo pokémon' });
    userEvent.click(nextBtn);
    const mew = screen.getByText('Mew');
    expect(mew).toBeInTheDocument();
  });
});
