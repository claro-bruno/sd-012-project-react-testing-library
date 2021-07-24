import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa o componente App.js', () => {
  it('Testa os links de navegação do topo da aplicação', () => {
    renderWithRouter(<App />);

    expect(screen.getByText('Home')).toBeInTheDocument();

    expect(screen.getByText('About')).toBeInTheDocument();

    expect(screen.getByText('Favorite Pokémons')).toBeInTheDocument();
  });

  it('Testa redirecionamento para a página inicial', () => {
    const { history } = renderWithRouter(<App />);

    userEvent.click(screen.getByRole('link', { name: 'Home' }));

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('Testa redirecionamento para a página sobre', () => {
    const { history } = renderWithRouter(<App />);

    userEvent.click(screen.getByRole('link', { name: 'About' }));

    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('Testa redirecionamento para a página de Pokémons Favoritados', () => {
    const { history } = renderWithRouter(<App />);

    userEvent.click(screen.getByRole('link', { name: 'Favorite Pokémons' }));

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it('Testa redirecionamento para a página Not Found', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/xablau');

    expect(screen.getByText('Page requested not found')).toBeInTheDocument();
  });
});
