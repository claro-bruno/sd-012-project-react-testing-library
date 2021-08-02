import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import pokemons from '../data';
import App from '../App';
import renderWithRouter from './renderWithRouter';

const nextPokemon = 'Próximo pokémon';

describe('Testando o componente "Pokedex"', () => {
  it('Verifica se existe um h2 com o texto "Encountered pokémons"', () => {
    renderWithRouter(<App />);
    const h2 = screen.getByRole('heading', { level: 2 });
    expect(h2).toHaveTextContent(/Encountered pokémons/i);
  });
  it('Verifica se é exibido um pokémon por vez', () => {
    renderWithRouter(<App />);
    const singlePokemon = screen.getAllByTestId('pokemon-name');
    expect(singlePokemon.length).toBe(1);
  });
  it('Verifica se o botão "Próximo pokémon" exibe um pokémon por vez', () => {
    renderWithRouter(<App />);
    const nexPokemon = screen.getByRole('button', { name: /Próximo pokémon/i });
    pokemons.forEach((pokemon) => {
      const singlePokemon = screen.getByText(pokemon.name);
      userEvent.click(nexPokemon);
      expect(singlePokemon).toBeInTheDocument();
    });
  });
});

describe('Verifica se existem botões de filtragem no componente Pokedex', () => {
  it('verifica se existe um filtro para cada tipo de pokémon', () => {
    renderWithRouter(<App />);
    const listTypes = screen.getAllByTestId('pokemon-type-button');
    listTypes.map((typePokemon) => expect(screen.getByRole('button',
      { name: typePokemon.innerHTML }))
      .toBeInTheDocument());
  });
  it('Verifica se os filtros estão funcionando', () => {
    renderWithRouter(<App />);
    const dataTestId = 'pokemon-type';
    const allPokemons = screen.getByRole('button', { name: 'All' });
    const bugButton = screen.getByRole('button', { name: 'Bug' });
    const nextButton = screen.getByRole('button', { name: nextPokemon });
    let currentPokemon = screen.getByTestId(dataTestId);
    expect(currentPokemon).toHaveTextContent(/^Electric$/);
    userEvent.click(bugButton);
    userEvent.click(nextButton);
    currentPokemon = screen.getByTestId(dataTestId);
    expect(currentPokemon).toHaveTextContent(/^Bug$/);
    expect(bugButton).toHaveTextContent(currentPokemon.innerHTML);
    expect(allPokemons).toBeInTheDocument();
  });
  it('Verifica se existe um botao de reset para os filtros', () => {
    renderWithRouter(<App />);
    const testId = 'pokemon-type';
    const currentPokemon = screen.getByTestId(testId);
    const allPokemons = screen.getByRole('button', { name: 'All' });
    const nextButton = screen.getByRole('button', { name: nextPokemon });
    userEvent.click(allPokemons);
    expect(currentPokemon).toHaveTextContent(/^Electric$/);
    userEvent.click(nextButton);
    expect(currentPokemon).toHaveTextContent(/^Fire$/);
    const fireButton = screen.getByRole('button', { name: 'Fire' });
    userEvent.click(fireButton);
    expect(currentPokemon).toHaveTextContent(/^Fire$/);
  });
});
