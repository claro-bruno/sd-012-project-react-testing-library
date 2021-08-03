import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testes do componente App.js', () => {
  describe('Testa o caminho da página inicial', () => {
    it('Teste se a página principal é renderizada ao carregar no caminho "/".', () => {
      const { history } = renderWithRouter(<App />);
      expect(history.location.pathname).toBe('/');
    });
  });

  describe('Testa se os links do topo da aplicação', () => {
    const { getByRole } = renderWithRouter(<App />);
    const navigation = getByRole('navigation');

    it('Testa se o topo da aplicação contém um conjunto fixo de links.', () => {
      const totalOfLinks = 3;
      expect(navigation.childNodes.length).toBe(totalOfLinks);
    });

    it('Testa se o primeiro link possui o texto "Home"', () => {
      expect(navigation.childNodes[0].textContent).toBe('Home');
    });

    it('Testa se o segundo link possui o texto "About"', () => {
      expect(navigation.childNodes[1].textContent).toBe('About');
    });

    it('Testa se o terceiro link possui o texto "Favorite Pokémons"', () => {
      expect(navigation.childNodes[2].textContent).toBe('Favorite Pokémons');
    });
  });

  describe('Testa o redirecionamento dos links', () => {
    it('Testa se ao clicar no link "Home" é redirecionado para o caminho "/"',
      () => {
        const { getByText, history } = renderWithRouter(<App />);
        const home = getByText(/Home/i);
        fireEvent.click(home);
        const { pathname } = history.location;
        expect(pathname).toBe('/');
        expect(getByText(/Encountered pokémons/i)).toBeInTheDocument();
      });

    it('Testa se ao clicar no link "About" é redirecionado para o caminho "/about"',
      () => {
        const { getByText, history } = renderWithRouter(<App />);
        const about = getByText(/About/i);
        fireEvent.click(about);
        const { pathname } = history.location;
        expect(pathname).toBe('/about');
        expect(getByText(/About Pokédex/i)).toBeInTheDocument();
      });

    it('Testa se ao clicar no link "Favorite Pokémons" é redirecionado para "/favorites"',
      () => {
        const { getByText, history } = renderWithRouter(<App />);
        const favouritePokemons = getByText(/Favorite Pokémons/i);
        fireEvent.click(favouritePokemons);
        const { pathname } = history.location;
        expect(pathname).toBe('/favorites');
        expect(getByText(/Favorite pokémons/)).toBeInTheDocument();
      });

    it('Testa se ao entrar em uma página inexistente é redirecionado para "not found"',
      () => {
        const { getByText, history } = renderWithRouter(<App />);
        history.push('/page/does-not-exist/');
        const noMatch = getByText(/Page requested not found/i);
        expect(noMatch).toBeInTheDocument();
      });
  });
});
