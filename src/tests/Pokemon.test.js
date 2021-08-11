import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('6. Teste o componente <Pokemon.js />', () => {
  it('este se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<App />);

    const srcImage = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    const imgTest = screen.getByRole('img');
    const type = screen.getByTestId('pokemon-type');

    expect(screen.getByText('Pikachu')).toBeInTheDocument();
    expect(type).toHaveTextContent('Electric');
    expect(screen.getByText('Average weight: 6.0 kg')).toBeInTheDocument();
    expect(imgTest).toHaveAttribute('src', srcImage);

    const imagePokemon = screen.getByRole('img', { name: 'Pikachu sprite' });
    expect(imagePokemon).toBeInTheDocument();
  });
  it('Pokédex contém um link de navegação', () => {
    const { history } = renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: 'More details' });
    userEvent.click(moreDetails);
    const pathName = history.location.pathname;
    expect(pathName).toBe('/pokemons/25');
  });
  it('se existe um ícone de estrela nos Pokémons favoritados', () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: 'More details' });
    userEvent.click(moreDetails);
    const pokemonFavorited = screen.getByLabelText(/Pokémon favoritado?/i);
    userEvent.click(pokemonFavorited);
    const starIcon = screen.getByRole('img', { name: /Pikachu is marked as favorite/i });
    expect(starIcon.src).toBe('http://localhost/star-icon.svg');
  });
});
