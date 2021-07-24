import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

describe('Teste o componente NotFound.js', () => {
  test('Teste se página contém um heading com o texto Page requested not found', () => {
    renderWithRouter(<NotFound />);
    const message = 'Page requested not found Crying emoji';
    const heading = screen.getByRole('heading', { name: message });
    expect(heading).toBeInTheDocument();
  });
  test('Teste se página contém um heading com o texto Page requested not found', () => {
    renderWithRouter(<NotFound />);
    const imageUrl = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const alt = 'Pikachu crying because the page requested was not found';
    const image = screen.getByRole('img', { name: alt });
    expect(image).toHaveAttribute('src', imageUrl);
  });
});
