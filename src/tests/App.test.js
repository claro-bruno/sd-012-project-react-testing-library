import React from 'react';
import renderWithRouter from '../services/renderWithRouter';
import { screen, fireEvent } from '@testing-library/react';
import App from '../App';

const appLinks = ['Home', 'About', 'Favorite Pokémons', 'More details'];

describe('Test all App component', () => {
  test('if renders all app links when starts application', () => {
    renderWithRouter(<App />);
    const links = screen.getAllByRole('link');
    links.forEach((link, i) => {
      expect(link).toHaveTextContent(appLinks[i]);
    });
  });

  test('if `Home` link redirects to `/` url', () => {
    const { history } = renderWithRouter(<App />);

    const homeLink = screen.getByText(/home/i);
    expect(homeLink).toHaveTextContent('Home');
    fireEvent.click(homeLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('if `About` link redirects to `/about` url', () => {
    const { history } = renderWithRouter(<App />);

    const aboutLink = screen.getByText(/about/i);
    expect(aboutLink).toHaveTextContent('About');
    fireEvent.click(aboutLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  test('if `Favorites` link redirects to `/favorites` url', () => {
    const { history } = renderWithRouter(<App />);

    const favoritesLink = screen.getByText(/favorite pokémons/i);
    expect(favoritesLink).toHaveTextContent('Favorite Pokémons');
    fireEvent.click(favoritesLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  test('if renders NotFound component when when there isnt route for url', () => {
    const { history } = renderWithRouter(<App />);

    let notFound = screen.queryByText(/not found/i);
    expect(notFound).toBeNull();
    history.push('/xablau');
    notFound = screen.queryByText(/not found/i);
    expect(notFound).toBeInTheDocument();
  });
});
