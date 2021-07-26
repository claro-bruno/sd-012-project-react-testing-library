import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWRouter from './RenderWRouter';
import App from '../App';

describe('Testa as funções do componente Pokedex', () => {
  test('Verifica se há um h2 com "Encountered pokémons"', () => {
    renderWRouter(<App />);
    const header = screen.getByRole('heading', { name: /Encountered Pokémons/i });

    expect(header).toBeInTheDocument();
  });
  test('Verifica o próximo pokemón da lista ao clicar em próximo pokémon', () => {
    renderWRouter(<App />);
    const nextPokeButton = screen.getByRole('button', { name: /Próximo pokémon/i });
    fireEvent.click(nextPokeButton);
    const nextPoké = screen.getByText(/Charmander/i);
    expect(nextPoké).toBeInTheDocument();
  });
  test('Verifica se a pokédex tem os botões de filtro', () => {
    renderWRouter(<App />);
    const filterButtons = screen.getAllByTestId('pokemon-type-button');
    const seven = 7;
    const pokTypes = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];

    expect(filterButtons.length).toBe(seven);
    filterButtons.forEach((button, i) => {
      expect(button).toHaveTextContent(pokTypes[i]);
    });
  });
  test('Verifica se o há o botão de todas as categorias na tela', () => {
    renderWRouter(<App />);
    const allButton = screen.getByRole('button', { name: /All/i });
    expect(allButton).toBeInTheDocument();
    fireEvent.click(allButton);
    const firstpoke = screen.getByText(/Pikachu/i);
    expect(firstpoke).toBeInTheDocument();
  });
});
