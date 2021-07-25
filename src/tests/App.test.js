import React from 'react';
import { /* render, */ screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('1. Testa o componente <App.js />', () => {
  test('Testa se o topo contém um conjunto fixo de links de navegação.', () => {
    const { history } = renderWithRouter(<App />);
    const homeLink = screen.getByText(/home/i);
    const aboutLink = screen.getByText(/about/i);
    const favoriteLink = screen.getByText(/favorite pokémon/i);

    expect(history.location.pathname).toBe('/');
    expect(homeLink).toBeDefined();
    expect(aboutLink).toBeDefined();
    expect(favoriteLink).toBeDefined();

    userEvent.click(aboutLink);
    expect(history.location.pathname).toBe('/about');
    userEvent.click(favoriteLink);
    expect(history.location.pathname).toBe('/favorites');
    userEvent.click(homeLink);
    expect(history.location.pathname).toBe('/');

    history.push('/notFound');
    const notFound = screen.getByText(/not found/i);
    expect(notFound).toBeInTheDocument();
  });
});
