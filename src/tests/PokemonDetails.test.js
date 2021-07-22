import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RenderWithRouter from './helpers/RenderWithRouter';

import App from '../App';
import data from '../data';

describe('Testa o componente PokemonDetails', () => {
  beforeEach(() => {
    RenderWithRouter(<App />);

    userEvent.click(screen.getByRole('link', { name: /More details/i }));
  });

  test('Verifica se as informações do pokemon é renderizada', () => {
    const { name, summary } = data[0];
    const title = screen.getByRole('heading', { name: `${name} Details` });
    expect(title).toBeInTheDocument();

    const moreDetailsLink = screen.queryByRole('link', { name: /More details/i });
    expect(moreDetailsLink).not.toBeInTheDocument();

    const heading = screen.getByRole('heading', { name: 'Summary' });
    expect(heading).toBeInTheDocument();
    expect(heading.localName).toBe('h2');

    const paragraph = screen.getByText(summary);
    expect(paragraph).toBeInTheDocument();
    expect(paragraph.localName).toBe('p');
  });

  it('Verifica se renderiza o mapa', () => {
    const { name, foundAt } = data[0];
    const locations = screen.getByRole('heading', { name: `Game Locations of ${name}` });
    expect(locations.localName).toBe('h2');

    const imageMap = screen.getAllByAltText(`${name} location`);

    foundAt.forEach((current, index) => {
      const { location, map } = current;
      expect(screen.getByText(location)).toBeInTheDocument();
      expect(imageMap[index]).toHaveAttribute('src', map);
    });
  });

  it('Verifica se é possível favoritar na tela de detalhes', () => {
    const { name } = data[0];
    const checkbox = screen.getByLabelText(/Pokémon favoritado?/i);
    expect(checkbox).toBeInTheDocument();

    userEvent.click(checkbox);
    const altText = `${name} is marked as favorite`;
    const starImage = screen.getByAltText(altText);
    expect(starImage).toBeInTheDocument();

    userEvent.click(checkbox);
    expect(starImage).not.toBeInTheDocument();
  });
});
