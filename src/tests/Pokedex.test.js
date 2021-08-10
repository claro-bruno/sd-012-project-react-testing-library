import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Testa o componente Pokedex', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  it('Testa se a página renderiza um h2 com o texto', () => {
    const headingPokedex = screen.getByRole('heading',
      { level: 2, name: 'Encountered pokémons' });
    expect(headingPokedex).toBeInTheDocument();
  });

  it('Testa se o botão para ir para o próximo pokemon contém o texto', () => {
    const nextPokemonBtn = screen.getByRole('button', { name: 'Próximo pokémon' });
    expect(nextPokemonBtn).toBeInTheDocument();
  });
});
