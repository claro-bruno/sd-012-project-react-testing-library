import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

describe('Test not found text', () => {
  it('test h2', () => {
    // render the page
    renderWithRouter(<NotFound />);
    // get element
    const H2 = screen.getByText(/Page requested not found/i);
    // test
    expect(H2.tagName).toBe('H2');
  });

  it('test gif', () => {
    renderWithRouter(<NotFound />);
    const img = screen.getAllByRole('img');
    expect(img[1].src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
