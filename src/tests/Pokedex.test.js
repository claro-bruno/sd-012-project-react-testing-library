import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import App from '../App';
import render from './renderWithRouter';
import pokemons from '../data';

describe('Verifica elementos presentes e comportamentos em componente Pokedex.', () => {
  beforeEach(() => render(<App />));
  it('A página contém heading h2 com o texto "Encountered pokémons".', () => {
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading.innerHTML).toBe('Encountered pokémons');
  });
  it('É exibido o próximo Pokémon da lista quando o botão Próximo é clicado.', () => {
    const btnProximo = screen.getByRole('button', { name: 'Próximo pokémon' });
    fireEvent.click(btnProximo);
    const pokemon = screen.getByTestId('pokemon-name');
    expect(btnProximo).toBeInTheDocument();
    expect(pokemon.textContent).toBe(pokemons[1].name);
  });
  it('Deve ser mostrado apenas 1 Pokémon por vez.', () => {
    const pokemon = screen.getAllByTestId('pokemon-name');
    expect(pokemon.length).toBe(1);
  });
  it('A página contém botões de filtro.', () => {
    const pokeTypes = pokemons.map((pokemon) => pokemon.type);
    const typesFil = pokeTypes.filter((type, index) => pokeTypes.indexOf(type) === index);
    const btnType = screen.getAllByTestId('pokemon-type-button');
    typesFil.forEach((type, index) => {
      fireEvent.click(btnType[index]);
      const btnProximo = screen.getByRole('button', { name: 'Próximo pokémon' });
      const pokeType = screen.getByTestId('pokemon-type');
      fireEvent.click(btnProximo);
      expect(pokeType.textContent).toBe(type);
      expect(btnType[index].textContent).toBe(type);
    });
  });
  it('A página contém botão "All".', () => {
    const allButton = screen.getByRole('button', { name: 'All' });
    fireEvent.click(allButton);
    const pokemon = screen.getByText('Pikachu');
    expect(allButton).toBeInTheDocument();
    expect(pokemon.textContent).toBe('Pikachu');
  });
});
