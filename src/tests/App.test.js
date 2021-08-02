import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Requisito 1 - Testando o componente <App.js />', () => {
  it('Links de navegação que redirecionam para a Home, About e Favorite Pokemóns.',
    () => {
      renderWithRouter(<App />);
      const links = screen.getAllByRole('link');

      expect(links[0].innerHTML).toBe('Home');
      expect(links[1].innerHTML).toBe('About');
      expect(links[2].innerHTML).toBe('Favorite Pokémons');
    });

  it('Teste se a aplicação é redirecionada para Home', () => {
    const { history } = renderWithRouter(<App />);
    const home = screen.getByRole('link', { name: 'Home' });
    userEvent.click(home);
    const { pathname } = history.location;

    expect(pathname).toBe('/');
  });

  it('Teste se a aplicação é redirecionada para About ', () => {
    const { history } = renderWithRouter(<App />);
    const home = screen.getByRole('link', { name: 'About' });
    userEvent.click(home);
    const { pathname } = history.location;

    expect(pathname).toBe('/about');
  });

  it('Teste se a aplicação é redirecionada para Favorite Pokémons', () => {
    const { history } = renderWithRouter(<App />);
    const home = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(home);
    const { pathname } = history.location;

    expect(pathname).toBe('/favorites');
  });

  it('Quando é digitado um ULR desconhecido direcionar á página de erro', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/teste');
    const notFound = screen.getByText('Page requested not found');

    expect(notFound).toBeInTheDocument();
  });
});
