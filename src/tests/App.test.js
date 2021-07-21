import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa o componente App', () => {
  it('Tem um header com os links', () => {
    const { history } = renderWithRouter(<App />);
    expect(history.location.pathname).toBe('/');

    const homeLink = screen.getByRole('link', { name: 'Home' });
    expect(homeLink).toBeInTheDocument();

    const aboutLink = screen.getByRole('link', { name: 'About' });
    expect(aboutLink).toBeInTheDocument();

    const favoriteLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(favoriteLink).toBeInTheDocument();
  });

  it('Testa se é redirecionado ao Home ao clicar no link home.', () => {
    const { history } = renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', { name: 'Home' });
    userEvent.click(homeLink);

    expect(history.location.pathname).toBe('/');
    const header = screen.getByRole('heading', { name: 'Encountered pokémons' });
    expect(header).toBeInTheDocument();
  });

  it('Testa se é redirecionado ao About ao clicar no link about.', () => {
    const { history } = renderWithRouter(<App />);
    expect(history.location.pathname).toBe('/');

    const aboutLink = screen.getByRole('link', { name: 'About' });
    expect(aboutLink).toBeInTheDocument();
    userEvent.click(aboutLink);

    const header = screen.getByRole('heading', { name: 'About Pokédex' });
    expect(header).toBeInTheDocument();
    expect(history.location.pathname).toBe('/about');
  });

  it('Testa se é redirecionado ao Favorites ao clicar no link Favorite Pokémons.', () => {
    const { history } = renderWithRouter(<App />);
    expect(history.location.pathname).toBe('/');

    const favoriteLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(favoriteLink).toBeInTheDocument();
    userEvent.click(favoriteLink);

    const header = screen.getByRole('heading', { name: 'Favorite pokémons' });
    expect(header).toBeInTheDocument();
    expect(history.location.pathname).toBe('/favorites');
  });

  it('Testa se é direcionado para a pagina notfound caso a url não exista', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/trybe');
    const imageText = { name: 'Pikachu crying because the page requested was not found' };
    const image = screen.getByRole('img', imageText);
    expect(image).toBeInTheDocument();
  });
});
