import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

describe('Testa o componente Pokemon', () => {
  it('Testa se o card renderizado contém o nome do Pokémon', () => {
    renderWithRouter(<App />);
    const name = screen.getByTestId('pokemon-name');
    expect(name).toBeInTheDocument();
  });

  it('Testa se o card renderizado contém o tipo do Pokémon', () => {
    renderWithRouter(<App />);
    const type = screen.getByTestId('pokemon-type');
    expect(type).toBeInTheDocument();
  });

  it('Testa se o card possui o peso do Pokémon', () => {
    renderWithRouter(<App />);
    const weight = screen.getByTestId('pokemon-weight');
    expect(weight).toHaveTextContent('Average weight: 6.0 kg');
  });

  it('Testa se o card mostra a imagem do pokémon corretamente', () => {
    renderWithRouter(<App />);
    const image = screen.getByAltText('Pikachu sprite');
    expect(image.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  it('Testa o link para mais detalhes', () => {
    const { history } = renderWithRouter(<App />);
    const moreDetailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetailsLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
    const favoriteCheckbox = screen.getByRole('checkbox', { checked: false });
    userEvent.click(favoriteCheckbox);
    const favoriteStar = screen.getByAltText('Pikachu is marked as favorite');
    expect(favoriteStar.src).toBe('http://localhost/star-icon.svg');
  });
});
