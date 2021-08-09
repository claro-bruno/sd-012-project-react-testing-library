import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testa todo o componente App', () => {
  it('Testa link Home da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);
    const home = screen.getByRole('link', { name: /Home/i });
    expect(home).toBeInTheDocument();
    userEvent.click(home);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
  it('Testa link About da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);
    const about = screen.getByRole('link', { name: /About/i });
    expect(about).toBeInTheDocument();
    userEvent.click(about);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });
  it('Testa link Favorite da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);
    const favorite = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(favorite).toBeInTheDocument();
    userEvent.click(favorite);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });
  it('Testa página com url desconhecida', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/notFound');
    const unknown = screen.queryByText(/not found/i);
    expect(unknown).toBeInTheDocument();
  });
});
