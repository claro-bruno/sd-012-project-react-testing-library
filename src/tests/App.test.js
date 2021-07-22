import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('1 - Teste se contém um conjunto fixo de links de navegação', () => {
  test('O primeiro link deve possuir o texto Home', () => {
    renderWithRouter(<App />);
    const Home = screen.getByText(/Home/i);
    expect(Home).toBeInTheDocument();
  });
  test('O segundo link deve possuir o texto About', () => {
    renderWithRouter(<App />);
    const About = screen.getByText(/About/i);
    expect(About).toBeInTheDocument();
  });
  test('O segundo link deve possuir o texto Favorite Pokémons', () => {
    renderWithRouter(<App />);
    const favorite = screen.getByText(/Favorite Pokémons/i);
    expect(favorite).toBeInTheDocument();
  });
});

test('Redirecionada para a página inicial, `/` ao clicar no link `Home` ', () => {
  const { history } = renderWithRouter(<App />);
  const linkHome = screen.getByRole('link', { name: /home/i });
  const { pathname } = history.location;
  expect(pathname).toBe('/');
  userEvent.click(linkHome);
});
test('Redirecionada para a página /About, ao clicar no link `About` ', () => {
  const { history } = renderWithRouter(<App />);
  const linkAbout = screen.getByRole('link', { name: /about/i });
  const { pathname } = history.location;
  expect(pathname).toBe('/');
  userEvent.click(linkAbout);
});
test('Redirecionada para a página /favorites, ao clicar no link `Favorite` ', () => {
  const { history } = renderWithRouter(<App />);
  const linkFav = screen.getByRole('link', { name: /Favorite Pokémons/i });
  const { pathname } = history.location;
  expect(pathname).toBe('/');
  userEvent.click(linkFav);
});
