import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('testa componente APP', () => {
  it('testa link home', () => {
    const { history } = renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: /Home/i });
    expect(homeLink).toBeInTheDocument();
    userEvent.click(homeLink);
    expect(history.location.pathname).toBe('/');
  });

  it('testa link about', () => {
    const { history } = renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', { name: /About/i });
    expect(aboutLink).toBeInTheDocument();
    userEvent.click(aboutLink);
    expect(history.location.pathname).toBe('/about');
  });

  it('testa link favorites', () => {
    const { history } = renderWithRouter(<App />);
    const favLink = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(favLink).toBeInTheDocument();
    userEvent.click(favLink);
    expect(history.location.pathname).toBe('/favorites');
  });

  it('testa notfount', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/noooooooo');
    const notFound = screen.getByRole(
      'heading',
      { level: 2, name: /Page requested not found/i },
    );
    expect(notFound).toBeInTheDocument();
  });
});
