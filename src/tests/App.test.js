import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testando component App', () => {
  it('Testando Links', () => {
    const { history } = renderWithRouter(<App />);
    const homeLink = screen.getByText(/home/i);
    const aboutLink = screen.getByText(/about/i);
    const favoriteLink = screen.getByText(/favorite pokémons/i);

    expect(history.location.pathname).toBe('/');
    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(favoriteLink).toBeInTheDocument();

    userEvent.click(homeLink);
    expect(history.location.pathname).toBe('/');
    userEvent.click(aboutLink);
    expect(history.location.pathname).toBe('/about');
    userEvent.click(favoriteLink);
    expect(history.location.pathname).toBe('/favorites');

    history.push('/NotIsAPage');
    const pageNotFound = screen.getByText(/Page requested not found/i);
    expect(pageNotFound).toBeInTheDocument();
  });
});
