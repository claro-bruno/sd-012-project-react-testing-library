import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testa o componente <App.js />', () => {
  test('verifica conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);
    const linkToHome = screen.getAllByRole('link');
    expect(linkToHome[0].textContent).toBe('Home');
    expect(linkToHome[1].textContent).toBe('About');
    expect(linkToHome[2].textContent).toBe('Favorite Pokémons');
  });

  test('Redireciona para página inicial', () => {
    const { history } = renderWithRouter(<App />);
    const linkToHome = screen.getByRole('link', { name: /home/i });
    userEvent.click(linkToHome);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('Redireciona para página About', () => {
    const { history } = renderWithRouter(<App />);
    const linkToAbout = screen.getByRole('link', { name: /about/i });
    userEvent.click(linkToAbout);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  test('Redireciona para página Pokémons Favoritados', () => {
    const { history } = renderWithRouter(<App />);
    const linkToPokemon = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(linkToPokemon);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  test('Redireciona para Not Found', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pagina-que-nao-existe');
    expect(screen.getByText('Page requested not found')).toBeDefined();
  });
});
