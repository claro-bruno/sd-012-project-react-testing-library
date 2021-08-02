import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import NotFound from '../components/NotFound';

describe('Testing NotFound component', () => {
  it('there is a level 2 heading with the "Page requested not found" text',
    () => {
      render(
        <MemoryRouter>
          <NotFound />
        </MemoryRouter>,
      );

      expect(screen.getByRole('img', {
        name: 'Crying emoji',
      })).toBeInTheDocument();

      expect(screen.getByText(/Page requested not found/)).toBeInTheDocument();
    });

  it('there must be a image with a crying pikachu', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>,
    );
    expect(screen.getByRole('img', {
      name: 'Pikachu crying because the page requested was not found',
    })).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
