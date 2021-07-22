import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('6. Teste o componente <Pokemon.js />', () => {
  it('Teste se é renderizado um card com as informações de determinado pokémon.', () => {
    renderWithRouter(<App />);
    const pokemonType = screen.getByTestId('pokemon-type').innerHTML;
    fireEvent.click(screen.getByRole('link', { name: /More Details/i }));
    fireEvent.click(screen.getByRole('checkbox'));

    const pokemonName = screen.getByTestId('pokemon-name').innerHTML;
    const sprite = screen.getAllByRole('img')[0];
    expect(sprite.src).toMatch(/bulbagarden/);
    expect(sprite.alt).toBe(`${pokemonName} sprite`);

    const detailsType = screen.getByText(`${pokemonType}`);
    expect(detailsType).toBeInTheDocument();

    const pokemonWeight = screen.getByTestId('pokemon-weight').innerHTML;
    expect(pokemonWeight).toMatch(/Average/);
    expect(pokemonWeight).toMatch(/./);
    expect(pokemonWeight).toMatch(/kg/);
  });
  it('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    renderWithRouter(<App />);
    fireEvent.click(screen.getByRole('button', { name: /Fire/i }));
    fireEvent.click(screen.getByRole('link', { name: /More Details/i }));
    fireEvent.click(screen.getByRole('checkbox'));

    const pokemonName = screen.getByTestId('pokemon-name').innerHTML;
    const starIcon = screen.getAllByRole('img')[1];
    expect(starIcon.src).toBe('http://localhost/star-icon.svg');
    expect(starIcon.alt).toBe(`${pokemonName} is marked as favorite`);
  });
});
