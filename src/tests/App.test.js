import React from 'react';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';


describe('Teste do componente App.js', () => {
  it('Testa se a página é redirecionada para Home', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByText(/Home/));
    const path = history.location.pathname;
    expect(path).toBe('/');
  });

  it('Testa se a página é redirecionada para About ', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByText(/About/));
    const path = history.location.pathname;
    expect(path).toBe('/about');
  });

  it('Testa se a página é redirecionada para Favorites ', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByText(/Favorite Pokémons/));
    const path = history.location.pathname;
    expect(path).toBe('/favorites');
  });

  it('Renderiza NotFound', () => {
    const { history } = renderWithRouter(<App />);
    const errorPage = 'jonas';
    history.push(errorPage);
    const error = screen.getByText(/Page requested not found/);
    expect(error).toBeInTheDocument();
  });
});

