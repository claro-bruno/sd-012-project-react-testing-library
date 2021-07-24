import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('Testa página Pokemon Details', () => {
  it('Testa as coisa tudo', () => {
    const { history } = renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: 'More details' });
    fireEvent.click(link);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');

    const name = screen.getByText('Pikachu Details');
    expect(name).toBeInTheDocument();

    expect(link).not.toBeInTheDocument();

    const header = screen.getByRole('heading', { name: /summary/i });
    expect(header).toBeInTheDocument();

    const paragraph = screen.getByText(
      /This intelligent Pokémon /i,
    );
    expect(paragraph).toBeInTheDocument();

    const header2 = screen.getByRole('heading', { name: /game locations of pikachu/i });
    expect(header2).toBeInTheDocument();

    const LOCATION1 = 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png';
    const LOCATION2 = 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png';
    const locations = screen.getAllByRole('img', { name: /pikachu location/i });
    expect(locations.length).toBe(2);
    expect(locations[0]).toHaveAttribute('src', LOCATION1);
    expect(locations[1]).toHaveAttribute('src', LOCATION2);

    const locationsText = screen.getAllByText(/Kanto/i);
    expect(locationsText.length).toBe(2);
    expect(locationsText[0]).toBeInTheDocument();
    expect(locationsText[1]).toBeInTheDocument();

    const favBox = screen.getByLabelText('Pokémon favoritado?');
    expect(favBox).toBeInTheDocument();
    fireEvent.click(favBox);
    expect(favBox).toBeChecked();
  });
});
