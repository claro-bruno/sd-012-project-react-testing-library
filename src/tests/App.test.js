import React from 'react';
import { screen } from '@testing-library/react';
import event from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../components/RenderWithRouter';

describe('testando links na tela principal', () => {
  it('verifica se botões home, About e favorite estão na tela', () => {
    renderWithRouter(<App />);
    const BotaoAbout = screen.getByText('About');
    const BotaoHome = screen.getByText('Home');
    const BotaoFavorite = screen.getByText('Favorite Pokémons');
    expect(BotaoAbout).toBeInTheDocument();
    expect(BotaoHome).toBeInTheDocument();
    expect(BotaoFavorite).toBeInTheDocument();
  });

  it('verifica se o click do botão Home esta funcionando', () => {
    const { history } = renderWithRouter(<App />);
    const BotaoHome = screen.getByText(/home/i);
    event.click(BotaoHome);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('verifica se o click do botão About esta funcionando', () => {
    const { history } = renderWithRouter(<App />);
    const BotaoAbout = screen.getByText(/about/i);
    event.click(BotaoAbout);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('verifica se o click do botão favorite pokemon esta funcionando', () => {
    const { history } = renderWithRouter(<App />);
    const BotaoFavorite = screen.getByText(/favorite pokémons/i);
    event.click(BotaoFavorite);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });
});
