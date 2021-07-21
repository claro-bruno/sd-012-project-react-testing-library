import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente <App.js />', () => {
  it('Se a página principal da Pokédex é renderizada ao carregar o caminho "/"', () => {
    renderWithRouter(<App />);
    const homePage = screen.getByText(/No favorite pokemon found/i);
    expect(homePage).toBeInTheDocument();
  });

  it('Teste se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Favorite Pokémons')).toBeInTheDocument();
  });

  it('Redireciona para / ao clicar em Home', () => {
    const { history } = renderWithRouter(<App />);
    const home = screen.getByText('Home');
    fireEvent.click(home);
    expect(history.location.pathname).toBe('/');
  });

  it('Redireciona para /about ao clicar em About', () => {
    const { history } = renderWithRouter(<App />);
    const about = screen.getByText('About');
    fireEvent.click(about);
    expect(history.location.pathname).toBe('/about');
  });

  it('Redireciona para /favorites ao clicar em Favorite Pokémons', () => {
    const { history } = renderWithRouter(<App />);
    const favorite = screen.getByText('Favorite Pokémons');
    fireEvent.click(favorite);
    expect(history.location.pathname).toBe('/favorites');
  });

  it('Redireciona para a página Not Found ao entrar em uma URL desconhecida.', () => {
    const { history } = renderWithRouter(<App />);
    history.push('sergio-barbosa');
    const error = screen.getByText(/Page requested not found/);
    expect(error).toBeInTheDocument();
  });
});
