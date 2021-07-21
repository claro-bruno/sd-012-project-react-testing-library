import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa o componente Pokedex', () => {
  it('Verifica se contém h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const h2Element = screen.getByText('Encountered pokémons');
    expect(h2Element).toBeInTheDocument();
  });
  it('Verifica quando clicado "Próximo pokémon", outro pokémon é exibido', () => {
    renderWithRouter(<App />);
    const buttonElement = screen.getByTestId('next-pokemon');
    expect(buttonElement).toBeInTheDocument();
    expect(screen.getByText('Próximo pokémon')).toBeInTheDocument();
  });
  it('Verifica se após clicar no botão, outro pokémon é mostrado', () => {
    renderWithRouter(<App />);
    const buttonElement = screen.getByTestId('next-pokemon');
    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    expect(pokemonName).toBeInTheDocument();
    expect(pokemonName).toHaveTextContent('Pikachu');
    expect(pokemonType).toBeInTheDocument();
    expect(pokemonType).toHaveTextContent('Electric');
    expect(pokemonWeight).toBeInTheDocument();
    expect(pokemonWeight).toHaveTextContent('Average weight: 6.0 kg');
    userEvent.click(buttonElement);
    expect(screen.getByText('Charmander')).toBeInTheDocument();
    expect(screen.getAllByText('Fire')[0]).toBeInTheDocument();
    expect(screen.getByText('Average weight: 8.5 kg')).toBeInTheDocument();
  });
//   it('Verifica os botões de filtro', () => {
//     renderWithRouter(<App />);
//     expect(screen.getByText('All').innerText).toBe('All');
//     expect(screen.getByText('Electric')).toBe('Electric');
//     expect(screen.getByText('Fire')).toBe('Fire');
//     expect(screen.getByText('Bug')).toBe('Bug');
//     expect(screen.getByText('Poison')).toBe('Poison');
//     expect(screen.getByText('Psychic')).toBe('Psychic');
//     expect(screen.getByText('Normal')).toBe('Normal');
//     expect(screen.getByText('Dragon')).toBe('Dragon');
//   });
});
