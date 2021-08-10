import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

describe('Teste o componente NotFound', () => {
  beforeEach(() => {
    renderWithRouter(<NotFound />);
  });

  test('A página contém um heading h2 com o texto Page requested not found', () => {
    const headingText = screen.getByRole('heading');
    expect(headingText).toBeInTheDocument();
    expect(headingText.tagName).toBe('H2');
    expect(headingText).toHaveTextContent(/Page requested not found 😭/i);
  });

  test('Teste se a página mostra a seguinte imagem', () => {
    const image = screen.getByAltText(
      'Pikachu crying because the page requested was not found',
    );
    expect(image).toBeInTheDocument();
    expect(image.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
