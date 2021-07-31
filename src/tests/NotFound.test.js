import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Verifica NotFound.test.js', () => {
  test('Verificar texto h2 exist em notFound', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/xablau');

    const hFou = screen.getByRole('heading', { name: /Page requested not found/i });
    expect(hFou).toBeInTheDocument();

    const imgNoutFound = screen.getAllByRole('img');
    expect(imgNoutFound[1].src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
