import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testando o componente App.js', () => {
  test('Testa o texto contido no conjunto de links no topo da página', () => {
    renderWithRouter(<App />);
    const links = screen.getAllByRole('link');
    expect(links[0]).toHaveTextContent('Home');
    expect(links[1]).toHaveTextContent('About');
    expect(links[2]).toHaveTextContent('Favorite Pokémon');
  });

  test('Testa se ao clickar no link "Home" aplicação vai para página inicial', () => {
    const { history } = renderWithRouter(<App />);
    const { pathname } = history.location;
    const homeNav = screen.getByRole('link', { name: 'Home' });

    userEvent.click(homeNav);
    expect(pathname).toBe('/');
  });
});
