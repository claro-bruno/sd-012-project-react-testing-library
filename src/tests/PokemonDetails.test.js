import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente <PokemonDetails.js />', () => {
  it('Teste se as informações do Pokémon selecionado são mostradas na tela', () => {
    renderWithRouter(<App />);
    const detailsBtn = screen.getByText(/More Details/i);
    fireEvent.click(detailsBtn);
    const pikachuInfo = screen.getByText('Pikachu Details');
    const h2Details = screen.getByText('Summary');
    const pokemonInfo = screen
      .getByText(/Pokémon roasts hard berries with electricity to/i);
    expect(detailsBtn).not.toBeInTheDocument();
    expect(pikachuInfo).toBeInTheDocument();
    expect(h2Details).toBeInTheDocument();
    expect(pokemonInfo).toBeInTheDocument();
  });

  it('Teste se existe uma seção com os mapas contendo as localizações do pokémon', () => {
    renderWithRouter(<App />);

    const moreDets = screen.getByText(/more details/i);
    fireEvent.click(moreDets);

    const h2Pok = screen.getByText(/Game Locations of Pikachu/i);
    const pikachuLoc = screen.getAllByAltText(/Pikachu location/i);

    expect(h2Pok).toBeInTheDocument();

    pikachuLoc.forEach((imageAltPikachu) => {
      expect(imageAltPikachu).toBeInTheDocument();
      expect(imageAltPikachu).toHaveAttribute('src');
      expect(imageAltPikachu.src.length).toBeGreaterThan(0);
    });
  });
  it('Teste se o usuário pode favoritar um pokémon através da página de detalhes', () => {
    renderWithRouter(<App />);

    const maisDetails = screen.getByText(/more details/i);
    expect(maisDetails).toBeInTheDocument();
    fireEvent.click(maisDetails);
    const favoriteArea = screen.getByLabelText(/favoritado\?/i);
    fireEvent.click(favoriteArea);
    const altFavoriteArea = screen.getByAltText(/favorite$/i);
    expect(altFavoriteArea).toBeInTheDocument();
    fireEvent.click(favoriteArea);
    expect(altFavoriteArea).not.toBeInTheDocument();
  });
});
