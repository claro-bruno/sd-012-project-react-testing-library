import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

const charmander = pokemons[1];
const locationText = `Game Locations of ${charmander.name}`;
const foundImg = charmander.foundAt[0].map;
const locationAlt = `${charmander.name} location`;

describe('Testa o componente <PokemonDetails />', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });
  it('Testa se as informações detalhadas do pokémon são exibidas', () => {
    const nextBtn = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(nextBtn);
    const detailsBtn = screen.getByRole('link', { name: /more details/i });
    userEvent.click(detailsBtn);
    expect(screen.getByRole('heading', { name: /charmander details/i }))
      .toBeInTheDocument();
    expect(detailsBtn).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /summary/i })).toBeInTheDocument();
    expect(screen.getByText(charmander.summary)).toBeInTheDocument();
  });

  it('Testa se existe na página mapa com as localizações', () => {
    const nextBtn = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(nextBtn);
    const detailsBtn = screen.getByRole('link', { name: /more details/i });
    userEvent.click(detailsBtn);
    expect(screen.getByRole('heading', { name: locationText })).toBeInTheDocument();

    const charmanderImgs = screen.getAllByAltText('Charmander location');
    expect(charmanderImgs).toHaveLength(charmander.foundAt.length);
    expect(charmanderImgs[0]).toHaveAttribute('src', foundImg);
    expect(charmanderImgs[0]).toHaveAttribute('alt', locationAlt);
  });

  it('Testa se é possível favoritar o pokémon', () => {
    const nextBtn = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(nextBtn);
    const detailsBtn = screen.getByRole('link', { name: /more details/i });
    userEvent.click(detailsBtn);

    const favCheckbox = screen.getByLabelText('Pokémon favoritado?');

    expect(favCheckbox).toBeInTheDocument();
    userEvent.click(favCheckbox);

    const favIcon = screen.getByAltText('Charmander is marked as favorite');

    expect(favIcon).toBeInTheDocument();

    userEvent.click(favCheckbox);
    expect(favIcon).not.toBeInTheDocument();
  });
});
