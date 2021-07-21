import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testando o componente Pokemon', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  test('Verifica se o pokemon correto aparece na tela', () => {
    const pikachuImg = screen.getByAltText(/Pikachu sprite/i);
    const pikachuImg2 = screen.getByAltText(/Pikachu sprite/i);
    expect(pikachuImg).toBeInTheDocument();
    expect(pikachuImg2.src).not.toBe('');
  });

  test('Verifica se o nome, tipo e peso do pokemon certo aparece na tela', () => {
    const weight = 'Average weight: 6.0 kg';
    expect(screen.getByTestId('pokemon-name').innerHTML).toBe('Pikachu');
    expect(screen.getByTestId('pokemon-type').innerHTML).toBe('Electric');
    expect(screen.getByTestId('pokemon-weight').innerHTML).toBe(weight);
  });

  test('Verifica se More details te leva para o lugar correto', () => {
    fireEvent.click(screen.getByText(/More details/i));
    expect(screen.getByText(/Pikachu Details/i)).toBeInTheDocument();
  });

  test('Verifica se aparece a estrelinha de favorito', () => {
    fireEvent.click(screen.getByText(/More details/i));
    fireEvent.click(screen.getByLabelText(/Pokémon favoritado?/i));
    fireEvent.click(screen.getByText(/Home/i));
    const estrelinha = screen.getByAltText(/Pikachu is marked as favorite/i);
    expect(estrelinha.src).not.toBe('');
  });
});
