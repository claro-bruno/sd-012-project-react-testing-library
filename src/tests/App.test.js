import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RenderWithrouter from '../services/renderWithRouter';
import App from '../App';

describe('Testes em App.js', () => {
  test('testa os links de nav do App', () => {
    const { history } = RenderWithrouter(<App />);

    const homeLink = screen.getByRole('link', { name: /Home/i });
    expect(homeLink).toBeInTheDocument();
    userEvent.click(homeLink);
    expect(history.location.pathname).toBe('/');

    const aboutLink = screen.getByRole('link', { name: /About/i });
    expect(aboutLink).toBeInTheDocument();
    userEvent.click(aboutLink);
    expect(history.location.pathname).toBe('/about');

    const favoriteLink = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(favoriteLink).toBeInTheDocument();
    userEvent.click(favoriteLink);
    expect(history.location.pathname).toBe('/favorites');

    history.push('/pagina-que-nao-existe');
    const notFound = screen.getByText('Page requested not found');
    expect(notFound).toBeDefined();
  });
});
