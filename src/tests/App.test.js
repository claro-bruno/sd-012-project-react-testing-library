import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testa o componente <App />', () => {
  it('Testa se a página Pokédex é renderizada no caminho "/"', () => {
    const { history } = renderWithRouter(<App />);
    const home = screen.getByText(/encountered pokémons/i);
    expect(home).toBeInTheDocument();

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('Testa se ao clicar no link "Home" é redirecionado para a rota "/"', () => {
    const { history } = renderWithRouter(<App />);
    const linkHome = screen.getByRole('link', { name: /home/i });
    expect(linkHome).toBeInTheDocument();
    userEvent.click(linkHome);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('Testa se ao clicar no link "About" é redirecionado para a rota "/about"', () => {
    const { history } = renderWithRouter(<App />);
    const linkAbout = screen.getByRole('link', { name: /about/i });
    expect(linkAbout).toBeInTheDocument();
    userEvent.click(linkAbout);

    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it(`Testa se ao clicar no link "Favorite Pokémons"
  é redirecionado para a rota "/favorites"`, () => {
    const { history } = renderWithRouter(<App />);
    const linkFavs = screen.getByRole('link', { name: /favorite pokémons/i });
    expect(linkFavs).toBeInTheDocument();
    userEvent.click(linkFavs);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it('Testa se exibe página de "Not Found"', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pagina-que-nao-existe');
    expect(screen.getByText(/Page requested not found/)).toBeDefined();
  });
});
