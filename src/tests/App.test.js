import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

describe('Testes no component <App.js />', () => {
  test('Há links fixos de navegação. Redirecionam para respectiva página.', () => {
    const { history } = renderWithRouter(<App />);

    const linkHome = screen.getByRole('link', { name: /Home/i });
    expect(linkHome).toBeInTheDocument();
    userEvent.click(linkHome);
    expect(history.location.pathname).toBe('/');

    const linkAbout = screen.getByRole('link', { name: /about/i });
    expect(linkAbout).toBeInTheDocument();
    userEvent.click(linkAbout);
    expect(history.location.pathname).toBe('/about');

    const linkFavorite = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(linkFavorite).toBeInTheDocument();
    userEvent.click(linkFavorite);
    expect(history.location.pathname).toBe('/favorites');

    history.push('/pagina-que-nao-existe');
    const noMacth = screen.getByText('Page requested not found');
    expect(noMacth).toBeDefined();
  });
});
