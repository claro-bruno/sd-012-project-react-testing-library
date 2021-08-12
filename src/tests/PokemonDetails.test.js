import React from 'react';
// import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Teste o componente PokemonDetails', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });
  test('Teste se as informações detalhadas do Pokémon são mostradas na tela.', () => {

  });
});
