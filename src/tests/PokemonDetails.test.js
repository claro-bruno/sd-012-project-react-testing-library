import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

const { screen } = require('@testing-library/react');

describe('Testa o componente PokemonDetails.js', () => {
  it('Testa informações detalhadas do Pokémon selecionado na tela.', () => {
    renderWithRouter(<App />);
    const links = screen.getAllByRole('link');
    userEvent.click(links[3]);
    const pikachu = screen.getByText('Pikachu');
    expect(pikachu).toBeInTheDocument();
  });
});
