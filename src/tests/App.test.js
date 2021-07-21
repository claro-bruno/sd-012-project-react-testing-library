import React from 'react';
import { getByAltText, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import renderWithRouter from '../helper/renderWithRouter';

describe('testa o component app', () => {
  it('renderiza o home', () => {
    renderWithRouter(<App />);
    const header = screen.getByText(/encountered pokémons/i);
    expect(header).toBeInTheDocument();
  });

  it('testa os links do home', () => {
    renderWithRouter(<App />);
    const home = screen.getByText(/home/i);
    const about = screen.getByText(/about/i);
    const favorite = screen.getByText(/favorite pokémons/i);
    expect(home).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(favorite).toBeInTheDocument();
  });

  it('testa se redireciona para home ao clicar no link', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByText(/home/i));
    expect(history.location.pathname).toBe('/');
  });

  it('testa se redireciona para about ao clicar no link', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByText(/about/i));
    expect(history.location.pathname).toBe('/about');
  });

  it('testa se redireciona para favorite pokemon ao clicar no link', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByText(/favorite pokémons/i));
    expect(history.location.pathname).toBe('/favorites');
  });

  it('testa se redireciona para not found ao clicar no link', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/path/random');
    const error = screen.getByText(/Page requested not found/i);
    expect(error).toBeInTheDocument();
  });
});
