import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import renderWithRouter from './helper/renderWithRouter';

describe('Verificar se todos os links redirecionam as páginas correspondentes', () => {
  it('Testa os links de navegação Home, About e Favorite pokémons', () => {
    const { history } = renderWithRouter(<App />);
    const [home, about, favorite] = screen.getAllByRole('link', {
      name: /^(Home|About|Favorite Pokémons)$/,
    });

    expect(favorite).toHaveTextContent('Favorite');
    userEvent.click(favorite);
    expect(history.location).toHaveProperty('pathname', '/favorites');
    expect(
      screen.getByRole('heading', { name: 'Favorite pokémons', level: 2 }),
    ).toBeDefined();

    expect(about).toHaveTextContent('About');
    userEvent.click(about);
    expect(history.location).toHaveProperty('pathname', '/about');
    expect(
      screen.getByRole('heading', { name: 'About Pokédex', level: 2 }),
    ).toBeDefined();

    expect(home).toHaveTextContent('Home');
    userEvent.click(home);
    expect(history.location).toHaveProperty('pathname', '/');
    expect(
      screen.getByRole('heading', { name: 'Encountered pokémons', level: 2 }),
    ).toBeDefined();

    history.push('/notExists');
    expect(screen.getByText('Page requested not found')).toBeDefined();
  });
});
