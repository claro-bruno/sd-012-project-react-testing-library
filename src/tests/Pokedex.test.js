import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import { Pokedex } from '../components';
import App from '../App';

describe('Testa Pokedex', () => {
  test('Verifica se a página contém um h2', () => {
    renderWithRouter(<App />);
    const h1 = screen.getAllByRole('heading')[1];
    const TEXT = /Encountered pokémons/i;
    expect(h1).toHaveTextContent(TEXT);
  });

  test('Verifica próximo pokémon da lista', () => {
    renderWithRouter(<App />);

    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();

    userEvent.click(screen.getByRole('button', { name: /próximo pokémon/i }));

    expect(screen.getByText(/charmander/i)).toBeInTheDocument();

    
  });

  test('Verifica se é exibido apenas 1 pokémon por vez', () => {
    renderWithRouter(<App />);

    expect(screen.getAllByTestId('pokemon-name').length).toBe(1);
  });
});
