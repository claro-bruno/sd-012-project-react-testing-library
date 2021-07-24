import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('5 - Teste o componente <Pokedex.js />', () => {
  test('1- Teste se página contém um heading `h2` com o texto `c`', () => {
    renderWithRouter(<App />);
    const encounrered = (screen.getByRole('heading',
      { level: 2, name: /c/ }));
    expect(encounrered).toBeInTheDocument();
  });
  test('2- Teste se é exibido o próximo Pokémon da lista', () => {
    renderWithRouter(<App />);
    const nextPokemon = (screen.getByText(/Próximo pokémon/));
    const firstPokemon = screen.getByText(/Pikachu/);
    expect(firstPokemon).toBeInTheDocument();
    const nextBtnGreen = 10;
    for (let index = 0; index < nextBtnGreen; index += 1) {
      fireEvent.click(nextPokemon);
    }
    expect(firstPokemon).toBeInTheDocument();
  });

  test('3- Teste se é exibido o próximo Pokémon da lista', () => {
    renderWithRouter(<App />);
    screen.getByText(/More details/);
  });
  test('4- Teste se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    const pokemonButton = screen.getAllByTestId('pokemon-type-button');
    const counter = 7;
    expect(pokemonButton.length).toBe(counter);
  });
  test('5- Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    // O filtro estará desativado ao clicar em Eletric (Pikachu) e retornará em Fire (Charmander)
    // Buscando o botão All
    const pokemonBtnAll = screen.getByText(/All/);
    fireEvent.click(pokemonBtnAll);
    // Verificando se o primeiro Card é Pikachu
    const pikachu = screen.getByText(/Pikachu/);
    expect(pikachu).toBeInTheDocument();
    // indo para o Próximo Card
    const nextButtonPokemon = screen.getByTestId('next-pokemon');
    expect(nextButtonPokemon).toBeInTheDocument();
    fireEvent.click(nextButtonPokemon);
    // Verificando se o segundo Card é Charmander
    const charmander = screen.getByText(/Charmander/);
    expect(charmander).toBeInTheDocument();
  });
});
