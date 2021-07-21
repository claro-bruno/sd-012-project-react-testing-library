import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente App.js', () => {
  test('Testa se renderiza um reading com o texto "Pokédex"', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = screen.getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  test('Deve renderizar links Nav no topo da página', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const homeLink = screen.getByText(/Home/i);
    const aboutLink = screen.getByText(/About/i);
    const favoritePokemonLink = screen.getByText(/Favorite Pokémons/i);

    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(favoritePokemonLink).toBeInTheDocument();
  });

  test('Deve redirecionar para página Home quando clicar no link Home', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');
    const homeButton = screen.getByText(/Home/i);
    fireEvent.click(homeButton);
    const home = screen.getByText(/Encountered pokémons/i);
    expect(home).toBeInTheDocument();
  });

  test('Deve redirecionar para página About quando clicar no link About', () => {
    const { history } = renderWithRouter(<App />);
    const aboutButton = screen.getByRole('link', {
      name: /About/i,
    });
    fireEvent.click(aboutButton);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  test('Deve redirecionar para página Favorites quando clicado no 3º link da Nav', () => {
    const { history } = renderWithRouter(<App />);
    const favoriteButton = screen.getByRole('link', {
      name: /Favorite Pokémons/i,
    });
    fireEvent.click(favoriteButton);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  test('Deve redirecionar para Not Found quando a URL for desconhecida', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/xablau');
    const notFoundPage = screen.getByText(/Page requested not found/i);
    expect(notFoundPage).toBeInTheDocument();
  });
});
