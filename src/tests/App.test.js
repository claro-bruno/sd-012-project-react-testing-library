import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testando o componente App.js', () => {
  test('Verifica se o primeiro link possui o texto Home', () => {
    renderWithRouter(<App />);
    const firstLink = screen.getByRole('link', { name: 'Home' });
    expect(firstLink).toBeInTheDocument();
  });

  test('Verifica se o primeiro link redireciona para a URL correta', () => {
    const { history } = renderWithRouter(<App />);
    const firstLink = screen.getByRole('link', { name: 'Home' });
    userEvent.click(firstLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('Verifica se o segundo link possui o texto About', () => {
    renderWithRouter(<App />);
    const secondLink = screen.getByRole('link', { name: 'About' });
    expect(secondLink).toBeInTheDocument();
  });

  test('Verifica se o segundo link redireciona para a URL correta', () => {
    const { history } = renderWithRouter(<App />);
    const secondLink = screen.getByRole('link', { name: 'About' });
    userEvent.click(secondLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  test('Verifica se o terceiro link possui o texto Favorite Pokémons', () => {
    renderWithRouter(<App />);
    const thirdLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(thirdLink).toBeInTheDocument();
  });

  test('Verifica se o terceiro link redireciona para a URL correta', () => {
    const { history } = renderWithRouter(<App />);
    const thirdLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(thirdLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  test('Verifica se renderiza Not Found', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/not-found');
    expect(screen.getByText('Page requested not found')).toBeDefined();
  });
});
