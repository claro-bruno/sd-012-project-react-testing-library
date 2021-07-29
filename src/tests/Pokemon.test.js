import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testa Pokémon Card', () => {
  it('Informações do Card', () => {
    renderWithRouter(<App />);
    const pokeName = screen.getByText('Pikachu');
    const pokeType = screen.getByTestId('pokemon-type');
    const allType = screen.getAllByText('Electric');
    const notType = screen.getByRole('button', { name: 'Electric' });
    const rightType = allType.filter((element) => element !== notType);
    const averageWeight = screen.getByText('Average weight: ', { exact: false });
    const pokeWeight = screen.getByText('6.0', { exact: false });
    const weightUnit = screen.getByText('kg', { exact: false });
    const pokeImage = screen.getByAltText('Pikachu sprite');

    expect(pokeName).toBeInTheDocument();
    expect(pokeType).toBeInTheDocument();
    expect(rightType[0]).toBeInTheDocument();
    expect(averageWeight).toBeInTheDocument();
    expect(pokeWeight).toBeInTheDocument();
    expect(weightUnit).toBeInTheDocument();
    expect(pokeImage).toBeInTheDocument();
    expect(pokeImage).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  it('Opção de ver detalhes', () => {
    const { history } = renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: 'More details' });

    expect(moreDetails).toBeInTheDocument();

    fireEvent.click(moreDetails);

    const { pathname } = history.location;

    expect(pathname).toBe('/pokemons/25');
  });

  it('Se é favoritado', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: 'More details' });

    fireEvent.click(moreDetails);

    const pokeFavorite = screen.getByRole('checkbox');

    fireEvent.click(pokeFavorite);

    const home = screen.getByRole(
      'link',
      { name: /home/i },
    );

    fireEvent.click(home);

    const star = screen.queryByAltText('Pikachu is marked as favorite');

    expect(star).toBeInTheDocument();
    expect(star).toHaveAttribute('src', '/star-icon.svg');
  });
});
