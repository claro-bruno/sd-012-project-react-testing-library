import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../../renderWithRouter';
import App from '../App';

describe('Requisito 1', () => {
  it('1.1.1 - O primeiro link deve possuir o texto Home', () => {
    renderWithRouter(<App />);
    const links = screen.getAllByRole('link');
    expect(links[0]).toHaveTextContent('Home');
  });
  it('1.1.2 - O segundo link deve possuir o texto About', () => {
    renderWithRouter(<App />);
    const links = screen.getAllByRole('link');
    expect(links[1]).toHaveTextContent('About');
  });
  it('1.1.3 - O primeiro link deve possuir o texto Favorite Pokémons', () => {
    renderWithRouter(<App />);
    const links = screen.getAllByRole('link');
    expect(links[2]).toHaveTextContent('Favorite Pokémons');
  });
  it('1.2 - O primeiro link deve levar para Home', () => {
    renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: 'Home' });
    const title = screen.getByText(/Encountered pokémons/i);
    fireEvent.click(link);
    expect(title).toBeInTheDocument();
  });
  it('1.3 - O primeiro link deve levar para About', () => {
    renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: 'About' });
    const title = screen.getByText(/About/i);
    fireEvent.click(link);
    expect(title).toBeInTheDocument();
  });
  it('1.4 - O primeiro link deve levar para Favorites', () => {
    renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: 'Favorite Pokémons' });
    const title = screen.getByText(/Favorite pokémons/i);
    fireEvent.click(link);
    expect(title).toBeInTheDocument();
  });
  it('1.5 - Verifica página Erro 404', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/xablau');
    const notFound = screen.getByText(/page requested not found/i);
    expect(notFound).toBeInTheDocument();
  });
});
