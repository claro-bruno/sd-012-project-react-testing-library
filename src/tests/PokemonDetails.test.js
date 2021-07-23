import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

const pokemon = pokemons[3];
describe('Teste o componente <PokemonDetails.js />', () => {
  it('Teste se as informações detalhadas do Pokémon selecionado são mostradas na tela',
    () => {
      const { history } = renderWithRouter(<App />);
      const { name, id, summary } = pokemon;
      userEvent.click(screen.getByRole('button', { name: /Poison/i }));
      userEvent.click(screen.getByRole('link', { name: /More details/i }));
      const { pathname } = history.location;
      expect(pathname).toBe(`/pokemons/${id}`);
      expect(screen.getByText(`${name} Details`)).toBeInTheDocument();
      expect(screen.queryByRole('link', { name: /more details/i }))
        .not.toBeInTheDocument();
      expect(screen.getByRole('heading', { name: /summary/i })).toBeInTheDocument();
      expect(screen
        .getByText(
          /It can freely detach its jaw to swallow large prey whole./i,
        ))
        .toHaveTextContent(summary);
    });
  it('Teste se existe na página uma seção com os mapas contendo as localizações [...]',
    () => {
      const { history } = renderWithRouter(<App />);
      const { name, foundAt, id } = pokemon;
      history.push(`/pokemons/${id}`);
      expect(history.location.pathname).toBe(`/pokemons/${id}`);
      expect(screen.getByText(`Game Locations of ${name}`)).toBeInTheDocument();
      const image = screen.queryByRole('img', { name: `${name} location` });
      expect(image.src).toBe(`${foundAt[0].map}`);
      expect(screen.getByText(`${foundAt[0].location}`)).toBeInTheDocument();
    });
  it('Teste se o usuário pode favoritar um pokémon através da página de detalhes.',
    () => {
      const { history } = renderWithRouter(<App />);
      const { id, name } = pokemon;
      history.push(`/pokemons/${id}`);
      const isFavorite = screen.getByLabelText(/pokémon favoritado/i);
      expect(isFavorite).toBeInTheDocument();
      expect(screen.queryByAltText(`${name} is marked as favorite`)).toBeNull();
      userEvent.click(isFavorite);
      expect(screen.queryByAltText(`${name} is marked as favorite`)).toBeInTheDocument();
    });
});
