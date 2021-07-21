import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testa todo o App', () => {
  it('Testa se o App é renderizado em seu estado inicial', () => {
    renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: 'Home' });
    expect(homeLink).toBeInTheDocument();

    const aboutLink = screen.getByRole('link', { name: 'About' });
    expect(aboutLink).toBeInTheDocument();

    const favoriteLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(favoriteLink).toBeInTheDocument();
  });

  it('Testa o redirecionamento para a página inicial', () => {
    renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: 'Home' });
    userEvent.click(homeLink);

    const headerTitle = screen.getByText('Pokédex');
    expect(headerTitle).toBeDefined();
  });

  it('Testa o redirecionamento para a página about', () => {
    renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', { name: 'About' });
    userEvent.click(aboutLink);

    const headerTitle = screen.getByText('About Pokédex');
    expect(headerTitle).toBeDefined();
  });

  it('Testa o redirecionamento para a página favorites pokemons', () => {
    renderWithRouter(<App />);
    const favoriteLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(favoriteLink);

    const headerTitle = screen.getByText('Favorite pokémons');
    expect(headerTitle).toBeDefined();
  });

  it('Testa o redirecionamento para a página not found', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/nao-tem-essa-página');
    const notFoundText = screen.getByAltText(
      'Pikachu crying because the page requested was not found',
    );
    expect(notFoundText).toBeInTheDocument();
  });
});
