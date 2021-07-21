import React from 'react';
import { screen } from '@testing-library/react';

import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

test('Infos da página notfound', () => {
  renderWithRouter(<NotFound />);
  const h2Text = screen.getByRole('heading', { level: 2 });
  expect(h2Text.textContent).toBe('Page requested not found 😭');

  const imgPikachu = screen
    .getByAltText('Pikachu crying because the page requested was not found');
  expect(imgPikachu.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
