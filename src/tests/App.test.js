import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './Helper/RendeWithRouter';

describe('Testa componente App', () => {
  test('Verifica se renderiza os links de navegação', () => {
    renderWithRouter(<App />);

    const linkHome = screen.getByRole('link', { name: 'Home' });
    const linkAbout = screen.getByRole('link', { name: 'About' });
    const linkFavPoke = screen.getByRole('link', { name: 'Favorite Pokémons' });

    const links = [linkHome, linkAbout, linkFavPoke];

    links.forEach((link) => {
      expect(link).toBeInTheDocument();
    });
  });
  test('Verifica se a URL de redirecionamento para page Home é correta ', () => {
    const { history } = renderWithRouter(<App />);

    const linkHome = screen.getByRole('link', { name: 'Home' });
    userEvent.click(linkHome);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
  test('Verifica se a URL de redirecionamento para page About é correta ', () => {
    const { history } = renderWithRouter(<App />);

    const linkAbout = screen.getByRole('link', { name: 'About' });
    userEvent.click(linkAbout);

    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });
  test('Verifica se a URL de redirecionamento para page Favorit é correta ', () => {
    const { history } = renderWithRouter(<App />);

    const linkFavPoke = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(linkFavPoke);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });
  test('Verifica se a page NotFound é renderizada', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/not-found');
    const notFound = screen.getByText('Page requested not found');
    expect(notFound).toBeDefined();
  });
});
