import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('testes do componente App', () => {
  it('Testa se o topo da aplicação possui três links de navegação', () => {
    renderWithRouter(<App />);
    const homeLink = screen.getByText('Home');
    const aboutLink = screen.getByText('About');
    const favoritePokemonLink = screen.getByText('Favorite Pokémons');

    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(favoritePokemonLink).toBeInTheDocument();
  });

  it('Testa se a aplicação redireciona para a página inicial', () => {
    const { history } = renderWithRouter(<App />);

    fireEvent.click(screen.getByText('Home'));
    const { pathname } = history.location;
    expect(pathname).toBe('/');
    const homeText = screen.getByText('Encountered pokémons');
    expect(homeText).toBeInTheDocument();
  });

  it('Testa se a aplicação é redireciona para a página Pokémons Favoritos', () => {
    const { history } = renderWithRouter(<App />);

    fireEvent.click(screen.getByText('Favorite Pokémons'));
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
    const favoritePokemonsText = screen.getByText('Favorite pokémons');
    expect(favoritePokemonsText).toBeInTheDocument();
  });

  it('Testa se a aplicação é redireciona para a página de About', () => {
    const { history } = renderWithRouter(<App />);

    fireEvent.click(screen.getByText('About'));
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
    const aboutText = screen.getByText('About Pokédex');
    expect(aboutText).toBeInTheDocument();
  });

  it('Testa se a aplicação é redireciona para a página Not Found', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/pagina/que-nao-existe/');
    const noMatch = screen.getByText('Page requested not found');
    expect(noMatch).toBeInTheDocument();
  });
});
