import React from 'react';
import { findByText, fireEvent, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';

console.log(pokemons);
describe('Testes no componente renderWithRouter', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });
  it('Verifica se há um h2 com um texto específico', () => {
    expect(screen.getByText('Encountered pokémons')).toBeDefined();
  });
  it('Verifica se o botão "Próximo pokémon" mostra o próximo pokémon', () => {
    const nextPokeButton = screen.getByText('Próximo pokémon');
    fireEvent.click(nextPokeButton);
    expect(screen.getByText('Charmander')).toBeInTheDocument();
    fireEvent.click(nextPokeButton);
    expect(screen.getByText('Caterpie')).toBeInTheDocument();
    fireEvent.click(nextPokeButton);
    expect(screen.getByText('Ekans')).toBeInTheDocument();
    fireEvent.click(nextPokeButton);
    expect(screen.getByText('Alakazam')).toBeInTheDocument();
    fireEvent.click(nextPokeButton);
    expect(screen.getByText('Mew')).toBeInTheDocument();
    fireEvent.click(nextPokeButton);
    expect(screen.getByText('Rapidash')).toBeInTheDocument();
    fireEvent.click(nextPokeButton);
    expect(screen.getByText('Snorlax')).toBeInTheDocument();
    fireEvent.click(nextPokeButton);
    expect(screen.getByText('Dragonair')).toBeInTheDocument();
    fireEvent.click(nextPokeButton);
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
  });
  it('Verifica se é mostrado somente 1 pokémon por vez', () => {
    expect(screen.getAllByTestId('pokemon-name').length).toBe(1);
  });
});
