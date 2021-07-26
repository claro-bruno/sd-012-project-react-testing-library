import React from 'react';
import { screen } from '@testing-library/react';
import fireEvent from '@testing-library/user-event';
import { Pokemon } from '../components';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';
import App from '../App';

describe('Teste se é renderizado card com as informações de determinado pokémon', () => {
  it('Testa renderização de card', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite={ false } />);

    const name = screen.getByText(/Pikachu/i);
    expect(name).toBeInTheDocument();

    const type = screen.getByText(/Electric/i);
    expect(type).toBeInTheDocument();

    const weight = screen.getByText(/Average weight: 6.0 kg/i);
    expect(weight).toBeInTheDocument();

    const img = screen.getByAltText(/pikachu sprite/i);
    expect(img).toBeInTheDocument();
    expect(img.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  it('Teste se o card do Pokémon indicado na Pokédex contém um link de navegação', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite={ false } />);
    const link = screen.getByRole('link', { name: 'More details' });
    expect(link).toBeInTheDocument();
    expect(link.href).toContain('/pokemons/25');
  });

  it('Teste se ao clicar, é feito o redirecionamento', () => {
    const { history } = renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: 'More details' });
    // console.log(link);
    fireEvent.click(link);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/pokemons/25');
  });

  it('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite />);

    const icon = screen.getByAltText(/pikachu is marked as favorite/i);
    expect(icon.src).toContain('/star-icon.svg');
  });
});
