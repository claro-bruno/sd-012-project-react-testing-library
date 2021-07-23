import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste do Component App.js.', () => {
  test('Verifica se o topo da aplicação '
    + 'contém um conjunto fixo de links de navegação.', () => {
    renderWithRouter(<App />);
    const links = screen.getAllByRole('link');

    expect(links[0]).toHaveTextContent('Home');
    expect(links[1]).toHaveTextContent('About');
    expect(links[2]).toHaveTextContent('Favorite Pokémons');
  });

  test('Verifica se a aplicação é redirecionada para a página inicial, '
  + 'na URL / ao clicar no link Home da barra de navegação.', () => {
    const { history } = renderWithRouter(<App />);
    const linkHome = screen.getByRole('link', { name: 'Home' });

    fireEvent.click(linkHome);

    expect(history.location.pathname).toBe('/');
  });

  test('Verifica se a aplicação é redirecionada para a página de About, '
   + 'na URL /about, ao clicar no link About da barra de navegação.', () => {
    const { history } = renderWithRouter(<App />);
    const linkAbout = screen.getByRole('link', { name: 'About' });

    fireEvent.click(linkAbout);

    expect(history.location.pathname).toBe('/about');
  });

  test('Verifica se a aplicação é redirecionada para a página de Pokémons Favoritados, '
  + 'na URL /favorites, ao clicar no link Favorite Pokémons '
  + 'da barra de navegação.', () => {
    const { history } = renderWithRouter(<App />);
    const linkFavoritePokemon = screen.getByRole('link', { name: 'Favorite Pokémons' });

    fireEvent.click(linkFavoritePokemon);

    expect(history.location.pathname).toBe('/favorites');
  });

  test('Verifica se a aplicação é redirecionada para a página Not Found '
  + 'ao entrar em uma URL desconhecida.', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/url-desconhecida');
    const h2NotFound = screen.getByText('Page requested not found');

    expect(h2NotFound).toBeInTheDocument();
  });
});
