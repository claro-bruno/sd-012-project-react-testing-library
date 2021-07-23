import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import data from '../data';
import App from '../App';

beforeEach(() => {
  const { history } = renderWithRouter(<App />);
  const linkDetails = screen.getByRole('link', { name: /More details/i });
  userEvent.click(linkDetails);
  expect(history.location.pathname).toBe('/pokemons/25');
});

describe('Testa informações detelhadas de um Pokemon selecionado', () => {
  test('Mostra na tela name e detalhes', () => {
    const heading = screen.getByRole('heading', { name: 'Pikachu Details' });
    expect(heading).toBeInTheDocument();
  });

  test('A seção detalhes contem um heading h2 com o texto Summary.', () => {
    expect(screen
      .getByRole('heading', { name: /summary/i }))
      .toBeInTheDocument();
  });

  test('A seção detalhes contem resumo do Pokemon specífico.', () => {
    expect(screen
      .getByText(/This intelligent Pokémon roasts/i))
      .toBeInTheDocument();
  });
});

describe('Testa informações de localização dos pokémons', () => {
  test('Existe um heading h2 com o texto Game Locations of Pikachu', () => {
    expect(screen
      .getByRole('heading', { level: 2, name: 'Game Locations of Pikachu' }))
      .toBeInTheDocument();
  });

  test('Mostra todas as localizações do pokémon com seus mapas, src e alt', () => {
    expect(screen
      .getByText(/Kanto Viridian Forest/i))
      .toBeInTheDocument();
    expect(screen
      .getByText(/Kanto Power Plant/i))
      .toBeInTheDocument();

    const imgByAlt = screen.getAllByAltText(/Pikachu location/i);
    imgByAlt.forEach((alt) => expect(alt).toBeInTheDocument());

    expect(imgByAlt[0].src).toBe(data[0].foundAt[0].map);
    expect(imgByAlt[1].src).toBe(data[0].foundAt[1].map);
  });

  test('Mostra que o usuário pode favoritar um pokémon na página de detalhes.', () => {
    /**
  * Para esta parte, consultei o PR do Eric Kreis em: * https://github.com/tryber/sd-012-project-react-testing-library/pull/48
  */
    const checkbox = screen.getByRole('checkbox', { name: 'Pokémon favoritado?' });
    expect(checkbox).not.toBeChecked();

    userEvent.click(checkbox);

    expect(checkbox).toBeChecked();

    userEvent.click(checkbox);

    expect(checkbox).not.toBeChecked();
  });
});
