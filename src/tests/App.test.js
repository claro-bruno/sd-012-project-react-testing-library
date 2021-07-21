import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa o componente App', () => {
  it('testa se  contém um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);
    const links = screen.getAllByRole('link');
    console.log(links.length);
    expect(links[0]).toHaveTextContent(/^Home$/);
    expect(links[1]).toHaveTextContent(/^About$/);
    expect(links[2]).toHaveTextContent(/^Favorite Pokémons$/);
  });

  it('testa se somos redirecionados para /about e de volta para Home', () => {
    const { history } = renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: 'Home' });
    const aboutLink = screen.getByRole('link', { name: 'About' });
    userEvent.click(aboutLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
    userEvent.click(homeLink);
    const { pathname: home } = history.location;
    expect(home).toBe('/');
  });

  it('testa se somos redirecionados para /favorites e de volta para Home', () => {
    const { history } = renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: 'Home' });
    const favoriteLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(favoriteLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
    userEvent.click(homeLink);
    const { pathname: home } = history.location;
    expect(home).toBe('/');
  });

  it('testa se somos redirecionados para Not Found', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/void-page');
    const notFoud = screen.getByText('Page requested not found');
    expect(notFoud).toBeInTheDocument();
  });
});

// it('', () => {});
