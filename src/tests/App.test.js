import React from 'react';
import { screen } from '@testing-library/react';
import event from '@testing-library/user-event';
import App from '../App';
import renderRouter from '../utils';

describe('Testes do componente App.js', () => {
  it('Checa os links de navegação com os textos "Home, About, Favorite Pokémons"', () => {
    renderRouter(<App />);

    const links = screen.getAllByRole('link');
    const [home, about, favoritePokemon] = links;

    expect(home).toHaveTextContent('Home');
    expect(about).toHaveTextContent('About');
    expect(favoritePokemon).toHaveTextContent('Favorite Pokémons');
  });

  it('Ao clicar em "Home", red. a app para "/"', () => {
    const { history } = renderRouter(<App />);
    const home = screen.getByRole('link', { name: 'Home' });

    event.click(home);

    const { location: { pathname } } = history;

    expect(pathname).toBe('/');
  });

  it('Ao clicar em "About", red. a app para "/about"', () => {
    const { history } = renderRouter(<App />);
    const about = screen.getByRole('link', { name: 'About' });

    event.click(about);

    const { location: { pathname } } = history;

    expect(pathname).toBe('/about');
  });

  it('Ao clicar em "Favorite Pokémons", red. a app para "/favorites"', () => {
    const { history } = renderRouter(<App />);
    const fpoke = screen.getByRole('link', { name: 'Favorite Pokémons' });

    event.click(fpoke);

    const { location: { pathname } } = history;

    expect(pathname).toBe('/favorites');
  });

  it('Ao entrar em uma URL desconhecida, red. a app para "Not Found"', () => {
    const { history } = renderRouter(<App />);
    history.push('/test');

    const notFound = screen.getByText(/page requested not found/i);

    expect(notFound).toBeInTheDocument();
  });
  // Teste Push, problemas com o GitHub
});
