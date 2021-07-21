import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';

describe('Testes para o componente About', () => {
  beforeEach(() => {
    renderWithRouter(<About />);
  });
  it('Testa se a pagina possui um heading com texto definido', () => {
    const heading = screen.getByRole('heading', { name: /About Pokédex/i });
    expect(heading).toBeInTheDocument();
  });

  it('Testa se a pagina contem uma imagem da Pokedex', () => {
    const URL = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const image = screen.getByAltText(/Pokédex/i);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', URL);
  });

  it('Testa se a pagina contem dois paragrafos com texto sobre a pokedex', () => {
    const text1 = 'This application simulates a Pokédex,'
    + ' a digital encyclopedia containing all Pokémons';
    const text2 = 'One can filter Pokémons by type,'
    + ' and see more details for each one of them';
    const p1 = screen.getByText(text1);
    const p2 = screen.getByText(text2);
    expect(p1).toBeInTheDocument();
    expect(p2).toBeInTheDocument();
  });
});
