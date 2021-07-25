import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import Data from '../data';

describe('Verifica requisitos do desafio 6', () => {
  it('Verifica se a página exibe os detalhes do Pokemon', () => {
    renderWithRouter(<App />);

    const type = screen.getByRole('button', {
      name: /Poison/i,
    });
    userEvent.click(type);

    // Vai para a secao details do Pokemon
    const details = screen.getByRole('link', {
      name: /More details/i,
    });
    userEvent.click(details);

    // Adiciona o Pokemon como favorito
    const check = screen.getByLabelText('Pokémon favoritado?');
    userEvent.click(check);

    // Vai para a pagina de Pokemons favoritos
    const favPokemons = screen.getByRole('link', {
      name: /Favorite Pokémons/i,
    });
    userEvent.click(favPokemons);

    // Vai para a pagina de detalhes do pokemon
    const pokemonDetails = screen.getByRole('link', {
      name: /More details/i,
    });
    userEvent.click(pokemonDetails);

    // Pega atributos da pagina para testar
    const heading = screen.getByRole('heading', {
      name: /Ekans Details/i,
      level: 2,
    });

    const summary = screen.getByRole('heading', {
      name: /Summary/i,
      level: 2,
    });

    const allText = Data[3].summary;
    const resume = screen.getByText(allText);

    expect(heading).toBeInTheDocument();
    expect(summary).toBeInTheDocument();
    expect(pokemonDetails).not.toBeInTheDocument();
    expect(resume).toBeInTheDocument();
  });

  it('Verifica se a página exibe o mapa do Pokemon', () => {
    renderWithRouter(<App />);
    // Vai para a secao details do Pokemon
    const details = screen.getByRole('link', {
      name: /Favorite Pokémons/i,
    });
    userEvent.click(details);

    const pokemonDetails = screen.getByRole('link', {
      name: /More details/i,
    });
    userEvent.click(pokemonDetails);

    // captura de atributos

    const heading = screen.getByRole('heading', {
      name: /Game Locations of Ekans/i,
      level: 2,
    });

    const viridianKanto = screen.getByText('Goldenrod Game Corner');
    const ekansLocation = screen.getByAltText('Ekans location');

    expect(heading).toBeInTheDocument();
    expect(viridianKanto).toBeInTheDocument();
    expect(ekansLocation).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/e/ec/Johto_Goldenrod_City_Map.png');
    expect(ekansLocation).toHaveAttribute('alt', 'Ekans location');
  });

  it('Verifica label da checkbox', () => {

  });
});
