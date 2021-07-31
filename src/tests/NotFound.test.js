import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import { NotFound } from '../components';

describe('Verifica NotFound.test.js', () => {
  test('Verifica se h2 em notFound', () => {
    renderWithRouter(<NotFound />);

    const NotFoun = screen.getByRole('heading', { name: /Page requested not found 😭/i });
    expect(NotFoun).toBeDefined();
    const imgNoutFound = screen.getByRole('img');
    expect(imgNoutFound.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
