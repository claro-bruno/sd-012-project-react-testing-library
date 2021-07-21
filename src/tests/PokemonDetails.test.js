import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import App from '../App';
import data from '../data';
import renderWithRouter from '../renderWithRouter';

describe('Testando componente PokemonDetails', () => {
  const pokeMock = data[0];

  const { name, summary, foundAt } = pokeMock;
  it('Testa se a página de detalhes renderiza com as informações corretas', () => {
    renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', { name: /more details/i });
    fireEvent.click(detailsLink);

    expect(screen.getByText(`${name} Details`)).toBeInTheDocument();
    expect(detailsLink).not.toBeInTheDocument();
    expect(screen.getByText(/summary/i)).toBeInTheDocument();
    expect(screen.getByText(summary)).toBeInTheDocument();
  });

  it('Testa se página de detalhes renderiza mapas de locations', () => {
    renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', { name: /more details/i });
    fireEvent.click(detailsLink);

    const locationsHeading = screen.getByText(`Game Locations of ${name}`);
    expect(locationsHeading).toBeInTheDocument();

    expect(screen.getByText(`${name} Details`)).toBeInTheDocument();

    const maps = screen.getAllByAltText(`${name} location`);
    expect(maps).toHaveLength(foundAt.length);
    foundAt.forEach(({ location }) => {
      expect(screen.getByText(location)).toBeInTheDocument();
    });

    maps.forEach((map, i) => {
      expect(maps[i].src).toBe(foundAt[i].map);
    });
  });

  it('testa se é possível favoritar da página de detalhes', () => {
    renderWithRouter(<App />);

    const linkDetail = screen.getByRole('link', { name: /More details/ });
    fireEvent.click(linkDetail);

    const checkbox = screen.getByRole('checkbox', { name: /Pokémon favoritado?/ });
    fireEvent.click(checkbox);

    const favIcon = screen.getByAltText(`${name} is marked as favorite`);
    expect(favIcon).toBeInTheDocument();

    fireEvent.click(checkbox);
    expect(favIcon).not.toBeInTheDocument();
  });
});
