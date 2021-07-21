import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import userEvent from '@testing-library/user-event';

describe('verefica a existencia dos links de navegação', () => {
  test('verifica que há os links "home"  na tela', () => {
    const { history } = renderWithRouter(<App/>);
    userEvent.click(screen.getByText(/Home/i));
    const pathname = history.location.pathname;
    expect(pathname).toBe('/');
    const HomeAll = screen.getByText(/Encountered pokémons/);
    expect(HomeAll).toBeInTheDocument();
  });

  test('verifica que há os links "About"  na tela', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByText(/About/i));
    const pathname = history.location.pathname;
    expect(pathname).toBe('/about');
    const aboutAll = screen.getByText(/About Pokédex/);
    expect(aboutAll).toBeInTheDocument();
  });
  
  test('verifica que há os links "Favorite pokémons"  na tela', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByText(/Favorite pokémons/i));
    const pathname = history.location.pathname;
    expect(pathname).toBe('/favorites');
    const favoritetAll = screen.getByText(/Favorite pokémons/);
    expect(favoritetAll).toBeInTheDocument();
  });
  
  test('verifica a não existencia da pagina "Xablau" = true ', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/Xablau');
    const noMatch = screen.getByText(/Page requested not found/i)
    expect(noMatch).toBeInTheDocument();
  });
});
