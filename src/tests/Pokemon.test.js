import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe(' é renderizado um card com as informações de determinado pokémon.', () => {
  test('testa se o card tem todas as informaçoes solicitadas', () => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByText('More details'));
    expect(screen.getByTestId('pokemon-name')).toHaveTextContent(/pikachu/i);
    expect(screen.getByTestId('pokemon-type')).toHaveTextContent(/Electric/i);
    expect(screen.getByText(/Average weight/i))
      .toHaveTextContent('Average weight: 6.0 kg');
    const link = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    const img = screen.getByAltText(/Pikachu sprite/i);
    expect(img.src).toBe(link);
  });

  test('testando rotas de acordo com o requisito ', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByText('More details'));
    const { pathname } = history.location;
    expect(pathname).toEqual('/pokemons/25');
    userEvent.click(screen.getByText(/Pokémon favoritado/i));
    const link = 'http://localhost/star-icon.svg';
    const img = screen.getByAltText(/Pikachu is marked as favorite/i);
    expect(img.src).toBe(link);
  });
});
