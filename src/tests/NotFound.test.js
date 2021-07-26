import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import { NotFound } from '../components';

describe('4 - Test component <NotFound.js />', () => {
  it('4.1 - Test if has a <h2> tag with the message "Encountered pokémons"', () => {
    renderWithRouter(<NotFound />);
    const h2Tag = screen.getByRole('heading', { level: 2 });
    expect(h2Tag).toBeInTheDocument();
  });
  it('4.2 - Test if the page shows a gif error', () => {
    renderWithRouter(<NotFound />);
    const IMAGE_URL = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const imageAltTag = 'Pikachu crying because the page requested was not found';
    const imageError = screen.getByAltText(imageAltTag);
    expect(imageError).toHaveProperty('src', IMAGE_URL);
  });
});
