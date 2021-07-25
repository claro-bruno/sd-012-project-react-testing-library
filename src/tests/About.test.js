import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import About from '../components/About';
import renderWithRouter from './renderWithRouter';

describe('Testando o componente About.js', () => {
  test('Testa se página contem h2 com texto "About Pokédex"', () => {
    renderWithRouter(<About />);
    const h2About = screen.getByRole('heading', { name: 'About Pokédex' });
    expect(h2About).toBeDefined();
  });
});
