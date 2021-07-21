import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

const { screen } = require('@testing-library/react');

describe('Testa o componente Pokedex.js', () => {
  it('Testa se página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const heading = screen.getByRole('heading', { name: /Encountered pokémons/i });
    expect(heading).toBeInTheDocument();
  });
  it('Testa o próximo Pokémon da lista quando o botão Próximo pokémon é clicado', () => {
    renderWithRouter(<App />);
    const button = screen.getByRole('button', { name: /Próximo pokémon/i });
    expect(button).toBeInTheDocument();
  });
  it('Testa se a Pokédex tem os botões de filtro.', () => {
    renderWithRouter(<App />);
    const normalButton = screen.getByRole('button', { name: 'All' });
    const buttons = screen.getAllByTestId('pokemon-type-button');
    expect(normalButton).toBeInTheDocument();
    expect(buttons[0]).toHaveTextContent('Electric');
    expect(buttons[1]).toHaveTextContent('Fire');
    expect(buttons[2]).toHaveTextContent('Bug');
    expect(buttons[3]).toHaveTextContent('Poison');
    expect(buttons[4]).toHaveTextContent('Psychic');
    expect(buttons[5]).toHaveTextContent('Normal');
    expect(buttons[6]).toHaveTextContent('Dragon');
  });
  it('Testa se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const pikachu = screen.getByText('Pikachu');
    const button = screen.getByRole('button', { name: /All/i });
    expect(button).toHaveTextContent('All');
    userEvent.click(button);
    expect(pikachu).toBeInTheDocument();
  });
});
