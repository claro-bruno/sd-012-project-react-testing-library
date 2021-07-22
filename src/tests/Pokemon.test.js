import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente <Pokemon.js />', () => {
  it('Teste se é renderizado um card com as informações de determinado pokémon.', () => {
    renderWithRouter(<App />);

    fireEvent.click(screen.getByRole('button', { name: 'Electric' }));

    const pokemonIMG = screen.getByRole('img');

    expect(screen.getByText('Pikachu')).toBeInTheDocument();
    expect(screen.getByText('Average weight: 6.0 kg')).toBeInTheDocument();
    expect(pokemonIMG.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(pokemonIMG.alt).toBe('Pikachu sprite');
    expect(screen.getByTestId('pokemon-type')).toHaveTextContent('Electric');
  });
  it('Teste se o card do Pokémon contém um link para exibir detalhes dele', () => {
    const { history } = renderWithRouter(<App />);
    fireEvent.click(screen.getByRole('button', { name: 'Electric' }));
    const detailsOfPok = screen.getByRole('link', { name: 'More details' });
    expect(detailsOfPok).toBeInTheDocument();
    fireEvent.click(detailsOfPok);
    expect(history.location.pathname).toBe('/pokemons/25');
  });
  it('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
    renderWithRouter(<App />);

    const typeOfPoks = screen.getByRole('button', { name: 'Poison' });
    expect(typeOfPoks).toBeInTheDocument();
    fireEvent.click(typeOfPoks);

    const moreDetails = screen.getByRole('link', { name: 'More details' });
    expect(moreDetails).toBeInTheDocument();
    fireEvent.click(moreDetails);

    const favoriteCheck = screen.getByRole('checkbox');
    expect(favoriteCheck).toBeInTheDocument();
    fireEvent.click(favoriteCheck);

    const img = screen.getAllByRole('img');

    expect(img[1].src).toContain('star-icon.svg');
    expect(img[1].alt).toContain('Ekans is marked as favorite');
  });
});
