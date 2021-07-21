import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';
import renderWithRouter from '../renderWithRouter';

const altText = 'Pikachu crying because the page requested was not found';
const link = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

describe('Testando o componente NotFound', () => {
  test('Testa se a página tem um h2', () => {
    renderWithRouter(<NotFound />);
    const h2 = screen.getByRole('heading');
    expect(h2).toBeInTheDocument();
  });

  test('Verifica se o h2 contém o texto "Page requested not found"', () => {
    renderWithRouter(<NotFound />);
    const h2 = screen.getByRole('heading');
    const condition = h2.innerHTML.includes('Page requested not found');
    expect(condition).toBe(true);
  });

  test('Verifica se a página mostra o gif correto', () => {
    renderWithRouter(<NotFound />);
    const img = screen.getByAltText(altText);
    expect(img.src).toBe(link);
  });
});
