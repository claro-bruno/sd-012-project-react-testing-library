import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa componente App', () => {
  test('Testa se o topo da aplicação contém um links fixos de navegação.', () => {
    renderWithRouter(<App />);
    const link = screen.getAllByRole('link');
    expect(link[0].innerHTML).toBe('Home');
    expect(link[1].innerHTML).toBe('About');
    expect(link[2].innerHTML).toBe('Favorite Pokémons');
  });

  test('Testa se é redirecionada para página com url "/" clicando no Home', () => {
    const { history } = renderWithRouter(<App />);
    const linkHome = screen.getAllByRole('link')[0];
    userEvent.click(linkHome);
    const url = history.location.pathname;
    expect(url).toBe('/');
  });

  test('Testa se é redirecionada para página com url "/about" clicando no About', () => {
    const { history } = renderWithRouter(<App />);
    const linkAbout = screen.getAllByRole('link')[1];
    userEvent.click(linkAbout);
    const url = history.location.pathname;
    expect(url).toBe('/about');
  });

  test('Testa se é mandado para url "/favorites" clicando no favorites', () => {
    const { history } = renderWithRouter(<App />);
    const linkFavorites = screen.getAllByRole('link')[2];
    userEvent.click(linkFavorites);
    const url = history.location.pathname;
    expect(url).toBe('/favorites');
  });

  test('Testa se é redirecionada para a página Not Found ao digitar URL errada.', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/notFound');
    const url = history.location.pathname;
    expect(url).toBe('/notFound');
    const imgNotFound = screen
      .getByAltText(/Pikachu crying because the page requested was not found/i);
    expect(imgNotFound).toBeInTheDocument();
  });
});
