import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import Data from '../data';

describe('Testando o componente <Pokedex.js />', () => {
  test('Teste se página contém um heading h2 com o texto X', () => {
    const { history } = renderWithRouter(<App />);
    const url = history.location.pathname;
    expect(url).toBe('/');

    const getH2 = screen.getByRole('heading', { name: 'Encountered pokémons' });
    expect(getH2).toBeInTheDocument();
  });

  test('Teste se é exibido o próximo Pokémon da lista', () => {
    renderWithRouter(<App />);

    const getH2 = screen.getByRole('heading', { name: 'Encountered pokémons' });
    expect(getH2).toBeInTheDocument();
  });
});

describe('Botão Próximo pokémon é clicado', () => {
  test('O botão deve conter o texto Próximo pokémon', () => {
    renderWithRouter(<App />);

    const getNextBtn = screen.getByRole('button', { name: 'Próximo pokémon' });
    expect(getNextBtn).toBeInTheDocument();

    const getAllBtn = screen.getByRole('button', { name: 'All' });
    expect(getAllBtn).toBeInTheDocument();
    userEvent.click(getAllBtn);

    const qntAll = `${Data.length}`;
    expect(qntAll).toBe('9');

    Data.forEach((pokemon) => {
      const getPokeName = screen.getByText(pokemon.name);
      expect(getPokeName).toBeInTheDocument();

      expect(getNextBtn).toBeInTheDocument();
      userEvent.click(getNextBtn);
    });
  });

  test('Verifica se os botões de tipo estão na tela', () => {
    renderWithRouter(<App />);

    const getAllBtn = screen.getByRole('button', { name: 'All' });
    expect(getAllBtn).toBeInTheDocument();
    userEvent.click(getAllBtn);

    const getTestId = screen.getAllByTestId('pokemon-type-button');

    Data.forEach((pokemon, i) => {
      const getPokeType = screen.getByRole('button', { name: pokemon.type });
      expect(getPokeType).toBeInTheDocument();
      expect(getTestId[i]).not.toBe('');
    });
  });

  test('Se for o ultimo Pokemon tem que voltar para o primeiro', () => {
    renderWithRouter(<App />);

    const getNextBtn = screen.getByRole('button', { name: 'Próximo pokémon' });
    expect(getNextBtn).toBeInTheDocument();

    Data.forEach(() => { userEvent.click(getNextBtn); });
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
  });
});
