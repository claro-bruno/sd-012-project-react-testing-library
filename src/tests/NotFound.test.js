import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Testa componente NotFound', () => {
  beforeEach(() => render(<NotFound />));
  test('Verifica se o componente renderiza a msg correta', () => {
    const message = screen.getByText('Page requested not found');
    expect(message).toBeInTheDocument();
  });
  test('Verifica se renderia a img do Pikachu', () => {
    const img = screen.getByRole('img', { name: /Pikachu crying/i });
    expect(img).toBeInTheDocument();
  });
});
