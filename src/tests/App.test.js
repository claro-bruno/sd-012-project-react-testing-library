import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../rota/renderWithRoute';
import App from '../App';

describe('Testa App.js', () => {
  it('Verifica links de navegacao', () => {
    const { history } = renderWithRouter(<App />);
    expect(history.location.pathname).toBe('/');

    const home = screen.getByText(/home/i);
    expect(home).toBeInTheDocument();
    userEvent.click(home);
    expect(history.location.pathname).toBe('/');

    const about = screen.getByText(/about/i);
    expect(about).toBeInTheDocument();
    userEvent.click(about);
    expect(history.location.pathname).toBe('/about');

    const favorite = screen.getByText(/favorite pokémons/i);
    expect(favorite).toBeInTheDocument();
    userEvent.click(favorite);
    expect(history.location.pathname).toBe('/favorites');

    history.push('/url/desconhecida');
    const notFound = screen.getByText(/Page requested not found/i);
    expect(notFound).toBeInTheDocument();
  });
});
