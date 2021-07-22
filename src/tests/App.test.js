import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helper/renderWithRouter';
import App from '../App';

describe('Criterio 1', () => {
  test('Testes do link `Home`', () => {
    const { history } = renderWithRouter(<App />);
    const home = screen.getByRole('link', { name: 'Home' });
    expect(home).toBeDefined();
    userEvent.click(home);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('Testes do link `About`', () => {
    const { history } = renderWithRouter(<App />); // renderiza o App simulado o Router e desestruturando a chave history do objeto retornado
    const about = screen.getByRole('link', { name: 'About' }); // captura o elemento com tag de link e texto about
    expect(about).toBeDefined(); // verifica o about esta renderizado na tela
    userEvent.click(about); // clica no link
    const { pathname } = history.location; // desestrutura a chave que contem o url do link do objeto location
    expect(pathname).toBe('/about'); // verifica se o url e o correto
  });

  test('Testes do link `Favorite Pokémons`', () => {
    const { history } = renderWithRouter(<App />);
    const favorite = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(favorite).toBeDefined();
    userEvent.click(favorite);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  test('Testes do link `Not Found`', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/quenaoexiste');
    const notFound = screen.getByText('Page requested not found');
    expect(notFound).toBeDefined();
  });
});
