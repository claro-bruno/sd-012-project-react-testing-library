import React from 'react';
import { fireEvent, screen, cleanup } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

beforeEach(() => renderWithRouter(<App />));
afterEach(cleanup);

describe('Testa se a aplicação possui os links de navegação', () => {
  test('Testa se o primeiro link tem o texto Home', () => {
    const home = screen.getByText(/Home/i);
    expect(home).toBeInTheDocument();
  });

  test('Testa se o primeiro link tem o texto About', () => {
    const about = screen.getByText(/About/i);
    expect(about).toBeInTheDocument();
  });

  test('Testa se o primeiro link tem o texto Favorite Pokémons', () => {
    const favorites = screen.getByText(/Favorite Pokémons/i);
    expect(favorites).toBeInTheDocument();
  });
});

describe('Testa o redirecionamento dos links', () => {
  test('Testa se a aplicação é redirecionada para a página inicial Home', () => {
    const { history } = renderWithRouter(<App />);
    const links = screen.getAllByRole('link', { name: 'Home' });
    fireEvent.click(links[0]);
    const pathName = history.location.pathname;
    expect(pathName).toBe('/');
  });

  test('Testa se a aplicação é redirecionada para a página About', () => {
    const { history } = renderWithRouter(<App />);
    const links = screen.getAllByRole('link', { name: 'About' });
    fireEvent.click(links[1]);
    const pathName = history.location.pathname;
    expect(pathName).toBe('/about');
  });

  test('Testa se a aplicação é redirecionada para a página Pokémons Favoritados', () => {
    const { history } = renderWithRouter(<App />);
    const links = screen.getAllByRole('link', { name: 'Favorite Pokémons' });
    fireEvent.click(links[1]);
    const pathName = history.location.pathname;
    expect(pathName).toBe('/favorites');
  });

  test('Teste se a aplicação é redirecionada para a página Not Found', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pagina/que-nao-existe/');
    const noMatch = screen.getByText('Page requested not found');
    expect(noMatch).toBeInTheDocument();
  });
});
