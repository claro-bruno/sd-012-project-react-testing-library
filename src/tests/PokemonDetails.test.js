import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helper/renderWithRouter';
import App from '../App';

describe('`PokemonDetails.js` tests', () => {
  it('tests from the `more details` link', () => {
    renderWithRouter(<App />);
    const details = screen.getByRole('link', { name: 'More details' });
    userEvent.click(details);
    const title = screen.getAllByRole('heading', { level: 2 });
    expect(title[0]).toHaveTextContent('Pikachu Details');
    expect(title[1]).toHaveTextContent('Summary');
    expect(details).not.toBeInTheDocument();
    const paragraph = screen.getByText(/This intelligent Pokémon roasts hard berries/i);
    expect(paragraph).toBeInTheDocument();
    expect(title[2]).toHaveTextContent('Game Locations of Pikachu');
    const images = screen.getAllByRole('img');
    expect(images.length).toBe(images.length);
    const imgSrc = 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png';
    const imgAlt = 'Pikachu location';
    expect(images[1]).toHaveAttribute('src', imgSrc);
    expect(images[1]).toHaveAttribute('alt', imgAlt);
    const check = screen.getByRole('checkbox');
    userEvent.click(check);
    screen.getByLabelText('Pokémon favoritado?');
  });
});
