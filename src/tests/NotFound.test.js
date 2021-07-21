import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import NotFound from '../components/NotFound';
import App from '../App';

describe('Test all `NotFound` component', () => {
  test('if renders `NotFound` component with Heading `Page requested not found`', () => {
    renderWithRouter(<NotFound />);

    const heading = screen.getByRole('heading');
    expect(heading.tagName).toBe('H2');
    expect(heading).toHaveTextContent(/Page requested not found/i);
  });

  test('if shows a image', () => {
    renderWithRouter(<NotFound />);

    const images = screen.getAllByRole('img');
    expect(images[1].src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });

  test('if renders `NotFound` component with a no route url address', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/xablau');
    const headings = screen.getAllByRole('heading');
    expect(headings[1].tagName).toBe('H2');
    expect(headings[1]).toHaveTextContent(/Page requested not found/i);
  });
});
