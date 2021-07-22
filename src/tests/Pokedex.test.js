import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helper/renderWithRouter';
import App from '../App';

describe('Testes na pokedex', () => {
  beforeEach(() => renderWithRouter(<App />));
  test('Testa o titulo', () => {
    const title = screen.getByRole('heading', { level: 2 });
    expect(title).toHaveTextContent('Encountered pokémons');
  });
  test('Testa o botao proximo pokemon', () => {
    const button = screen.getByTestId('next-pokemon');
    expect(button).toHaveTextContent('Próximo pokémon');
    userEvent.click(button);
  });
  test('Verifica se ha botoes de filtro', () => {
    const allButton = screen.getByRole('button', { name: 'All' });
    expect(allButton).toBeDefined();
    userEvent.click(allButton);
    const races = screen.getAllByTestId('pokemon-type-button');
    expect(races.length).toBe(races.length);
    const bugButton = screen.getByRole('button', { name: 'Bug' });
    userEvent.click(bugButton);
  });
});
