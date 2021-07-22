import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('testa se o componente pokemon', () => {

  it('renderiza card com informações do pokemon', () => {
    renderWithRouter(<App />);
    const pokeName = screen.getByTestId('pokemon-name');
    const pokeType = screen.getByTestId('pokemon-type');
    const pokeWeigth = screen.getByTestId('pokemon-weight');
    const pokeSprite = screen.getByAltText('Pikachu sprite');
    expect(pokeName).toHaveTextContent('Pikachu');
    expect(pokeType).toHaveTextContent('Electric');
    expect(pokeWeigth).toHaveTextContent('Average weight: 6.0 kg');
    expect(pokeSprite).toBeInTheDocument();
    expect(pokeSprite).not.toHaveAttribute('src', '');
  });

  it('possui um link no card para more details', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByText('More details');
    expect(moreDetails).toHaveAttribute('href', '/pokemons/25');
  });

  it('ao clicar em more details é feito redirecionamento', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByText(/more details/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  it('possui um icone de estrela nos pokemons favoritos', () => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByText(/More details/));
    userEvent.click(screen.getByRole('checkbox'));
    expect(screen.getByAltText('Pikachu is marked as favorite')).toHaveProperty('src', 'http://localhost/star-icon.svg');
  });
});
