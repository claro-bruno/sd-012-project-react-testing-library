import React from 'react';

import { screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import renderWithRouter from './helper';

import App from '../App';

describe('Testa componente App', () => {
  it('should render with a home link', () => {
    const { history } = renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: 'Home' });
    expect(link).toBeInTheDocument();
    userEvent.click(link);
    expect(history.location.pathname).toBe('/');
  });

  it('should render with a about link', () => {
    const { history } = renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: 'About' });
    expect(link).toBeInTheDocument();
    userEvent.click(link);
    expect(history.location.pathname).toBe('/about');
  });

  it('should render with a Favorites link', () => {
    const { history } = renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(link).toBeInTheDocument();
    userEvent.click(link);
    expect(history.location.pathname).toBe('/favorites');
  });
});
