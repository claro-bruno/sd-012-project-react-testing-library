import React from 'react';
import { render, screen } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Requisito 3 - Tenstando o componente <FavoritePokemons />', () => {
  beforeEach(() => {
    render(<FavoritePokemons />);
  });

  // Consultei o repositório de Andre Hammel para conclusão deste requisito na linha 14.
  // Link: https://github.com/tryber/sd-012-project-react-testing-library/pull/159/commits/97e0f1e5a052c60dae6352fc94d483b1be3736cc

  it('Testa quando não há Pokémons favoritados', () => {
    const noFavoritePkm = screen.getByText('No favorite pokemon found');
    expect(noFavoritePkm).toBeDefined();
  });
});
