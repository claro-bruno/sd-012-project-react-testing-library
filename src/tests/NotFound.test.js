import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

describe('Test NotFound.js', () => {
  beforeEach(() => {
    renderWithRouter(<NotFound />);
  });

  it('tests if there is some text with "Page requested not found"', () => {
    const message = 'Page requested not found Crying emoji';
    const notFoundMessage = screen.getByRole('heading', { name: message });
    expect(notFoundMessage).toBeDefined();
  });

  it('tests if there is some image with Pikachu crying ', () => {
    const pikachuImageAlt = 'Pikachu crying because the page requested was not found';
    const cryingPikachuImage = screen.getByRole('img', { name: pikachuImageAlt });
    expect(cryingPikachuImage.src).toStrictEqual('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
