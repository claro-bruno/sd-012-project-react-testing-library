import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../components/NotFound';
import renderWithRouter from './renderWithRouter';

describe('Testa componente Not Found', () => {
  beforeEach(() => {
    renderWithRouter(<NotFound />);
  });

  test('Testa h2', () => {
    const text = screen.getByRole('heading', { name: /Page requested not found/i });
    expect(text).toBeDefined();
  });

  test('Testa src da imagem', () => {
    const SRC = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const srcImg = screen.getAllByRole('img');
    expect(srcImg[1]).toHaveAttribute('src', SRC);
  });
});
