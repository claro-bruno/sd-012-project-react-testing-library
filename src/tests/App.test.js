import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testa App', () => {
  test('Verifica se existe links de navegação', () => {
    renderWithRouter(<App />);

    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /favorite pokémons/i })).toBeInTheDocument();
  });

  test('Verifica a página é redicionada ao inicio quando clicado em Home', () => {
    const { history } = renderWithRouter(<App />);

    userEvent.click(screen.getByRole('link', { name: /home/i }));
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('Verifica se a página é redicionada para about quando clicado em About', () => {
    const { history } = renderWithRouter(<App />);

    userEvent.click(screen.getByRole('link', { name: /about/i }));
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  test('Testa se é redicionada para pokémons favoritos quando clicado em pokémon', () => {
    const { history } = renderWithRouter(<App />);

    userEvent.click(screen.getByRole('link', { name: /favorite pokémons/i }));
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  test('Testa se a página é redicionada para not found', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pagina-inexistente');

    expect(screen.getByText('Page requested not found')).toBeDefined();
  });
});
