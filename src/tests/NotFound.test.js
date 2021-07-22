import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderwithRouter';

describe('Testing component NotFound.js', () => {
  it('the page contain a "h2" with text "Page requested not found 😭"', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/any-page');
    const heading = screen.getByRole('heading', { name: /page requested not found/i });
    expect(heading).toBeInTheDocument();
  });

  it('the page contain the right image', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/any-page');
    const src = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const img = screen.getByAltText(/not found/i);
    expect(img).toHaveAttribute('src', src);
  });
});
