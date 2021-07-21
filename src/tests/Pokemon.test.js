import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste componente <Pokemon />', () => {
  const pokemon = {
    id: 25,
    name: 'Pikachu',
    type: 'Electric',
    averageWeight: {
      value: '6.0',
      measurementUnit: 'kg',
    },
    image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
  };

  it('Teste se é renderizado um card com as informações', () => {
    renderWithRouter(<App />);
    const { value, measurementUnit } = pokemon.averageWeight;

    const name = screen.getByTestId('pokemon-name');
    expect(name).toBeInTheDocument();
    expect(name).toHaveTextContent(`${pokemon.name}`);

    const type = screen.getByTestId('pokemon-type');
    expect(type).toBeInTheDocument();
    expect(type).toHaveTextContent(`${pokemon.type}`);

    const weigth = screen.getByTestId('pokemon-weight');
    expect(weigth).toBeInTheDocument();
    expect(weigth).toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);

    const img = screen.getByAltText(`${pokemon.name} sprite`);
    expect(img.src).toBe(pokemon.image);
  });

  it('Contém um link para more details e ao clicar no link redireciona', () => {
    const { history } = renderWithRouter(<App />);

    const link = screen.getByText('More details');
    expect(link).toBeInTheDocument();
    userEvent.click(link);

    const pathName = history.location.pathname;
    expect(pathName).toBe(`/pokemons/${pokemon.id}`);
  });

  it('Testa favoritar', () => {
    renderWithRouter(<App />);

    const linkMd = screen.getByRole('link', { name: 'More details' });
    expect(linkMd).toBeInTheDocument();
    userEvent.click(linkMd);

    const favorite = screen.getByLabelText('Pokémon favoritado?');
    expect(favorite).toBeInTheDocument();
    userEvent.click(favorite);

    const estrela = screen.getByAltText(`${pokemon.name} is marked as favorite`);
    expect(estrela).toBeInTheDocument();
    expect(estrela.src).toBe('http://localhost/star-icon.svg');
  });
});
