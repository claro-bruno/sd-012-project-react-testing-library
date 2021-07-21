import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import App from '../App';
// import renderWithRouter from '../renderWithRouter';

describe('Testa o componente App.js', () => {
  test('Testa se renderiza um reading com o texto "Pokédex"', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = screen.getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  test('Deve renderizar links Nav no topo da página', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const homeLink = screen.getByText(/Home/i);
    const aboutLink = screen.getByText(/About/i);
    const favoritePokemonLink = screen.getByText(/Favorite Pokémons/i);

    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(favoritePokemonLink).toBeInTheDocument();
  });
});
