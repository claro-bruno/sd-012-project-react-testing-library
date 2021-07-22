import React from 'react';
// import { MemoryRouter } from 'react-router-dom'; //
import { fireEvent, screen, render } from '@testing-library/react';
import App from '../App';

// https://stackoverflow.com/questions/61482418/react-testing-library-screen-vs-render-queries //

describe('Teste de componente <App.js />', () => {
  it('Se o topo do ao contém um conjunto fixo de links de navegação', () => {
    render(<App />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Favorite Pokémons')).toBeInTheDocument();
  });

  it('Se o app é redirecionado à pág "/", ao clicar no link "Home".', () => {
    const { history } = renderWithRouter(<App />);
    fireEvent.click(screen.getByText(/home/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('Se o app é redirecionado à pág "/about", ao clicar no link "About".', () => {
    const { history } = renderWithRouter(<App />);
    fireEvent.click(screen.getByText(/about/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('Se é redirecionado à pág "/favorites" clicando no link "Favorite Pokémons"', () => {
    const { history } = renderWithRouter(<App />);
    fireEvent.click(screen.getByText(/favorite pokémons/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it('Se o app é redirecionado à pág "/Not Found" entrando em URLs desconhecidas', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/unknown');
    expect(screen.getByText('Page requested not found')).toBeInTheDocument();
  });
});
