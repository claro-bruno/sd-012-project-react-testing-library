import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

describe('Testando o componente Pokedex.js.', () => {
  it('Verifica se: a página possui um h2'
    + ' com o texto "Encountered pokémons".', () => {
    renderWithRouter(<App />);
    const textVerifyPokedex = screen.getByRole(
      'heading', { name: /Encountered pokémons/i },
    );
    expect(textVerifyPokedex).toBeInTheDocument();
  });
  it('Verifica se: tem um botão'
  + ' com o texto "Próximo pokémon".', () => {
    renderWithRouter(<App />);
    const buttonTextVerify = screen.getByRole('button', { name: /Próximo pokémon/i });
    expect(buttonTextVerify).toBeInTheDocument();
  });

  it('Verifica se: aparece apenas 1 Pokemon ao clicar no botão.', () => {
    renderWithRouter(<App />);
    const onePokemon = screen.getAllByTestId('pokemon-name');
    expect(onePokemon.length).toBe(1);
    expect(onePokemon[0]).toBeInTheDocument();
  });
  it('Verifica se: existe um botao para cada tipo de Pokemon.', () => {
    renderWithRouter(<App />);
    const reducePokemon = [...new Set(pokemons
      .reduce((types, { type }) => [...types, type], []))];
    reducePokemon.forEach((element, index) => {
      const buttonType = screen.getAllByTestId('pokemon-type-button')[index];
      expect(buttonType.textContent).toBe(element);
      userEvent.click(buttonType);
      const getTheButton = screen.getByRole('button', { name: 'Próximo pokémon' });
      const pokeType = screen.getByTestId('pokemon-type');
      userEvent.click(getTheButton);
      expect(pokeType.textContent).toBe(element);
      expect(pokeType).toBeInTheDocument();
    });
  });
  it('Verifica se: tem um botão para resetar os filtros da Pokedex', () => {
    renderWithRouter(<App />);
    const getButtonAll = screen.getByRole('button', { name: 'All' });
    userEvent.click(getButtonAll);
    expect(getButtonAll).toBeInTheDocument();
    const pokemon = screen.getByText('Pikachu');
    expect(pokemon.textContent).toBe('Pikachu');
  });
});
