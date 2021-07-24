import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa o componente <Pokedex />', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });
  test('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    const headingh2 = screen.getByText('Encountered pokémons');
    expect(headingh2).toBeInTheDocument(/Encountered pokémons/i);
  });

  test('Testa se é exibido o próximo Pokémon da lista clicando no botão', () => {
    const buttonNext = screen.getByRole('button', {
      name: /Próximo pokémon/i,
    });
    expect(buttonNext).toBeInTheDocument();
  });

  test('Teste se a Pokédex tem os botões de filtro', () => {
    const nameBug = screen.getByRole('button', {
      name: 'Bug',
    });
    expect(nameBug).toBeInTheDocument();
    const nameFire = screen.getByRole('button', {
      name: 'Fire',
    });
    expect(nameFire).toBeInTheDocument();
  });

  test('Testa se botão Próximo Pokemon é desabilitado quando houver um pokémon', () => {
    const pokeType = screen.getAllByTestId('pokemon-type-button');
    expect(pokeType).toBeDefined();
  });
  test('Testa se a Pokédex tem um botão para resetar filtro', () => {
    const all = screen.getByRole('button', {
      name: 'All',
    });
    expect(all).toBeInTheDocument();
    fireEvent.click(all);
  });
});
