import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './RenderWithRouter';
import { Pokemon } from '../components';
import data from '../data';

describe('Testa o componente "Pokemon"', () => {
  // const path = '/pokemons/25';
  // afterEach(() => jest.clearAllMocks());
  const pikachu = data[0];

  it('Testa se é renderizado um card com informações do pokémon', () => {
    renderWithRouter(<Pokemon pokemon={ pikachu } />);
    expect(screen.getByText('Electric'));
    expect(screen.getByText('Pikachu'));
    expect(screen.getByText('Average weight: 6.0 kg'));
    const imagem = screen.getByRole('img', { name: 'Pikachu sprite' });
    expect(imagem).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  it('Testa se clicar em detalhes redireciona para a página de detalhes', () => {
    const { history } = renderWithRouter(<Pokemon pokemon={ pikachu } />);
    userEvent.click(screen.getByText(/more details/i));
    expect(history.location.pathname).toBe('/pokemons/25');
  });

  it('Testa se existe o símbolo de estrela nos pokémons marcados como favorito', () => {
    renderWithRouter(<Pokemon pokemon={ pikachu } isFavorite />);
    const image = screen.getByRole('img', { name: /Pikachu is marked as favorite/i });
    expect(image).toHaveAttribute('src', '/star-icon.svg');
  });
});
