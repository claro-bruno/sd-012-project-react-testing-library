import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from '../RenderWithRouter';
import App from '../App';

const path = '/pokemons/25';

describe('Testa componente PokemonDetails', () => {
  it('Verifica se a página contém o nome do pokemon e more details está ausente', () => {
    const { history } = renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /more details/i });
    history.push(path);

    const title = screen.getByRole('heading', { name: /Pikachu Details/i });
    expect(title).toBeDefined();
    expect(moreDetails).not.toBeInTheDocument();
  });
  it('Verifica se existe um h2 com texo Summary e parágrafo com resumo', () => {
    const { history } = renderWithRouter(<App />);
    history.push(path);

    const summary = screen.getByRole('heading', { name: /summary/i });
    expect(summary).toBeDefined();

    const paragraph = screen.getByText(/this intelligent Pokémon roasts/i);
    expect(paragraph).toBeDefined();
  });
});
describe('Verifica seção de mapas do componente PokemonDetails', () => {
  it('Verifica se existe um h2 com texto Game Locations of <name>', () => {
    const { history } = renderWithRouter(<App />);
    history.push(path);

    const title = screen.getByText(/Game Locations of pikachu/i);
    expect(title).toBeDefined();
  });
  it('Verifica se mostra as localizações dos pokemons', () => {
    const { history } = renderWithRouter(<App />);
    history.push(path);

    const image = screen.getAllByRole('img');
    expect(image[1].src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(image[1].alt).toBe('Pikachu location');
    expect(image[2].src).toBe('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    expect(image[2].alt).toBe('Pikachu location');
  });
});

describe('Testa área de favoritar no componente PokemonDetails', () => {
  it('Verifica se existe e testa o campo checkbox', () => {
    const { history } = renderWithRouter(<App />);
    history.push(path);

    const favorite = screen.getByRole('checkbox', { name: /Pokémon favoritado?/i });
    expect(favorite).toBeDefined();
    userEvent.click(favorite);

    const star = screen.getAllByRole('img');
    expect(star[1]).toBeInTheDocument();
    expect(star[1].src).toBe('http://localhost/star-icon.svg');

    userEvent.click(favorite);
    expect(star[1]).not.toBeInTheDocument();
  });
});
