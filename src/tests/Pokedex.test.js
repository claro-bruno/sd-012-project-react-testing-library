import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

describe('Testa componente <Pokedex />', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });
  test('Teste se página contém um heading h2 com texto Encountered Pokémons', () => {
    const headingh2 = screen.getByRole('heading',
      { name: /Encountered Pokémons/i level: 2 });
    expect(headingh2).toBeInTheDocument();
  });

  test('Teste se ao clicar o proximo pokémon é exibido', () => {
    const button = screen.getByRole('button',
      { name: /Próximo pokémon/i });
    fireEvent.click(button);
    expect(button).toBeInTheDocument();
  });
  test('Teste se é mostrado apenas um Pokémon por vez', () => {
    expect(screen.getAllByTestId('pokemon-name').length).toBe(1);
  });

  test('Testa se a Pokedex tem os botões de filtro', () => {
    const numberSeven = 7;
    const buttonAll = screen.getByText('All');
    const btnpokemons = screen.getAllByTestId('pokemon-type-button');

    expect(btnpokemons.length).toBe(numberSeven);
    expect(buttonAll).toBeInTheDocument();
    expect(btnpokemons[0].innerHTML).toBe('Electric');
  });
  test('Testa se existe um botão para resetar o filtro', () => {
    expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Poison' }));
    expect(screen.getByTestId('pokemon-name')).toHaveTextContent('Ekans');
    fireEvent.click(screen.getByRole('button', { name: 'All' }));
    expect(screen.getByTestId('pokemon-name')).toHaveTextContent('Pikachu');
  });
});
