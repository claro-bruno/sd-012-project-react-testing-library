import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa o componente App', () => {
  it('Existência dos links', () => {
    renderWithRouter(<App />);
    const home = screen.getByRole(
      'link',
      { name: /home/i },
    );
    const about = screen.getByRole('link', { name: /about/i });
    const fav = screen.getByRole('link', { name: /favorite pokémons/i });

    expect(home).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(fav).toBeInTheDocument();
  });

  it('Funcionamento do link home', () => {
    const { history } = renderWithRouter(<App />);
    const home = screen.getByRole('link', { name: /home/i });

    fireEvent.click(home);

    const { pathname } = history.location;
    const homeText = screen.getByText(/Encountered pokémons/i);

    expect(pathname).toBe('/');
    expect(homeText).toBeInTheDocument();
  });

  it('Funcionamento do link about', () => {
    const { history } = renderWithRouter(<App />);
    const about = screen.getByRole('link', { name: /about/i });

    fireEvent.click(about);

    const { pathname } = history.location;
    const aboutText = screen.getByText(/About Pokédex/i);

    expect(pathname).toBe('/about');
    expect(aboutText).toBeInTheDocument();
  });

  it('Funcionamento do link Favorite Pokémons', () => {
    const { history } = renderWithRouter(<App />);
    const fav = screen.getByRole('link', { name: /favorite pokémons/i });

    fireEvent.click(fav);

    const { pathname } = history.location;
    const favText = screen.getByRole('heading', { name: /Favorite pokémons/i });

    expect(pathname).toBe('/favorites');
    expect(favText).toBeInTheDocument();
  });

  it('Aviso de página inexistente', () => {
    const { history } = renderWithRouter(<App />);
    const notFound = '/notFound';

    history.push(notFound);

    const noMatch = screen.getByRole('heading', { name: /Page requested not found/i });
    const { pathname } = history.location;

    expect(pathname).toBe(notFound);
    expect(noMatch).toBeInTheDocument();
  });
});
