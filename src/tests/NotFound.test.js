import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

describe('Testa o componente <NotFound.js />', () => {
  test('exibe mensagem No favorite pokemon found', () => {
    renderWithRouter(<NotFound />);
    const text = screen.getByRole('heading', { name: /Page requested not found/i });
    expect(text).toBeInTheDocument();
  });

  test('exibe imagem em Not Found', () => {
    renderWithRouter(<NotFound />);
    const img = screen.getByRole('img', { name: /Pikachu Crying/i });
    expect(img.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
