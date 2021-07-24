import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testa Pokémon', () => {
  it('Testa render das info do Pokémon', () => {
    renderWithRouter(<App />);

    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    const IMG_URL = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    const img = screen.getByRole('img');

    expect(pokemonName).toHaveTextContent(/Pikachu/i);
    expect(pokemonType).toHaveTextContent('Electric');
    expect(pokemonWeight).toHaveTextContent(/Average weight: 6.0 kg/i);
    expect(img).toHaveAttribute('src', IMG_URL);
    expect(img).toHaveAttribute('alt', `${pokemonName.innerHTML} sprite`);
  });

  it('Testa link e rora para More Details', () => {
    const { history } = renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /More details/i });

    expect(moreDetails).toBeInTheDocument();

    userEvent.click(moreDetails);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  it('Testa se existe icone de estrela nos Pokémons favoritos', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /More details/i });

    userEvent.click(moreDetails);
    const favoritecheckbox = screen.getByLabelText('Pokémon favoritado?');
    expect(favoritecheckbox.type).toBe('checkbox');

    userEvent.click(favoritecheckbox);
    const favoriteStar = screen.getAllByRole('img');
    expect(favoriteStar[1]).toBeInTheDocument();
    expect(favoriteStar[1]).toHaveAttribute('src', '/star-icon.svg');
    expect(favoriteStar[1]).toHaveAttribute('alt', 'Pikachu is marked as favorite');
  });
});
