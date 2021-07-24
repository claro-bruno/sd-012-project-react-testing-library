import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

beforeEach(() => renderWithRouter(<App />));

describe('Testa o componente Pokedex.js', () => {
  const nextButton = screen.getByText('Próximo pokémon');

  it('Testa se a página contém um heading h2 com o texto Encountered pokémons', () => {
    expect(screen.getByText('Encountered pokémons')).toBeInTheDocument();
  });

  it('Testa se o botão "Próximo pokémon" exibe os pokémons quando clicado', () => {
    pokemons.forEach((pokemon) => {
      expect(screen.getByText(pokemon.name)).toBeInTheDocument();
      userEvent.click(nextButton);
    });

    expect(screen.getByText('Pikachu')).toBeInTheDocument();
  });
  it('Testa se apenas um Pokémon é mostrado por vez', () => {
    expect(screen.getAllByTestId('pokemon-name')).toHaveLength(1);
  });
  it('Testa se a Pokédex tem os botões de filtro', () => {
    const numOfPokemonTypes = 7;
    expect(screen.getAllByTestId('pokemon-type-button')).toHaveLength(numOfPokemonTypes);

    userEvent.click(screen.getByText('Fire'));
    expect(screen.getByText('Charmander')).toBeInTheDocument();
    userEvent.click(nextButton);
    expect(screen.getByText('Rapidash')).toBeInTheDocument();

    expect(screen.getByText('All')).toBeInTheDocument();
  });
  it('Testa se a Pokédex contém um botão para resetar o filtro', () => {
    userEvent.click(screen.getByText('All'));
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
    userEvent.click(nextButton);
    expect(screen.getByText('Charmander')).toBeInTheDocument();
  });
});
