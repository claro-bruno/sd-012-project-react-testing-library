import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testa componente Pokedex', () => {
  it('Testa se a página contém um heading h2: "Encountered pokémons"', () => {
    renderWithRouter(<App />);
    const h2Text = screen.getByRole('heading', { level: 2 });
    expect(h2Text).toBeInTheDocument();
    expect(h2Text).toHaveTextContent('Encountered pokémons');
  });

  it('Testa se o botão "Próximo pokémon" exibe outro card', () => {
    renderWithRouter(<App />);
    const next = screen.getByText(/próximo/i);
    expect(next).toBeInTheDocument();

    userEvent.click(next);
    expect(screen.getByText('Charmander')).toBeInTheDocument();
  });

  it('Testa se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);
    const pokeCard = screen.getAllByText(/average weight/i);
    expect(screen.queryByText('Pikachu')).toBeInTheDocument();
    expect(screen.queryByText('Charmander')).not.toBeInTheDocument();
    expect(screen.queryByText('Caterpie')).not.toBeInTheDocument();
    expect(pokeCard).toHaveLength(1);
  });

  it('Testa se a Pokédex tem botões de filtro', () => {
    renderWithRouter(<App />);
    const next = screen.getByText(/próximo/i);
    userEvent.click(screen.queryByText('Fire'));
    expect(screen.queryByText('Charmander')).toBeInTheDocument();
    userEvent.click(next);
    expect(screen.queryByText('Rapidash')).toBeInTheDocument();
  });

  it('Testa se a pokédex tem um botão para resetar filtro', () => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByRole('button', { name: 'All' }));
    expect(screen.getByText('All')).toBeInTheDocument();
  });

  it('Testa se os botões de filtros são criados dinamicamente', () => {
    renderWithRouter(<App />);
    const buttonTypes = 7;
    expect(screen.getAllByTestId('pokemon-type-button').length).toBe(buttonTypes);
  });

  it('O botão de "Próximo pokémon" deve ser desabilitado caso tenha 1 só pokémon', () => {
    renderWithRouter(<App />);
    const btnNormal = screen.getByRole('button', { name: 'Normal' });
    const btnNext = screen.getByRole('button', { name: 'Próximo pokémon' });
    expect(btnNormal).toBeInTheDocument();
    userEvent.click(btnNormal);
    expect(btnNext).toBeDisabled();
  });
});
