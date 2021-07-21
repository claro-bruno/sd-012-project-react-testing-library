import React from 'react';
// import { MemoryRouter } from 'react-router-dom';
import { screen, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste do componente App', () => {
  // test('renders a reading with the text `Pokédex`', () => {
  //   render(
  //     <MemoryRouter>
  //       <App />
  //     </MemoryRouter>,
  //   );
  //   const heading = screen.getByText(/Pokédex/i);
  //   expect(heading).toBeInTheDocument();
  // });

  // test('shows the Pokédex when the route is `/`', () => {
  //   render(
  //     <MemoryRouter initialEntries={ ['/'] }>
  //       <App />
  //     </MemoryRouter>,
  //   );
  //   expect(screen.getByText('Encountered pokémons')).toBeInTheDocument();
  // });

  test('O link About, direciona para a página /about', () => {
    const { history } = renderWithRouter(<App />);
    fireEvent.click(screen.getByText(/About/i));
    const { location: { pathname } } = history;
    expect(pathname).toBe('/about');
  });

  test('O link Favorite Pokemons, direciona para a página /favorites', () => {
    const { history } = renderWithRouter(<App />);
    fireEvent.click(screen.getByText(/Favorite Pokémons/i));
    const { location: { pathname } } = history;
    expect(pathname).toBe('/favorites');
  });

  test('O link Home, direciona para a página a home (/)', () => {
    const { history } = renderWithRouter(<App />);
    fireEvent.click(screen.getByText(/Home/i));
    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
  });
});
