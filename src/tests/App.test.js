import React from 'react';
import { screen, fireEvent } from '@testing-library/react';

import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testando App ', () => {
  it('Teste se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);
    const links = screen.getAllByRole('link');
    const lengthOfLinks = 4;
    expect(links.length).toBe(lengthOfLinks);
  });

  it(`Teste se a aplicação é redirecionada para a página inicial,
   na URL / ao clicar no link Home da barra de navegação`, () => {
    const { history } = renderWithRouter(<App />);
    const home = screen.getByRole('link', { name: /home/i });
    fireEvent.click(home);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it(`Teste se a aplicação é redirecionada para a página de About,
   na URL /about, ao clicar no link About da barra de navegação.`, () => {
    const { history } = renderWithRouter(<App />);
    const about = screen.getByRole('link', { name: /about/i });
    fireEvent.click(about);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it(`Teste se a aplicação é redirecionada para a página de Pokémons Favoritados,
   na URL /favorites, ao clicar no link Favorite Pokémons da barra de navegação.`, () => {
    const { history } = renderWithRouter(<App />);
    const pokemons = screen.getByRole('link', { name: /favorite/i });
    fireEvent.click(pokemons);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it(`Teste se a aplicação é redirecionada para a página
   Not Found ao entrar em uma URL desconhecida`, () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pagina/que-nao-existe/');
    const noMatch = screen.getByText(/not found/i);
    expect(noMatch).toBeInTheDocument();
  });
});
