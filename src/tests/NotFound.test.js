import React from 'react';

import { screen } from '@testing-library/react';

import renderWithRouter from './helper';

import NotFound from '../components/NotFound';

describe('Testa componente NotFound', () => {
  it('should render with a home link', () => {
    renderWithRouter(<NotFound />);
    const title = screen.getByRole(
      'heading', { level: 2 },
    );
    expect(title.textContent).toBe('Page requested not found 😭');
  });

  it('should render with a image ', () => {
    renderWithRouter(<NotFound />);
    const image = screen.getByAltText(
      'Pikachu crying because the page requested was not found',
    );
    expect(image).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
    expect(image).toBeInTheDocument();
  });
});
