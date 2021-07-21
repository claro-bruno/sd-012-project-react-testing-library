import React from 'react';
import { screen } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../renderWithRouter';

describe('Testa componente <FavoritePokemons.js />', () => {
  it('No favorite pokemon found se não tiver nenhum favorito.', () => {
    // Lógica retirada em: https://medium.com/@drake_beth/how-to-test-images-in-react-a70053b1634a
    renderWithRouter(<FavoritePokemons pokemons={ [] } />);
    expect(screen.getByText('No favorite pokemon found')).toBeInTheDocument();
  });
});
