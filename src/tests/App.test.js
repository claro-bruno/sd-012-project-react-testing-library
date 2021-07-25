import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Verifica se os links estao sendo renderizados no App', () => {
  it('Verifica se Home aparece', () => {
    renderWithRouter(<App />);

    const home = screen.getByRole('link', {
      name: /Home/i,
    });

    expect(home).toBeInTheDocument();
  });

  it('Verifica se About aparece', () => {
    renderWithRouter(<App />);
    const about = screen.getByRole('link', {
      name: /about/i,
    });

    expect(about).toBeInTheDocument();
  });

  it('Verifica se Favorite Pokémons aparece', () => {
    renderWithRouter(<App />);
    const favorite = screen.getByRole('link', {
      name: /Favorite Pokémons/i,
    });

    expect(favorite).toBeInTheDocument();
  });
});

describe('Verifica se os links estao direcionando corretamente', () => {
  it('Verifica se ao clicar em home a URL fica em /', () => {
    const { history } = renderWithRouter(<App />);

    const home = screen.getByRole('link', {
      name: /Home/i,
    });

    expect(home).toBeInTheDocument();

    userEvent.click(home);

    const { pathname } = history.location;

    expect(pathname).toBe('/');
  });

  it('Verifica se ao clicar em About, a URL se torna /About', () => {
    const { history } = renderWithRouter(<App />);
    const about = screen.getByRole('link', {
      name: /about/i,
    });

    expect(about).toBeInTheDocument();

    userEvent.click(about);

    const { pathname } = history.location;

    expect(pathname).toBe('/about');
  });

  it('Verifica se ao clicar em Favorite Pokémons, a URL se torna /favorites', () => {
    const { history } = renderWithRouter(<App />);
    const favorite = screen.getByRole('link', {
      name: /Favorite Pokémons/i,
    });

    expect(favorite).toBeInTheDocument();

    userEvent.click(favorite);

    const { pathname } = history.location;

    expect(pathname).toBe('/favorites');
  });

  it('Verifica se ao colocar uma url desconhecida, renderiza o Not Found', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/digimon');
    const { pathname } = history.location;
    const image = screen.getByRole('img', {
      name: /Pikachu crying because the page requested was not found/i,
    });

    expect(image).toBeInTheDocument();
    expect(pathname).toBe('/digimon');
  });
});
