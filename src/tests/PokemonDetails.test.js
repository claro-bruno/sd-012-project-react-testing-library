import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Requisito 7 - Testando o componente <PokemonDetails />', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  it('Testa se as informações detalhadas do Pokémon selecionado são exibidas', () => {
    const takeDetails = screen.getByText(/more details/i);
    userEvent.click(takeDetails);

    const pikachuDetails = screen.getByText(/pikachu details/i);
    const link = screen.queryByText(/more details/i);
    const takeHeading = screen.getByRole('heading', { name: /summary/i });
    const takeSummary = screen
      .getByText('This intelligent Pokémon roasts hard berries '
        + 'with electricity to make them tender enough to eat.');
    expect(pikachuDetails).toBeInTheDocument();
    expect(link).not.toBeInTheDocument();
    expect(takeHeading).toBeInTheDocument();
    expect(takeSummary).toBeInTheDocument();
  });

  it('Testa se existe na página uma seção com os mapas e as localizações', () => {
    const takeDetails = screen.getByText(/more details/i);
    userEvent.click(takeDetails);

    const takeLocation = screen
      .getByRole('heading', { name: /game locations of Pikachu/i });
    const takeImgLocation = screen.getAllByAltText('Pikachu location');
    const src1 = 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png';
    expect(takeLocation).toBeInTheDocument();
    expect(takeImgLocation[0]).toBeInTheDocument();
    expect(takeImgLocation[0].src).toBe(src1);
  });

  it('Testa se há um campo para favoritar o Pokémon', () => {
    const takeDetails = screen.getByText(/more details/i);
    userEvent.click(takeDetails);

    const takeBylabel = screen.getByLabelText('Pokémon favoritado?');
    expect(takeBylabel).toBeInTheDocument();
  });
});
