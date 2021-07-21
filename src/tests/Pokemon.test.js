import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

const link = 'More details';
describe('Testa o componente <Pokemon />', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  it('Testa se o card possui nome correto do pokemon', () => {
    const pokeDetails = screen.getByText(link);
    userEvent.click(pokeDetails);
    const pikachu = screen.getByText('Pikachu');
    expect(pikachu).toBeDefined();
  });

  it('Testa se o card possui tipo correto do pokemon', () => {
    const pokeDetails = screen.getByText(link);
    userEvent.click(pokeDetails);
    const pokeType = screen.getByText('Electric');
    expect(pokeType).toBeDefined();
  });

  it('Testa se o card possui peso correto do pokemon', () => {
    const pokeDetails = screen.getByText(link);
    userEvent.click(pokeDetails);
    const pokeWeight = screen.getByText('Average weight: 6.0 kg');
    expect(pokeWeight).toBeDefined();
  });

  it('Testa se o card possui a imagem correta do pokemon', () => {
    const pokeDetails = screen.getByText(link);
    userEvent.click(pokeDetails);
    const pokeImg = screen.getByAltText('Pikachu sprite');
    expect(pokeImg).toHaveAttribute('src',
      'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });
});

describe('Testes sobre as rotas', () => {
  it('Verifica se a url contém as informações corretas', () => {
    const { history } = renderWithRouter(<App />);
    const pokeDetails = screen.getByText(link);
    userEvent.click(pokeDetails);

    expect(history.location.pathname).toBe('/pokemons/25');
  });
});

describe('Testes sobre favoritos', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });
  it('Testa se pokemon quando favoritado possui estrela exibida', () => {
    const pokeDetails = screen.getByText(link);
    userEvent.click(pokeDetails);

    const checkboxFav = screen.getByLabelText('Pokémon favoritado?');
    userEvent.click(checkboxFav);
    const favStar = screen.getByAltText('Pikachu is marked as favorite');

    expect(favStar.src).toBe('http://localhost/star-icon.svg');
  });
});
