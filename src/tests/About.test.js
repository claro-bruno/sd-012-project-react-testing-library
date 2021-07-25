import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from './renderWithRouter';

describe('Testa componente About', () => {
  beforeEach(() => {
    renderWithRouter(<About />);
  });

  test('Testa heading', () => {
    const heading = screen.getByRole('heading', { name: /about pokédex/i });
    expect(heading).toBeDefined();
  });

  test('Testa parágrafos', () => {
    const paragraphOne = screen.getByText(/This application simulates a Pokédex/i);
    expect(paragraphOne).toBeDefined();

    const paragraphTwo = screen.getByText(/One can filter Pokémons by/i);
    expect(paragraphTwo).toBeDefined();
  });

  test('Testa src da imagem', () => {
    const SRC = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const srcImg = screen.getByRole('img');
    expect(srcImg).toHaveAttribute('src', SRC);
  });
});
