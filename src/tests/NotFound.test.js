import React from 'react';
import { render, screen } from '@testing-library/react';
import { NotFound } from '../components';

describe('Testa o componente NotFound.js', () => {
  beforeEach(() => {
    render(<NotFound />);
  });

  test('Testa se contém um h2 com o texto Page requested not found', () => {
    const noMatch = screen.getByRole('heading', { name: /Page requested not/ });
    expect(noMatch).toBeInTheDocument();
  });

  test('Testa se contém uma imagem', () => {
    const url = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const img = screen.getByRole('img', { name: /Pikachu crying/ });
    expect(img.src).toBe(url);
  });
});
