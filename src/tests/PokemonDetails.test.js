import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './RenderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testando o componente "PokemonDetails"', () => {
  const { name, summary, foundAt } = pokemons[0];
  it('Testa se as informações detalhadas do Pokémon selecionado são exibidas', () => {
    renderWithRouter(<App />);
    const details = screen.getByRole('link', { name: /More details/i });
    userEvent.click(details);
    expect(details).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: `${name} Details` })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /summary/i })).toBeInTheDocument();
    expect(screen.getByText(summary)).toBeInTheDocument();
  });

  it('Testa se existe uma seção com as localizações do pokémon', () => {
    renderWithRouter(<App />);
    const locations = ['Kanto Viridian Forest', 'Kanto Power Plant'];
    const details = screen.getByRole('link', { name: /more details/i });
    userEvent.click(details);
    expect(
      screen.getByRole('heading', { name: `Game Locations of ${name}` }),
    ).toBeInTheDocument();

    foundAt.forEach((local, index) => {
      const imagens = screen.getAllByRole('img', { name: `${name} location` });
      expect(imagens[index]).toHaveAttribute('src', local.map);
    });

    locations.forEach((item, index) => {
      expect(screen.getByText(item)).toBeDefined();
      const imagens = screen.getAllByRole('img', { name: `${name} location` });
      expect(imagens[index]).toHaveAttribute('src', foundAt[index].map);
    });
  });

  it('Testa se o usuário pode favoritar um pokemon através da página de detalhes', () => {
    renderWithRouter(<App />);
    const details = screen.getByRole('link', { name: /More details/i });
    userEvent.click(details);
    const check = screen.getByLabelText(/Pokémon favoritado?/i);
    expect(check).toBeInTheDocument();

    userEvent.click(check);
    const marked = screen.getByAltText(/is marked as favorite/i);
    expect(marked).toBeInTheDocument();

    userEvent.click(check);
    expect(marked).not.toBeInTheDocument();
  });
});
