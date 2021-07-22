import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Teste o componente <Pokedex.js />', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });
  it('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    const encountered = screen.getByRole('heading', {
      level: 2, name: 'Encountered pokémons',
    });
    expect(encountered).toBeInTheDocument();
  });
  it('Teste se é exibido o próximo Pokémon [...]', () => {
    const button = screen.getByRole('button', { name: /Próximo pokémon/i });
    expect(button).toBeInTheDocument();
    userEvent.click(button);
    expect(screen.getByText('Charmander')).toBeInTheDocument();
  });
  it('Teste se é mostrado apenas um Pokémon por vez.', () => {
    const text = screen.getAllByText(/Average Weight/i);
    expect(screen.queryByText('Pikachu')).toBeInTheDocument();
    expect(screen.queryByText('Charmander')).not.toBeInTheDocument();
    expect(screen.queryByText('Caterpie')).not.toBeInTheDocument();
    expect(text).toHaveLength(1);
  });
  it('Teste se a Pokédex tem os botões de filtro', () => {
    expect(screen.getByRole('button', { name: /Fire/i })).toBeInTheDocument();
    userEvent.click(screen.getByRole('button', { name: /Fire/i }));
    expect(screen.getByText('Charmander')).toBeInTheDocument();
    userEvent.click(screen.getByRole('button', { name: /Próximo pokémon/i }));
    expect(screen.getByText('Rapidash')).toBeInTheDocument();
  });
  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    expect(screen.getByRole('button', { name: /All/i })).toBeInTheDocument();
  });
  it('Testa se os botões de filtro são criados dinamicamente.', () => {
    const btns = 7;
    expect(screen.getAllByTestId('pokemon-type-button').length).toBe(btns);
  });
});
