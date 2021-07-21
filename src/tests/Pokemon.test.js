import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import data from '../data';

describe('Testando componente Pokémon', () => {
  const pokeMock = data[0];
  const { id, name, type, averageWeight, image } = pokeMock;
  const { value, measurementUnit } = averageWeight;

  it('Testa se renderiza informações corretas de um Pokémon', () => {
    renderWithRouter(<App />);
    expect(screen.getByTestId('pokemon-name')).toHaveTextContent(name);
    expect(screen.getByTestId('pokemon-type')).toHaveTextContent(type);
    expect(screen.getByTestId('pokemon-weight'))
      .toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);
    expect(screen.getByAltText(`${name} sprite`).src).toBe(image);
  });

  it('Testa se o card contém um link para detalhes correto', () => {
    const { history } = renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', { name: /more details/i });
    expect(detailsLink).toBeInTheDocument();

    fireEvent.click(detailsLink);
    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${id}`);
  });

  it('Testa se o card tem o ícone de favorito em um Pokémon favoritado', async () => {
    renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', { name: /more details/i });
    expect(detailsLink).toBeInTheDocument();
    fireEvent.click(detailsLink);

    const favoriteCheck = screen.getByRole('checkbox');
    expect(favoriteCheck).toBeInTheDocument();
    fireEvent.click(favoriteCheck);

    let img = screen.getByAltText(`${name} is marked as favorite`);
    expect(img).toBeInTheDocument();
    expect(img.src).toContain('/star-icon.svg');

    const homeLink = screen.getByRole('link', { name: /home/i });
    expect(homeLink).toBeInTheDocument();
    fireEvent.click(homeLink);

    img = screen.getByAltText(`${name} is marked as favorite`);
    expect(img).toBeInTheDocument();
    expect(img.src).toContain('/star-icon.svg');
  });
});
