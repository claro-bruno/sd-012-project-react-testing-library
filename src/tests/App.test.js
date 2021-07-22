import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import App from '../App';

describe('Teste de componente <App.js />', () => {
  it('Se o topo do ao contém um conjunto fixo de links de navegação', () => {
    const { getByText } = renderWithRouter(<App />);
    expect(getByText('Home')).toBeInTheDocument();
    expect(getByText('About')).toBeInTheDocument();
    expect(getByText('Favorite Pokémons')).toBeInTheDocument();
  });

  it('Se o app é redirecionado à pág "/", ao clicar no link "Home".', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/home/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('Se o app é redirecionado à pág "/about", ao clicar no link "About".', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/about/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('Se é redirecionado à pág "/favorites" clicando no link "Favorite Pokémons"', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/favorite pokémons/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it('Se o app é redirecionado à pág "/Not Found" entrando em URLs desconhecidas', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/unknown');
    expect(getByText('Page requested not found')).toBeInTheDocument();
  });
});
