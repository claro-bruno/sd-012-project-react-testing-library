import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testes do <App />', () => {
  test('Testa se contém um conjunto fixo de links de navegação.', () => {
    renderWithRouter(<App />);
    const home = screen.getByRole('link', { name: /Home/i });
    const about = screen.getByRole('link', { name: /About/i });
    const favoritePokémons = screen.getByRole('link', { name: /Favorite Pokémons/i });

    expect(home).toHaveTextContent('Home');
    expect(about).toHaveTextContent('About');
    expect(favoritePokémons).toHaveTextContent(/Favorite Pokémons/i);
  });

  test('Teste se a aplicação é redirecionada para a Home, ao clicar no link Home', () => {
    const { history } = renderWithRouter(<App />);
    const home = screen.getByRole('link', { name: /Home/i });

    userEvent.click(home);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('Teste se a aplicação é redirecionada para a About, ao clicar no About', () => {
    const { history } = renderWithRouter(<App />);
    const about = screen.getByRole('link', { name: /About/i });

    userEvent.click(about);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  test('Teste se vai para para Favoritados, ao clicar em Favorite Pokémons', () => {
    const { history } = renderWithRouter(<App />);
    const favoritePokémons = screen.getByRole('link', { name: /Favorite Pokémons/i });

    userEvent.click(favoritePokémons);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  test('Teste se vai para Not Found ao entrar em uma URL desconhecida.', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/page_not_found');
    const pageNotFound = screen.getByText(/Page requested not found/i);
    expect(pageNotFound).toBeInTheDocument();
  });
});
