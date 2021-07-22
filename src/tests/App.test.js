import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Verifica App.js', () => {
  it('Testa links de navegação no App.js', () => {
    renderWithRouter(<App />);

    const home = screen.getByRole('link', { name: /home/i });
    const about = screen.getByRole('link', { name: /about/i });
    const favoritePokemon = screen.getByRole('link', { name: /favorite pokémons/i });

    expect(home).toBeDefined();
    expect(about).toBeDefined();
    expect(favoritePokemon).toBeDefined();
  });

  it('Testa redirecionamento para home atráve do link', () => {
    const { history } = renderWithRouter(<App />);

    const home = screen.getByRole('link', { name: /home/i });

    userEvent.click(home);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('Testa redirecionamento para about atráves do link', () => {
    const { history } = renderWithRouter(<App />);

    const about = screen.getByRole('link', { name: /about/i });

    userEvent.click(about);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('Testa redirecionamento para favorite Pokemon atráves do link', () => {
    const { history } = renderWithRouter(<App />);
    const favoritePokemon = screen.getByRole('link', { name: /favorite pokémons/i });

    userEvent.click(favoritePokemon);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it('Testa redirecionamento para not found se adicionar URL desconhecida', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pagina-inexistente');

    expect(screen.getByText('Page requested not found')).toBeDefined();
  });
});
