import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';
import RenderWithRouter from '../renderWithRouter';

describe('. Teste o componente <FavoritePokemons.js />', () => {
  it('Teste mensagem caso não tenha pokemon favorito', () => {
    const { getByText } = render(<FavoritePokemons />);
    expect(getByText(/No favorite pokemon found/i)).toBeInTheDocument();
  });

  it('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    const { getByText, container, getAllByRole } = RenderWithRouter(<App />);

    const details = getByText(/More details/i);
    fireEvent.click(details);
    const favoriteCheckbox = getByText(/Pokémon favoritado?/i);
    fireEvent.click(favoriteCheckbox);
    const favoriteListLink = getByText(/Favorite Pokémons/i);
    fireEvent.click(favoriteListLink);

    const img = getAllByRole('img');
    expect(img.length).toBe(2);
    const pokemonsInfo = container.querySelectorAll('p');
    const expectLengthOfTagP = 3;
    expect(pokemonsInfo.length).toBe(expectLengthOfTagP);
    expect(getByText(/More details/i)).toBeInTheDocument();
  });
});
