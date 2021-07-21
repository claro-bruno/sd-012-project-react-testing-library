import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testes do componente App', () => {
  test('Verifica se existe um conjunto de links de navegação fixo', () => {
    renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: 'Home' });
    const aboutLink = screen.getByRole('link', { name: 'About' });
    const favoriteLink = screen.getByRole('link', { name: 'Favorite Pokémons' });

    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(favoriteLink).toBeInTheDocument();
  });

  test('Verifica se ao clicar no link Home a URL da página é "/"', () => {
    const { history } = renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: 'Home' });
    userEvent.click(homeLink);
    const url = history.location.pathname;
    expect(url).toBe('/');
  });

  test('Verifica se ao clicar no link About a URL da página é "/about"', () => {
    const { history } = renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', { name: 'About' });
    userEvent.click(aboutLink);
    const url = history.location.pathname;
    expect(url).toBe('/about');
  });

  test('Verifica se a URL é "/favorites" ao clicar em Favorite Pokémons', () => {
    const { history } = renderWithRouter(<App />);
    const favoriteLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(favoriteLink);
    const url = history.location.pathname;
    expect(url).toBe('/favorites');
  });

  test('Verifica se a página Not Found aparece quando tem uma URL desconhecida', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/url/desconhecida');
    const notFoundText = screen.getByText('Page requested not found');
    expect(notFoundText).toBeInTheDocument();
  });
});
