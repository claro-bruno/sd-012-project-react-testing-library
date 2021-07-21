import React from 'react';
import { screen } from '@testing-library/react';

import App from '../App';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

describe('Testa o componente NotFound', () => {
  const mockedPokemon = pokemons[0];

  test('Teste se as informações detalhadas do Pokémon selecionado são mostradas na tela',
    () => {
      const { history } = renderWithRouter(<App />);
      history.push(`/pokemons/${mockedPokemon.id}`);

      const detailsTitle = screen.getByText(`${mockedPokemon.name} Details`);
      const linkToDetail = screen.queryByRole('link', { name: 'More details' });
      const summaryTitle = screen.queryByRole('heading', { name: 'Summary', level: 2 });
      const summary = screen.getByText(mockedPokemon.summary);

      expect(detailsTitle).toBeInTheDocument();
      expect(linkToDetail).not.toBeInTheDocument();
      expect(summaryTitle).toBeInTheDocument();
      expect(summary).toBeInTheDocument();
    });
});
