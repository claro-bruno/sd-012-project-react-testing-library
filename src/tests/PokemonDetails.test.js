import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import PokemonDetails from '../components/PokemonDetails';
import pokemons from '../data';
// import App from '../App';

const fakeMatch = { params: { id: '25' } };
const favorites = {
  4: false,
  10: true,
  23: false,
  25: true,
  65: false,
  78: false,
  143: false,
  148: false,
  151: false,
};
const fakeFn = () => favorites;

describe('Requisito 7 - Testando o componente <PokemonDetails.js />', () => {
  beforeEach(() => renderWithRouter(<PokemonDetails
    isPokemonFavoriteById={ favorites }
    match={ fakeMatch }
    pokemons={ pokemons }
    onUpdateFavoritePokemons={ fakeFn }
  />));

  it('1. Teste se as informações detalhadas do Pokémon selecionado são mostradas na tela',
    () => {
      const headings = screen.getAllByRole('heading', {
        level: 2,
      });
      expect(headings[0]).toHaveTextContent('Pikachu Details');
      expect(headings[1]).toHaveTextContent(/summary/i);

      const summary = screen.getByRole('heading', { level: 2, name: 'Summary' });
      const paragraphs = screen.getByText(pokemons[0].summary);

      expect(summary).toBeInTheDocument();
      expect(summary.textContent).toBe('Summary');
      expect(paragraphs).toBeInTheDocument();
    });

  it('2. Teste se existe uma seção com os mapas contendo as localizações do pokémon',
    () => {
      const headingH2 = screen
        .getByRole('heading', { level: 2, name: 'Game Locations of Pikachu' });
      expect(headingH2).toBeInTheDocument();

      const imgs = screen.getAllByRole('img');
      // // a imgs é uma array então vou pegar só uma posição dela e checar o alt. A posição 2 é por conta da chave foundAt.
      const src = imgs[2].getAttribute('src');
      const alt = imgs[2].getAttribute('alt');
      expect(src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
      expect(alt).toBe('Pikachu location');
    });

  it('3. Teste se o usuário pode favoritar um pokémon através da página de detalhes.',
    () => {
      // testando a checkbox favoritar
      const label = screen.getByLabelText('Pokémon favoritado?');
      expect(label).toBeInTheDocument();
    });
});
