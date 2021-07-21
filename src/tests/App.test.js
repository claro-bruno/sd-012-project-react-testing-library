import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../RenderWithRouter';

describe('Testa se contém os links de navegação', () => {
  it('Testa se o primeiro link possui texto Home', () => {
    renderWithRouter(<App />);
    const linkHome = screen.getByRole('link', { name: /home/i });
    expect(linkHome).toBeInTheDocument();
  });

  it('Testa se o segundo link possui texto About', () => {
    renderWithRouter(<App />);
    const linkAbout = screen.getByRole('link', { name: /about/i });
    expect(linkAbout).toBeInTheDocument();
  });

  it('Testa se o terceiro link possui texto Favorite Pokémons', () => {
    renderWithRouter(<App />);
    const linkFavorite = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(linkFavorite).toBeInTheDocument();
  });
});

// describe('Testa se ao clicar em Home é direcionado para a página certa', () => {
//   const { history, getByRole } = renderWithRouter(<App />);
//   let { pathname } = history.location;
//   const linkHome = getByRole('link', { name: /home/i });
//   userEvent.click(linkHome);
//   expect(pathname).toBe('/');
// });

// describe('Testa se ao clicar em About é direcionado para página certa', () => {
//   const { history, getByRole } = renderWithRouter(<App />);
//   const linkAbout = getByRole('link', { name: /about/i });
//   let { pathname } = history.location;
//   userEvent.click(linkAbout);
//   expect(pathname).toBe('/about');
// });
