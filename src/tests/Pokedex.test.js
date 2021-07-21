import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import data from '../data';
import renderWithRouter from './renderWithRouter';

describe('Testa o componente Pokedex', () => {
  it('Verifica se renderia o header com o texto correspondente', () => {
    renderWithRouter(<App />);
    expect(screen.getByRole('heading', { name: 'Encountered pokémons' }));
  });

  it('Verifica se o botão proximo pokemon funciona corretamente', () => {
    renderWithRouter(<App />);
    const button = screen.getByRole('button', { name: /Próximo pokémon/i });

    const pokeInicial = screen.getByText('Pikachu');
    expect(pokeInicial).toBeDefined();

    data.forEach((item) => {
      const pokemon = screen.getByText(item.name);
      expect(pokemon).toBeDefined();
      userEvent.click(button);
    });

    expect(pokeInicial).toBeDefined();
  });

  it('Ter apenas um pokémon sendo carregado na página', () => {
    renderWithRouter(<App />);
    const pokeId = screen.getAllByTestId('pokemon-name');
    expect(pokeId).toHaveLength(1);
  });

  it('Testa os filtros do pokémon', () => {
    renderWithRouter(<App />);

    const buttonAll = screen.getByRole('button', { name: 'All' });

    data.forEach((item) => {
      const button = screen.getByRole('button', { name: item.type });
      expect(button).toBeDefined();
      expect(buttonAll).toBeDefined();
    });
  });

  it('Testa se reseta o filtro', () => {
    renderWithRouter(<App />);
    const noFilter = screen.getByText('Pikachu');
    expect(noFilter).toBeDefined();

    userEvent.click(screen.getByRole('button', { name: 'Fire' }));
    expect(screen.getByText('Charmander')).toBeDefined();
    userEvent.click(screen.getByRole('button', { name: /Próximo Pokémon/i }));
    expect(screen.getByText('Rapidash')).toBeDefined();

    userEvent.click(screen.getByRole('button', { name: 'All' }));
    expect(noFilter).toBeDefined();
  });
});
