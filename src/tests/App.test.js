import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Atendendo aos testes do Requisito 1', () => {
  test('Testando Links do Requisito 1', () => {
    renderWithRouter(<App />);
    const homeLink = screen.getAllByRole('link')[0];
    const aboutLink = screen.getAllByRole('link')[1];
    const favoriteLink = screen.getAllByRole('link')[2];
    expect(homeLink.textContent).toBe('Home');
    expect(homeLink).toBeInTheDocument();
    expect(aboutLink.textContent).toBe('About');
    expect(aboutLink).toBeInTheDocument();
    expect(favoriteLink.textContent).toBe('Favorite Pokémons');
    expect(favoriteLink).toBeInTheDocument();
  });
  test('Testando caminhos dos Links do Requisito 1', () => {
    const { history } = renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: 'Home' });
    const aboutLink = screen.getByRole('link', { name: 'About' });
    const favoriteLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(homeLink).toBeInTheDocument();
    userEvent.click(homeLink);
    expect(history.location.pathname).toBe('/');

    expect(aboutLink).toBeInTheDocument();
    userEvent.click(aboutLink);
    expect(history.location.pathname).toBe('/about');

    expect(favoriteLink).toBeInTheDocument();
    userEvent.click(favoriteLink);
    expect(history.location.pathname).toBe('/favorites');

    history.push('/error');
    expect(screen.getByText('Page requested not found')).toBeInTheDocument();
  });
});
