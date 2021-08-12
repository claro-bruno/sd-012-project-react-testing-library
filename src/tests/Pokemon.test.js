import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Verificação do componente Pokemon.js', () => {
  it('Verificação do CARD completa ~ mostra o type, img, weight, e detalhes', () => {
    const { history } = renderWithRouter(<App />);

    const name = screen.getByTestId('pokemon-name');

    const weight = screen.getByTestId('pokemon-weight');

    const type = screen.getByTestId('pokemon-type');

    const extraDetails = screen.getByText('More details');

    const image = screen.getByRole('img');

    expect(name.innerHTML).toBe('Pikachu');
    expect(name).toBeInTheDocument();
    
    expect(weight.innerHTML).toBe('Average weight: 6.0 kg');
    expect(weight).toBeInTheDocument();

    expect(extraDetails.href).toBe('http://localhost/pokemons/25');
    expect(extraDetails).toBeDefined();
    
    expect(image.alt).toBe('Pikachu sprite');
    expect(image.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(image).toBeInTheDocument();
    
    expect(type.innerHTML).toBe('Electric');
    expect(type).toBeInTheDocument();

    userEvent.click(extraDetails);

    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');

    const favButton = screen.getByLabelText('Pokémon favoritado?');
    userEvent.click(favButton);

    const markedAsFavorite = screen.getByAltText('Pikachu is marked as favorite');
    expect(markedAsFavorite.src).toBe('http://localhost/star-icon.svg');
    expect(markedAsFavorite).toBeDefined();

  });
});
