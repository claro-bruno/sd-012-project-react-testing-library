import React from 'react';
import { screen, render } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('testa a pagina notFound',() => {
  test('testa se existe um h2 "Page requested not found 😭"', () => {
    render(<NotFound />);
    const findH2 = screen.getByRole('heading', { level: 2});
    expect(findH2).toHaveTextContent(/Page requested not found 😭/i);
  });
  test('testa se existe o gif fofinho do pika', () => {
    render(<NotFound />);
    const link = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif'
    const gif = screen.getByAltText(/Pikachu crying because the page requested was not found/i);
    expect(gif.src).toBe(link)
  })
})
