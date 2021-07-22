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
    const { history } = renderWithRouter(<App />);
    const about = screen.getByRole('link', { name: 'About' });
    expect(about).toBeDefined();
    userEvent.click(about);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
    const title = screen.getAllByRole('heading', 'About Pokédex');
    expect(title).toBeDefined();
    const textFirstP = 'This application simulates a Pokédex';
    const textSecondP = 'One can filter Pokémons by type';
    expect(textFirstP).toBeDefined();
    expect(textSecondP).toBeDefined();
    const image = screen.getByRole('img');
    const imgSrc = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(image).toHaveAttribute('src', imgSrc);
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
