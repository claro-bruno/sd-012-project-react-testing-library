// requisito 1
import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('test if App.js', () => {
  test('Have the links: Home, About and Favorite Pokémons working', () => {
    const { history } = renderWithRouter(<App />);
    const linkHome = screen.getByRole('link', { name: /Home/i });
    const linkAbout = screen.getByRole('link', { name: /About/i });
    const linkFavorite = screen.getByRole('link', { name: /Favorite Pokémons/i });

    expect(history.location.pathname).toBe('/');
    expect(linkHome).toBeInTheDocument();
    expect(linkAbout).toBeInTheDocument();
    expect(linkFavorite).toBeInTheDocument();

    userEvent.click(linkHome);
    expect(history.location.pathname).toBe('/');
    userEvent.click(linkAbout);
    expect(history.location.pathname).toBe('/about');
    userEvent.click(linkFavorite);
    expect(history.location.pathname).toBe('/favorites');

    history.push('/notIsAPage');
    const notFound = screen.getByText(/Page requested not found/i); // getByRole não funcionou aqui :(
    expect(notFound).toBeInTheDocument();
  });
});
