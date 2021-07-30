import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Requisito 1 - Testando o componente <App.js />', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  it('Testa se há um <Link /> com o texto "Home"', () => {
    const linkHome = screen.getByText('Home');
    expect(linkHome).toBeInTheDocument();
  });

  it('Testa se há um <Link /> com o texto "About"', () => {
    const linkAbout = screen.getByText('About');
    expect(linkAbout).toBeInTheDocument();
  });

  it('Testa se há um <Link /> com o texto "Favorite Pokémons"', () => {
    const linkFavoritePokemons = screen.getByText('Favorite Pokémons');
    expect(linkFavoritePokemons).toBeInTheDocument();
  });
});
