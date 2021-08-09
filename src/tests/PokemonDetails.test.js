import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import pokemons from '../data';
import renderWithRouter from '../renderWithRouter';

describe('Testa todo o componente Pokemon', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
    const details = screen.getByText('More details');
    userEvent.click(details);
  });
  it('Teste se as informações detalhadas do Pokémon são mostradas', () => {
    expect(screen.getByRole('heading', { name: 'Pikachu Details' })).toBeInTheDocument();
    expect(screen.getByTestId('pokemon-name')).toBeInTheDocument();
    expect(screen.getByTestId('pokemon-name')).toHaveTextContent('Pikachu');
    expect(screen.getByRole('heading', { name: 'Summary' })).toBeInTheDocument();
    expect(screen.getByText(pokemons[0].summary)).toBeInTheDocument();
  });
  it('Teste se existe na página uma seção com os mapas', () => {
    expect(screen.getByRole('heading', { name: 'Game Locations of Pikachu' }))
      .toBeInTheDocument();
    const locationsImg = screen.getAllByRole('img', { name: 'Pikachu location' });
    expect(locationsImg.length).toBe(2);
    expect(screen.getByText(pokemons[0].foundAt[0].location)).toBeInTheDocument();
    expect(screen.getByText(pokemons[0].foundAt[1].location)).toBeInTheDocument();
    expect(locationsImg[0]).toHaveAttribute('src', pokemons[0].foundAt[0].map);
    expect(locationsImg[1]).toHaveAttribute('src', pokemons[0].foundAt[1].map);
  });
  it('', () => {
    expect(screen.getByLabelText('Pokémon favoritado?')).toBeInTheDocument();
    const falseCheckbox = screen.getByRole('checkbox', { checked: false });
    expect(falseCheckbox).toBeInTheDocument();
    userEvent.click(falseCheckbox);
    const trueCheckbox = screen.getByRole('checkbox', { checked: true });
    expect(trueCheckbox).toBeInTheDocument();
  });
});
