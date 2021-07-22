import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import userEvent from '@testing-library/user-event';

describe('Verifica se os links estao sendo renderizados no App', () => {
  test('Verifica se Home aparece', () => {
    renderWithRouter(<App />);

    const home = screen.getByRole('link', {
      name: /Home/i,
    });

    expect(home).toBeInTheDocument();
  });

  test('Verifica se About aparece', () => {
    renderWithRouter(<App />);
    const about = screen.getByRole('link', {
      name: /about/i,
    });

    expect(about).toBeInTheDocument();
  });

  test('Verifica se Favorite Pokémons aparece', () => {
    renderWithRouter(<App />);
    const favorite = screen.getByRole('link', {
      name: /Favorite Pokémons/i,
    });

    expect(favorite).toBeInTheDocument();
  });
});

describe('Ver os corretos', () => {
  test('Verifica se ao clicar em home a URL fica em /', () => {
    const { history } = renderWithRouter(<App />);

    const home = screen.getByRole('link', {
      name: /Home/i,
    });

    expect(home).toBeInTheDocument();

    userEvent.click(home);

    const { pathname } = history.location;

    expect(pathname).toBe('/');
  });

  test('Verifica se ao clicar em About, a URL se torna /About', () => {
    const { history } = renderWithRouter(<App />);
    const about = screen.getByRole('link', {
      name: /about/i,
    });

    expect(about).toBeInTheDocument();

    userEvent.click(about);

    const { pathname } = history.location;

    expect(pathname).toBe('/about');
  });

  test('Verifica se ao clicar em Favorite Pokémons, a URL se torna /favorites', () => {
    const { history } = renderWithRouter(<App />);
    const favorite = screen.getByRole('link', {
      name: /Favorite Pokémons/i,
    });

    expect(favorite).toBeInTheDocument();

    userEvent.click(favorite);

    const { pathname } = history.location;

    expect(pathname).toBe('/favorites');
  });

  test('Verifica se ao colocar uma url desconhecida, renderiza o Not Found', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/digimon');
    const { pathname } = history.location;

    expect(pathname).toBe('/digimon');
  });
});
