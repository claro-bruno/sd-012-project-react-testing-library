import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderRouter from './renderRouter';
import App from '../App';

describe('Teste dos componentes do <Pokemon.js/>', () => {
  it('Teste se é renderizado um card com as infos de x pokemon', () => {
    const { getByRole, getByText, getByTestId } = renderRouter(<App />);
    const button = getByRole('button', { name: /Fire/i });
    fireEvent.click(button);
    const pokemon = getByText('Charmander');
    const info = getByText('Average weight: 8.5 kg');
    const image = getByRole('img');
    const type = getByTestId('pokemon-type');

    expect(pokemon).toBeInTheDocument();
    expect(info).toBeInTheDocument();
    expect(image.src).toContain('https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png');
    expect(image.alt).toContain('Charmander sprite');
    expect(type.innerHTML).toBe('Fire');
  });
  it('Teste de o Pokemon contém um Link de navegação', () => {
    const { getByRole, history } = renderRouter(<App />);
    const button = getByRole('button', { name: /Fire/i });
    fireEvent.click(button);
    const link = getByRole('link', { name: /More details/i });
    expect(link).toBeInTheDocument();
    fireEvent.click(link);
    const URL = '/pokemons/4';
    expect(history.location.pathname).toBe(URL);
  });
  it('Teste se existe um ícone de estrela nos pokes favoritados', () => {
    const { getByRole, getAllByRole } = renderRouter(<App />);
    const button = getByRole('button', { name: /Fire/i });
    fireEvent.click(button);

    const link = getByRole('link', { name: /More details/i });
    fireEvent.click(link);

    const favorites = getByRole('checkbox');
    fireEvent.click(favorites);

    const image = getAllByRole('img');
    expect(image[1].src).toContain('star-icon.svg');
    expect(image[1].alt).toContain('Charmander is marked as favorite');
  });
});
