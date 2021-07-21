import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

describe('Testa o componente Pokemon', () => {
  it('Testa se o card renderizado contém o nome do Pokémon', () => {
    renderWithRouter(<App />);
    const name = screen.getByTestId('pokemon-name');
    expect(name).toBeInTheDocument();
  });

  it('Testa se o card renderizado contém o tipo do Pokémon', () => {
    renderWithRouter(<App />);
    const type = screen.getByTestId('pokemon-type');
    expect(type).toBeInTheDocument();
  });

  it('Testa se o card possui o peso do Pokémon', () => {
    renderWithRouter(<App />);
    const weight = screen.getByTestId('pokemon-weight');
    expect(weight).toBeInTheDocument();
  });
});
