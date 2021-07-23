import { screen } from '@testing-library/react';
import React from 'react';
import { NotFound } from '../components';
import renderWithRouter from '../helper/renderWithRouter';

describe('Test "NotFount" component', () => {
  beforeEach(() => renderWithRouter(<NotFound />));

  it('Tests if page contains text "Page requested not found 😭"', () => {
    const notFoundElement = screen
      .getByRole('heading', { name: /Page requested not found/i });

    expect(notFoundElement).toBeInTheDocument();
  });

  it('Tests if page contains image with specific source', () => {
    const notFoundAltAttribute = /Pikachu crying because the page/i;
    const notFoundImageSrc = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const notFoundImage = screen.getByAltText(notFoundAltAttribute);

    expect(notFoundImage).toBeInTheDocument();
    expect(notFoundImage).toHaveAttribute('src', notFoundImageSrc);
  });
});
