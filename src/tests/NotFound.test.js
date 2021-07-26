import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import { NotFound } from '../components';

describe('Verifica o componente "NotFound.js"', () => {
  test('Verifica se contém uma tag "h2" com texto "Page Requested not found"', () => {
    renderWithRouter(<NotFound />);
    const h2TitleText = screen.getByText(/Page requested not found/i);
    expect(h2TitleText).toBeInTheDocument();
  });

  test('Verifica se renderiza a imagem selecionada', () => {
    renderWithRouter(<NotFound />);
    const img = screen.getByRole('img');
    expect(img.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
