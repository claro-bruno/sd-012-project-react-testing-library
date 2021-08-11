import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import { NotFound } from '../components';

describe('Test component Not Found', () => {
  it('The page contains one heading h2 with the text Page requested not found', () => {
    renderWithRouter(<NotFound />);

    const $notFoundH2 = screen.getByText(/Page requested not found/i);
    expect($notFoundH2).toBeInTheDocument('');
  });

  it('Test if page show the image', () => {
    renderWithRouter(<NotFound />);

    const $image = screen
      .getByAltText(/Pikachu crying because the page requested was not found/i);
    expect($image).toBeInTheDocument('');

    const $IMG_GIF = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect($image.src).toBe($IMG_GIF);
  });
});
