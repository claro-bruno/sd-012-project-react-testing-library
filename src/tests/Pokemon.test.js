import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

describe('Teste do component Pokemon.js', () => {
  it('Testa se é renderizado um card com as informações de determinado pokémon.', () => {
    renderWithRouter(<App />);

    userEvent.click(screen.getByRole('button', { name: 'Electric' }));

    const { name, type, averageWeight: { measurementUnit, value }, image } = pokemons[0];

    expect(screen.getByTestId('pokemon-name')).toHaveTextContent(name);
    expect(screen.getByTestId('pokemon-type')).toHaveTextContent(type);
    expect(screen.getByTestId('pokemon-weight')).toHaveTextContent(
      `Average weight: ${value} ${measurementUnit}`,
    );
    expect(screen.getByRole('img')).toHaveAttribute('alt', `${name} sprite`);
    expect(screen.getByRole('img')).toHaveAttribute('src', image);
  });

  it(
    'Testa link de navegação do Pokémon renderiza a página de detalhes de Pokémon.',
    () => {
      const { history } = renderWithRouter(<App />);
      const { id, type } = pokemons[0];

      const moreDetails = screen.getByText('More details');

      userEvent.click(screen.getByRole('button', { name: type }));

      expect(moreDetails).toBeInTheDocument();
      expect(moreDetails).toHaveAttribute('href', `/pokemons/${id}`);

      userEvent.click(moreDetails);
      expect(history.location.pathname).toBe('/pokemons/25');
    },
  );

  it('Testa se existe um ícone de estrelas nos Pokémons favoritos', () => {
    renderWithRouter(<App />);
    const details = screen.getByText(/More details/);
    userEvent.click(details);

    const favorite = screen.getByText(/Pokémon favoritado?/);
    userEvent.click(favorite);

    const jonas = screen.getAllByRole('img');
    expect(jonas[1].alt).toBe('Pikachu is marked as favorite');
    expect(jonas[1].src).toMatch('/star-icon.svg');
  });
});
