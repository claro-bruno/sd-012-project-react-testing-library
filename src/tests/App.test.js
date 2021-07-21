import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testando componente App', () => {
  it('Renderiza um header com texto "Pokédex"', () => {
    render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );
    expect(screen.getByText(/Pokédex/i)).toBeInTheDocument();
  });

  it('Renderiza links com textos específicos', () => {
    renderWithRouter(<App />);
    const links = screen.getAllByRole('link');
    expect(links[0]).toHaveTextContent(/home/i);
    expect(links[1]).toHaveTextContent(/about/i);
    expect(links[2]).toHaveTextContent(/favorite pokémons/i);
  });

  it('Testa comportamento ao clicar no link de home', () => {
    const { history } = renderWithRouter(<App />);

    fireEvent.click(screen.getByText(/home/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('Testa comportamento ao clicar no link de about', () => {
    const { history } = renderWithRouter(<App />);

    fireEvent.click(screen.getByText(/about/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('Testa comportamento ao clicar no link de favorites', () => {
    const { history } = renderWithRouter(<App />);

    fireEvent.click(screen.getByText(/favorite pokémons/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it('Testa se renderiza NotFound caso utilize URL desconhecida', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/notfound');

    expect(screen.getByText(/not found/i)).toBeInTheDocument();
  });
});
