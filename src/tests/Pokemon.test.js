import React from 'react';
import App from '../App';
import { fireEvent, render, screen } from '@testing-library/react';
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
