import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

test('shows the Pokédex when the route is `/`', () => {
  render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );

  expect(screen.getByText('Encountered pokémons')).toBeInTheDocument();
});
