import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import pokemons from '../data';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const pokemon = pokemons[0];
const moreDetails = 'More details';

describe('Teste o componente <PokemonDetails.js />', () => {
  it(`Teste se as informações detalhadas do Pokémon selecionado
  são mostradas na tela.`, () => {
    renderWithRouter(<App />);
    fireEvent.click(screen.getByText(moreDetails));

    expect(screen.getByText('Pikachu Details')).toBeDefined();
    expect(screen.queryByText(moreDetails)).toBeNull();
    expect(screen.getByText('Summary')).toBeDefined();
    expect(screen.getByText(pokemon.summary)).toBeDefined();
  });

  it(`Teste se existe na página uma seção com os mapas
  contendo as localizações do pokémon`, () => {
    renderWithRouter(<App />);
    fireEvent.click(screen.getByText(moreDetails));

    expect(screen.getByText('Game Locations of Pikachu')).toBeDefined();

    const imgs = screen.getAllByAltText('Pikachu location');

    expect(imgs[0].src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(imgs[1].src).toBe('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });

  it(`Teste se o usuário pode favoritar
  um pokémon através da página de detalhes.`, () => {
    renderWithRouter(<App />);
    fireEvent.click(screen.getByText(moreDetails));
    const altMsg = 'Pikachu is marked as favorite';
    const labelMsg = 'Pokémon favoritado?';

    expect(screen.queryByAltText(altMsg)).toBeNull();
    fireEvent.click(screen.getByRole('checkbox'));
    expect(screen.queryByAltText(altMsg)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('checkbox'));
    expect(screen.queryByAltText(altMsg)).toBeNull();

    expect(screen.queryByLabelText(labelMsg)).toBeInTheDocument();
  });
});
