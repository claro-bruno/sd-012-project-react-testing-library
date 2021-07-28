import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './Helper/RendeWithRouter';

describe('Testa componente App', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });
  test('Verifica se renderiza os links de navegação', () => {
    const linkHome = screen.getByRole('link', { name: 'Home' });
    const linkAbout = screen.getByRole('link', { name: 'About' });
    const linkFavPoke = screen.getByRole('link', { name: 'Favorite Pokémons' });

    const links = [linkHome, linkAbout, linkFavPoke];

    links.forEach((link) => {
      expect(link).toBeInTheDocument();
    });
  });
});
