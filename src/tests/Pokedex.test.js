import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testa o componente <Pokedex />', () => {
  const pokemonType = 'pokemon-type';
  const pokemonTypeButton = 'pokemon-type-button';
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  it('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    const h2 = screen.getByRole('heading', { name: /Encountered pokémons/i });
    expect(h2).toBeInTheDocument();
  });

  it('Testa se o próximo pokemon da lista é exibido', () => {
    const nextBtn = screen.getByText('Próximo pokémon');
    userEvent.click(nextBtn);

    expect(screen.getByText(/charmander/i)).toBeInTheDocument();
    userEvent.click(nextBtn);
    expect(screen.getByText(/caterpie/i)).toBeInTheDocument();
    userEvent.click(nextBtn);
    expect(screen.getByText(/ekans/i)).toBeInTheDocument();
    userEvent.click(nextBtn);
    expect(screen.getByText(/alakazam/i)).toBeInTheDocument();
    userEvent.click(nextBtn);
    expect(screen.getByText(/mew/i)).toBeInTheDocument();
    userEvent.click(nextBtn);
    expect(screen.getByText(/rapidash/i)).toBeInTheDocument();
    userEvent.click(nextBtn);
    expect(screen.getByText(/snorlax/i)).toBeInTheDocument();
    userEvent.click(nextBtn);
    expect(screen.getByText(/dragonair/i)).toBeInTheDocument();
    userEvent.click(nextBtn);
    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
  });

  it('Testa se é mostrado apenas um pokémon por vez', () => {
    const pokemonName = screen.getAllByTestId('pokemon-name');
    expect(pokemonName.length).toBe(1);
  });

  it('Testa se a pokedex contém botões para filtro', () => {
    const numOfPokemons = 7;

    const pokemonBtn = screen.getAllByTestId(pokemonTypeButton);
    const pokemonTypes = screen.getByTestId(pokemonType);

    expect(pokemonBtn.length).toBe(numOfPokemons);
    pokemonBtn.forEach((pokemon) => {
      userEvent.click(pokemon);
      expect(pokemonTypes.innerHTML).toBe(pokemon.innerHTML);
    });
  });

  it('Testa se a pokedex contem um botao para resetar o fitro', () => {
    const fireBtn = screen.getByText(/fire/i);
    userEvent.click(fireBtn);
    const pokemonTypes = screen.getByTestId(pokemonType);

    expect(pokemonTypes.innerHTML).toBe('Fire');

    const allBtn = screen.getByRole('button', { name: 'All' });
    userEvent.click(allBtn);

    expect(pokemonTypes.innerHTML).toBe('Electric');
  });
});
