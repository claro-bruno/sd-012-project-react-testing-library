import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('testa pokedex', () => {
  it('testa titulo', () => {
    renderWithRouter(<App />);
    const titulo = screen.getByText('Encountered pokémons');
    expect(titulo).toBeInTheDocument();
  });
  it('testa se vai para o proximo', () => {
    renderWithRouter(<App />);
    const btn = screen.getByText('Próximo pokémon');
    expect(btn).toBeInTheDocument();
    userEvent.click(btn);
    const proxPoke = screen.getByTestId('pokemon-name');
    expect(proxPoke).toBeInTheDocument();
  });
  it('testa filtros', () => {
    const types = 7;
    renderWithRouter(<App />);
    const btn = screen.getAllByTestId('pokemon-type-button');
    expect(btn.length).toBe(types);
    const fireBtn = screen.getAllByTestId('pokemon-type-button')[1];
    expect(fireBtn).toBeInTheDocument();
    expect(fireBtn).toHaveTextContent('Fire');
    userEvent.click(fireBtn);
    const primeiro = screen.getByText('Charmander');
    expect(primeiro).toBeInTheDocument();
  });
  it('testa o filtro all', () => {
    renderWithRouter(<App />);
    const all = screen.getByText('All');
    expect(all).toBeInTheDocument();
    userEvent.click(all);
    const poke = screen.getByText('Pikachu');
    expect(poke).toBeInTheDocument();
  });
});
