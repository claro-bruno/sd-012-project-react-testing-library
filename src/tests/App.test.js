import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('App tests', () => {
  it('Testing the links', () => {
    const { history } = renderWithRouter(<App />);
    const homeLink = screen.getByText(/home/i);
    const aboutLink = screen.getByText(/about/i);
    const favLink = screen.getByText(/favorite pokémons/i);

    expect(history.location.pathname).toBe('/');
    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(favLink).toBeInTheDocument(); // 100% mutants!

    userEvent.click(aboutLink);
    expect(history.location.pathname).toBe('/about');
    userEvent.click(favLink);
    expect(history.location.pathname).toBe('/favorites');
    userEvent.click(homeLink);
    expect(history.location.pathname).toBe('/');

    history.push('/notIsAPage');
    const notFoundTxt = screen.getByText(/Page requested not found/i);
    expect(notFoundTxt).toBeInTheDocument();
  });
});
