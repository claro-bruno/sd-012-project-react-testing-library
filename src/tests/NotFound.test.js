import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Teste o componente NotFound', () => {
  beforeEach(() => {
    render(<NotFound />);
  });
  test('Teste a mensagem apresentada na tela', () => {
    const message = screen.getByRole('heading', { name: /Page requested not found/i });
    const crying = screen.getByRole('img', { name: /Crying emoji/i });
    expect(message).toBeInTheDocument();
    expect(crying).toBeInTheDocument();
  });
  test('Test a imagem apresentada na tela', () => {
    const imageSource = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const imageText = 'Pikachu crying because the page requested was not found';
    const notFoundImage = screen.getByAltText(imageText);
    expect(notFoundImage).toHaveProperty('src', imageSource);
  });
});
