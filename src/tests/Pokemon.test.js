import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testa o componente <Pokemon />', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  it('Testa se o card possui nome correto do pokemon', () => {
    const pokeDetails = screen.getByText('More details');
    userEvent.click(pokeDetails);
    const pikachu = screen.getByText('Pikachu');
    expect(pikachu).toBeDefined();
  });

  it('Testa se o card possui tipo correto do pokemon', () => {
    const pokeType = screen.getAllByText(/electric/i)[0];
    expect(pokeType).toBeInTheDocument();
  });

  it('Testa se o card possui peso correto do pokemon', () => {
    const pokeWeight = screen.getByText(/average weight: 6.0 kg/i);
    expect(pokeWeight).toBeInTheDocument();
  });

  it('Testa se o card possui a imagem correta do pokemon', () => {
    const pokeImg = screen.getAllByRole('img')[0];
    expect(pokeImg).toHaveAttribute('src',
      'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(pokeImg).toBeInTheDocument();
  });
});

describe('Testes sobre as rotas', () => {
  it('Verifica se a url contém as informações corretas', () => {
    const { history } = renderWithRouter(<App />);
    const pokeDetails = screen.getAllByText(/more details/i)[0];
    userEvent.click(pokeDetails);

    const { pathname } = history.location;
    const pikachuUrl = '/pokemons/25';
    expect(pathname).toBe(pikachuUrl);
  });

  it('Testa se pokemon quando favoritado possui estrela exibida', () => {
    renderWithRouter(<App />);
    const pokeDetails = screen.getAllByText(/more details/i)[0];
    userEvent.click(pokeDetails);

    const checkboxFav = screen.getByLabelText(/pokémon favoritado?/i);
    userEvent.click(checkboxFav);
    const favStar = screen.getByAltText(/pikachu is marked as favorite/i);

    expect(favStar.src).toBe('http://localhost/star-icon.svg');
    expect(favStar).toBeInTheDocument();
  });
});
