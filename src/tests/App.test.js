import React from 'react';
import { render } from '@testing-library/react';
import renderWithRouter from './renderWithRouter'
import { fireEvent } from '@testing-library/react';
import App from '../App';

describe('verefica a existencia dos links de navegação', () => {
  test('verifica que há os links "home"  na tela', () => {
    const { getByText, history } = renderWithRouter(<App/>);
    fireEvent.click(getByText(/Home/i));
    const pathname = history.location.pathname;
    expect(pathname).toBe('/');
    const HomeAll = getByText(/Encountered pokémons/);
    expect(HomeAll).toBeInTheDocument();
  });

  test('verifica que há os links "About"  na tela', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/About/i));
    const pathname = history.location.pathname;
    expect(pathname).toBe('/about');
    const aboutAll = getByText(/About Pokédex/);
    expect(aboutAll).toBeInTheDocument();
  });
  
  test('verifica que há os links "Favorite pokémons"  na tela', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/Favorite pokémons/i));
    const pathname = history.location.pathname;
    expect(pathname).toBe('/favorites');
    const favoritetAll = getByText(/Favorite pokémons/);
    expect(favoritetAll).toBeInTheDocument();
  });
  
  test('verifica a não existencia da pagina "Xablau" = true ', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/Xablau');
    const noMatch = getByText(/Page requested not found/i)
    expect(noMatch).toBeInTheDocument();
  })
});
