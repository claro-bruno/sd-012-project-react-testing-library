import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Analise do componente app.js', () => {
  it('Verifica se possui todos os diretórios', () => {
    renderWithRouter(<App />);
    const home = screen.getByText('Home');
    const about = screen.getByText('About');
    const favorites = screen.getByText('Favorite Pokémons');

    expect(home).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(favorites).toBeInTheDocument();
  });

  it('Verifica se redireciona para home', () => {
    const { history } = renderWithRouter(<App />);

    fireEvent.click(screen.getByText('Home'));
    const { pathname } = history.location;
    expect(pathname).toBe('/');
    const homeText = screen.getByText('Encountered pokémons');
    expect(homeText).toBeInTheDocument();
  });

  it('Verifica se redireciona para a página Pokemons Favoritos', () => {
    const { history } = renderWithRouter(<App />);

    fireEvent.click(screen.getByText('Favorite Pokémons'));
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
    const favoriteText = screen.getByText('Favorite pokémons');
    expect(favoriteText).toBeInTheDocument();
  });

  it('Verifica se redireciona para a página About', () => {
    const { history } = renderWithRouter(<App />);

    fireEvent.click(screen.getByText('About'));
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
    const aboutText = screen.getByText('About Pokédex');
    expect(aboutText).toBeInTheDocument();
  });

  it('Verifica se é redirecionado para a página Not Found', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/not-found');
    const noMatch = screen.getByText('Page requested not found');
    expect(noMatch).toBeInTheDocument();
  });
});
