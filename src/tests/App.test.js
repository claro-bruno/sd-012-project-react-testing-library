import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa o componente App.js', () => {
  it('Testa os links no header', () => {
    const { history } = renderWithRouter(<App />);

    const linkHome = screen.getByRole('link', { name: /Home/i });
    const linkAbout = screen.getByRole('link', { name: /About/i });
    const linkFavorite = screen.getByRole('link', { name: /Favorite Pokémons/i });

    expect(linkHome).toBeDefined();
    expect(linkAbout).toBeDefined();
    expect(linkFavorite).toBeDefined();

    userEvent.click(linkHome);
    expect(history.location.pathname).toBe('/');

    userEvent.click(linkAbout);
    expect(history.location.pathname).toBe('/about');

    userEvent.click(linkFavorite);
    expect(history.location.pathname).toBe('/favorites');

    history.push('/test');
    expect(screen.getByRole('heading', { name: /Page requested not found/i }));
  });
});
