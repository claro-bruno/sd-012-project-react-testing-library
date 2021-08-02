import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Test for component FavoritePokemons', () => {
  it('test if "No favorite pokemon found" is shown at first',
    () => {
      render(
        <MemoryRouter>
          <FavoritePokemons />
        </MemoryRouter>,
      );

      expect(screen.getByText('No favorite pokemon found')).toBeInTheDocument();
    });
});
