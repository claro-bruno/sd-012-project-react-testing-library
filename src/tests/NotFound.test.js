import React from 'react';
import { screen } from '@testing-library/react';
import renderWhithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

describe('Verificação do componente NotFound', () => {
  beforeEach(() => {
    renderWhithRouter(<NotFound />);
  });

  test('Verifica se contém um H2 com o texto: Page requested not found', () => {
    const title = screen.getByRole('heading', { name: /Page requested not found/i });
    expect(title).toBeInTheDocument();
  });

  test('Verifica a imagem Pikachu Not found', () => {
    const imageContainer = screen.getByRole('img',
      { name: /Pikachu crying because the page requested was not found/i });
    const imageSource = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(imageContainer.src).toBe(imageSource);
  });
});