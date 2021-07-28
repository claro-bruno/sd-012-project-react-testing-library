import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

test('Verifica se o primeiro link possui o texto `Home`', () => {
  renderWithRouter(<App />);
  const linkToHome = screen.getByRole('link', { name: 'Home' });
  expect(linkToHome).toBeInTheDocument();
});

test('Verifica se o segundo link possui o texto `About`', () => {
  renderWithRouter(<App />);
  const linkToAbout = screen.getByRole('link', { name: 'About' });
  expect(linkToAbout).toBeInTheDocument();
});

test('Verifica se o terceiro link possui o texto `Favorite Pokémons`', () => {
  renderWithRouter(<App />);
  const linkToFavoritePokémons = screen.getByRole('link', { name: 'Favorite Pokémons' });
  expect(linkToFavoritePokémons).toBeInTheDocument();
});

test('Teste se a aplicação é redirecionada para a página inicial, na URL', () => {
  const { history } = renderWithRouter(<App />);
  const linkToHome = screen.getByRole('link', { name: 'Home' });
  userEvent.click(linkToHome);
  const { pathname } = history.location;
  expect(pathname).toBe('/');
});

test('Teste se a aplicação é redirecionada para a página de `About`', () => {
  const { history } = renderWithRouter(<App />);
  const linkToAbout = screen.getByRole('link', { name: 'About' });
  userEvent.click(linkToAbout);
  const { pathname } = history.location;
  expect(pathname).toBe('/about');
});

test('Teste se a aplicação é redirecionada para a página de `Pokémons Fav`', () => {
  const { history } = renderWithRouter(<App />);
  const linkToFavoritePokémons = screen.getByRole('link', { name: 'Favorite Pokémons' });
  userEvent.click(linkToFavoritePokémons);
  const { pathname } = history.location;
  expect(pathname).toBe('/favorites');
});

test('Teste se a aplicação é redirecionada para a página `Not Found`', () => {
  const { history } = renderWithRouter(<App />);
  history.push('/pagina-não-encontrada');
  expect(screen.getByText('Page requested not found')).toBeDefined();
});
