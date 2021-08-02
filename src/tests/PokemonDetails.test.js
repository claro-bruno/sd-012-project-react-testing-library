import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

describe('Testa a pagina Pokemon Details', () => {
  beforeEach(() => {
    const { history } = renderWithRouter(<App />);
    const link = screen.getByText(/More Details/i);
    userEvent.click(link);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/pokemons/25');
  });
  it('Testa se os elementos estao renderizados', () => {
    const pikachuName = screen.getByText('Pikachu Details');
    const heading = screen.getByRole('heading', { level: 2, name: 'Summary' });
    const pikachuInfo = screen.getByText(pokemons[0].summary);
    expect(pikachuName).toBeInTheDocument();
    expect(heading).toBeInTheDocument();
    expect(heading.textContent).toBe('Summary');
    expect(pikachuInfo).toBeInTheDocument();
  });
  it('Testa se os mapas com as localizacoes foi renderizado', () => {
    const pikachuLocation = screen
      .getByRole('heading', { level: 2, name: 'Game Locations of Pikachu' });
    expect(pikachuLocation).toBeInTheDocument();
    const locationImg = screen.getAllByAltText(/Pikachu location/i);
    locationImg.forEach((location) => {
      expect(location).toBeInTheDocument();
    });
    expect(locationImg[0].src).toBe(pokemons[0].foundAt[0].map);
    expect(locationImg[1].src).toBe(pokemons[0].foundAt[1].map);
  });
  it('Testa se renderiza uma checkbox', () => {
    const checkBoxLabel = screen.getByLabelText('Pokémon favoritado?');
    expect(checkBoxLabel).toBeInTheDocument();
  });
});
