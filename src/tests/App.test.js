import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './RenderWithRouter';

describe('Testando o componente App', () => {
  // const links = ['Home', 'About', 'Favorite Pokémons'];
  // const titles = ['About Pokédex', 'Encountered pokémons', 'Favorite pokémons'];
  // const paths = ['/', '/favorites', '/About'];

  // beforeEach(() => {
  //   render(<App />);
  // });

  it('Testa se existe link "Home" ', () => {
    const { history } = renderWithRouter(<App />);
    const home = screen.getByRole('link', { name: /Home/i });
    expect(home).toBeDefined();

    userEvent.click(home);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('Testa se existe link "About" ', () => {
    const { history } = renderWithRouter(<App />);
    const about = screen.getByRole('link', { name: /About/i });
    expect(about).toBeDefined();

    userEvent.click(about);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('Testa se existe link "Favorite Pokemóns" ', () => {
    const { history } = renderWithRouter(<App />);
    const favorites = screen.getByRole('link', { name: /Favorite pokémons/i });
    expect(favorites).toBeDefined();

    userEvent.click(favorites);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it('Testa se app redireciona para "Not Found" ', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pagina/que-nao-existe/');
    const notFound = screen.getByText(/Page requested not found/i);
    expect(notFound).toBeDefined();
  });
});
