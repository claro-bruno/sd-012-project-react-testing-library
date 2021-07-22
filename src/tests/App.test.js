import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('1.1 Teste o componente <App.js />', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });
  it('O primeiro link deve possuir o texto Home', () => {
    const homeText = screen.getAllByRole('link');
    expect(homeText[0].innerHTML).toBe('Home');
  });
  it('O segundo link deve possuir o texto About', () => {
    const aboutText = screen.getAllByRole('link');
    expect(aboutText[1].innerHTML).toBe('About');
  });
  it('O terceiro link deve possuir o texto Favorite Pokémons', () => {
    const favoritePokemonsText = screen.getAllByRole('link');
    expect(favoritePokemonsText[2].innerHTML).toBe('Favorite Pokémons');
  });
});
describe('1.2 Teste se a aplicação é redirecionada para a:', () => {
  it('página inicial.', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByText(/Home/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
  it('página de About.', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByText(/About/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });
  it('página de Pokémons Favoritados.', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByText(/Favorite Pokémons/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });
  it('página Not Found.', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/urlquenãoexiste');
    const erro404 = screen.getAllByText(/Page requested not found/i);
    expect(erro404).toBeDefined();
  });
});
