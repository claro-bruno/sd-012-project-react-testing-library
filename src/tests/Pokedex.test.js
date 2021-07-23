import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente <About.js />.', () => {
  test('Testa se página contém um heading h2 com o texto Encountered pokémon', () => {
    renderWithRouter(<App />);
    const title = screen.getByRole('heading', { level: 2 });
    expect(title).toHaveTextContent('Encountered pokémons');
  });
  test('Testa se exibe o próximo Pokémon quando o botão Próximo pokémon', () => {
    renderWithRouter(<App />);
    const button = screen.getByText('Próximo pokémon');
    expect(button.type).toBe('button');
    fireEvent.click(button);
    const pokemon = screen.getByText(/Charmander/i);
    expect(pokemon).toBeInTheDocument();
  });
  test('Testa se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);
    const pokemons = screen.getAllByTestId('pokemon-name');
    expect(pokemons).toHaveLength(1);
  });
  test('Teste se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    const button = screen.getByText('Psychic');
    fireEvent.click(button);
    const pokemons = screen.getByText('Alakazam');
    expect(pokemons).toBeInTheDocument();
  });
  test('Teste se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    const button = screen.getByText('All');
    fireEvent.click(button);
    const pokemons = screen.getByText('Pikachu');
    expect(pokemons).toBeInTheDocument();
  });
  
});
