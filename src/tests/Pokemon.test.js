import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('testa componente pokemon.js', () => {
  it('testa card', () => {
    renderWithRouter(<App />);
    const name = screen.getByTestId('pokemon-name');
    const type = screen.getByTestId('pokemon-type');
    const weigth = screen.getByTestId('pokemon-weight');
    const img = screen.getByAltText('Pikachu sprite');
    expect(name).toBeInTheDocument();
    expect(type).toBeInTheDocument();
    expect(weigth).toBeInTheDocument();
    expect(weigth).toHaveTextContent('Average weight: 6.0 kg');
    expect(img).toBeInTheDocument();
    expect(img.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });
  it('testa link', () => {
    const { history } = renderWithRouter(<App />);
    const link = screen.getByText('More details');
    expect(link).toBeInTheDocument();
    userEvent.click(link);
    const path = history.location.pathname;
    expect(path).toBe('/pokemons/25');
  });
  it('testa favoritos', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/25');
    const favorito = screen.getByLabelText('Pokémon favoritado?');
    expect(favorito).toBeInTheDocument();
    userEvent.click(favorite);
    const estrela = screen.getByAltText('Pikachu is marked as favorite');
    expect(estrela).toBeInTheDocument();
    expect(estrela.src).toBe('http://localhost/star-icon.svg');
  });
});
