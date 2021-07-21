import React from 'react';
import NotFound from '../components/NotFound';
import { render, screen } from '@testing-library/react';

describe("Tests for NotFound component.", () => {
  it("Test if component has the correct title and image.", () => {
    render(<NotFound />);
    const notFoundHeading = screen.getByRole(/heading/i, { name: /Page requested not found/i });
    const notFoundImages = screen.getAllByRole(/img/i);

    expect(notFoundImages[1]).toHaveProperty('alt', 'Pikachu crying because the page requested was not found');
    expect(notFoundImages[1]).toHaveProperty('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif')
    expect(notFoundHeading).toBeDefined();
  });
});