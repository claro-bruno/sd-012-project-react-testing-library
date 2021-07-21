import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithrouter';

describe('Verifica App.js', () => {
  it('Testa se é renderizado um card com as informações.  ', () => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByRole('link', { name: /More details/i }));

    expect(screen.getByTestId(/pokemon-name/i)
      .innerHTML).toBe('Pikachu');
    expect(screen.getByTestId(/pokemon-type/i)
      .innerHTML).toBe('Electric');
    expect(screen.getByTestId(/pokemon-weight/i)
      .innerHTML).toBe('Average weight: 6.0 kg');

    const imagem = screen.getByRole('img', { name: /Pikachu sprite/i });
    expect(imagem).toBeInTheDocument();
    expect(imagem.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  it('Testa se existe o botão "More details".', () => {
    renderWithRouter(<App />);
    const likeDetails = screen.getByRole('link', { name: /More details/i });
    expect(likeDetails).toBeInTheDocument();
  });

  it('Testa se ao clicar no link é feito o redirecionamento.', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByRole('link', { name: /More details/i }));
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  it('Testa se existe um ícone de estrela nos Pokémons favoritados.', () => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByRole('link', { name: /More details/i }));
    userEvent.click(screen.getByRole('checkbox'));

    const imageFav = screen.getByRole('img', { name: /Pikachu is marked as favorite/i });
    expect(imageFav).toBeInTheDocument();
    expect(imageFav.src).toBe('http://localhost/star-icon.svg');
  });
});
