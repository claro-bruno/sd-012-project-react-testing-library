import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import NotFound from '../components/NotFound';

describe('Testing About Component, Requirement 2', () => {
  it('there is a level 2 heading with the "Page requested not found 😭" text',
    () => {
      render(
        <MemoryRouter>
          <NotFound />
        </MemoryRouter>,
      );

      expect(screen.getByRole('heading', {
        level: 2,
        name: 'NotFound',
      })).toBeInTheDocument();
    });

  it('there must be a image with a crying pikachu', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>,
    );
    expect(screen.getByRole('img', {
      name: 'not-found-image',
    })).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
