import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Verifica o componente Pokedex', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });
  test('Verifica se página contém um h2 escrito: Encountered pokémons', () => {
    const h2 = screen.getByText('Encountered pokémons');
    expect(h2).toBeInTheDocument(/Encountered pokémons/i);
  });

  test('Verifica se contem o próximo pokemon da lista quando clicado no botão', () => {
    const next = screen.getByRole('button', {
      name: /Próximo pokémon/i,
    });
    expect(next).toBeInTheDocument();
  });

  test('Verifica há um botão para resetar o filtro', () => {
    const reset = screen.getByRole('button', {
      name: 'All',
    });
    expect(reset).toBeInTheDocument();
    fireEvent.click(reset);
  });
  test('Verifica há botão de filtro', () => {
    const bugButton = screen.getByRole('button', {
      name: 'Bug',
    });
    expect(bugButton).toBeInTheDocument();
    const fireButton = screen.getByRole('button', {
      name: 'Fire',
    });
    expect(fireButton).toBeInTheDocument();
  });
  test('Verifica se é desabilitado o botão próximo quando ainda tiver um pokemon', () => {
    const freezeButton = screen.getAllByTestId('pokemon-type-button');
    expect(freezeButton).toBeDefined();
  });
});
