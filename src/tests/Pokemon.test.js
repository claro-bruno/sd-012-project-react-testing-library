import React from 'react';
// import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
// import data from '../data';
import App from '../App';

describe('Testa o componente <Pokemon.js />', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });
  it('Teste se é renderizado um card com as informações de determinado pokémon', () => {
  });
});
