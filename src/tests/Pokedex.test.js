import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testando o componente pokedex', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  test('Verifica se a página tem um h2 com o texto "Encountered Pokemons', () => {
    const h2 = screen.getByRole('heading', { level: 2 });
    expect(h2.innerHTML).toBe('Encountered pokémons');
  });

  test('Verifica se o botão para mostrar o "Próximo pokémon" tem este texto', () => {
    const button = screen.getByTestId('next-pokemon');
    expect(button.innerHTML).toBe('Próximo pokémon');
  });

  test('Verifica se o botão All está na página', () => {
    fireEvent.click(screen.getByText('Fire'));
    expect(screen.getByTestId('pokemon-type').innerHTML).toBe('Fire');
    fireEvent.click(screen.getByText('All'));
    expect(screen.getByTestId('pokemon-type').innerHTML).toBe('Electric');
  });
});
