import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './helper/renderWithRouter';
import App from '../App';

describe('`Not found` page tests', () => {
  test('Check if the title is the one expect', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/wrongurl');
    const title = screen.getByRole('heading', { level: 2 });
    expect(title).toHaveTextContent('Page requested not found');
    const image = screen.getAllByRole('img');
    const imgSource = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(image[1]).toHaveAttribute('src', imgSource);
  });
});
