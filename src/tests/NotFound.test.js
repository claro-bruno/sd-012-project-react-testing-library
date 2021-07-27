import React from 'react';
import { render, screen } from '@testing-library/react';
import { NotFound } from '../components';

describe('4 - Test component <NotFound.js />', () => {
  beforeEach(() => render(<NotFound />));
  it('4.1 - Test if has a <h2> tag with the message "Page requested not found"', () => {
    const h2Tag = screen.getByRole('heading', { name: /Page requested not found/i });
    expect(h2Tag).toBeInTheDocument();
  });
  it('4.2 - Test if the page shows a gif error', () => {
    const IMAGE_URL = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const imageAltTag = 'Pikachu crying because the page requested was not found';
    const imageError = screen.getByAltText(imageAltTag);
    expect(imageError).toHaveProperty('src', IMAGE_URL);
  });
});
