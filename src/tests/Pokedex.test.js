import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('testa o componente Pokedex.js', () => {
  it('testa se página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const title = screen.getByRole('heading', { name: /Encountered pokémons/i });
    expect(title).toBeInTheDocument();
  });

  it('testa se é exibido o próximo Pokémon quando o botão Próximo é clicado', () => {
    renderWithRouter(<App />);
    const pikachu = screen.getByText(/Pikachu/i);
    expect(pikachu).toBeInTheDocument();
    const button = screen.getByRole('button', { name: /Próximo pokémon/i });
    userEvent.click(button);
    const charmander = screen.getByText(/Charmander/i);
    expect(charmander).toBeInTheDocument();
    const button2 = screen.getByRole('button', { name: /Próximo pokémon/i });
    userEvent.click(button2);
    const caterpie = screen.getByText(/Caterpie/i);
    expect(caterpie).toBeInTheDocument();
  });

  it('testa se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    const allButton = screen.getByRole('button', { name: 'All' });
    expect(allButton).toBeInTheDocument();
    const buttons = screen.getAllByTestId('pokemon-type-button');
    expect(buttons[0]).toHaveTextContent('Electric');
    expect(buttons[1]).toHaveTextContent('Fire');
    expect(buttons[2]).toHaveTextContent('Bug');
    expect(buttons[3]).toHaveTextContent('Poison');
    expect(buttons[4]).toHaveTextContent('Psychic');
    expect(buttons[5]).toHaveTextContent('Normal');
    expect(buttons[6]).toHaveTextContent('Dragon');
  });

  it('testa se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const pikachu = screen.getByText(/Pikachu/i);
    const allButton = screen.getByRole('button', { name: 'All' });
    userEvent.click(allButton);
    expect(pikachu).toBeInTheDocument();
  });
});
