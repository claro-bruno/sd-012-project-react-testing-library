import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Teste o componente <App.js />', () => {
  it('Testa se o topo contém um conjunto fixo de links de navegação.', () => {
    renderWithRouter(<App />);
    const links = screen.getAllByRole('link');
    expect(links[0]).toHaveTextContent('Home');
    expect(links[1]).toHaveTextContent('About');
    expect(links[2]).toHaveTextContent('Favorite Pokémons');
  });

  it('Teste se a aplicação é redirecionada para a página inicial, '
  + 'na URL / ao clicar no link Home da barra de navegação.', () => {
    const { history } = renderWithRouter(<App />);
    const links = screen.getAllByRole('link');
    const link = links[0];

    fireEvent.click(link);
    const pageContent = screen.getByText('Encountered pokémons');
    const { pathname } = history.location;
    expect(pathname).toBe('/');
    expect(pageContent).toBeInTheDocument();
  });

  it('Teste se a aplicação é redirecionada para a página About, '
  + 'na URL /about ao clicar no link About da barra de navegação.', () => {
    const { history } = renderWithRouter(<App />);
    const links = screen.getAllByRole('link');
    const link = links[1];

    fireEvent.click(link);
    const pageContent = screen.getByText('About Pokédex');
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
    expect(pageContent).toBeInTheDocument();
  });

  it('Teste se a aplicação é redirecionada para a página Pokemons Favoritados, '
  + 'na URL /favorites ao clicar no link Favorite Pkmn da barra de navegação.', () => {
    const { history } = renderWithRouter(<App />);
    const links = screen.getAllByRole('link');
    const link = links[2];

    fireEvent.click(link);
    const pageContent = screen.getByText('Favorite pokémons');
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
    expect(pageContent).toBeInTheDocument();
  });

  it('Teste se a aplicação é redirecionada para a página Not Found '
  + ' ao entrar em uma URL desconhecida.', () => {
    const { history } = renderWithRouter(<App />);
    history.push('xablau');
    const pageContent = screen.getByText('Page requested not found');
    expect(pageContent).toBeInTheDocument();
  });
});
