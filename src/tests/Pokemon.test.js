import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import data from '../data';
import App from '../App';

describe('Renderização de um card com as informações de determinado pokémon', () => {
  beforeEach(() => renderWithRouter(<App />));

  test('O nome correto do Pokémon deve ser mostrado na tela', () => {
    data.forEach(({ name }) => {
      const pokemonName = screen.getByTestId('pokemon-name');
      const buttonNext = screen.getByRole('button', { name: /próximo pokémon/i });
      expect(pokemonName).toBeInTheDocument();
      expect(screen
        .getByText(name))
        .toBeInTheDocument();
      userEvent.click(buttonNext);
    });
  });

  // Feito com a ajuda de Daniel.
  test('O tipo correto do Pokémon deve ser mostrado na tela', () => {
    const buttonNext = screen.getByRole('button', { name: /fire/i });
    userEvent.click(buttonNext);
    const type = screen.getAllByTestId(/pokemon-type/i); // trás o array de type
    expect(type[0]).toHaveTextContent(/fire/i); // o primeiro item do array tem o type igual a fire.
  });

  test('O peso médio e unidade de medida do Pokémon deve ser mostrado na tela', () => {
    const buttonNext = screen.getByRole('button', { name: /próximo pokémon/i });
    const textAverage = screen.getByText(/Average weight:/i);
    const pokemonWeight = screen.getByTestId('pokemon-weight');

    data.forEach(({ averageWeight: { value, measurementUnit } }) => {
      expect(textAverage).toBeInTheDocument();
      expect(pokemonWeight).toHaveTextContent(value);
      expect(pokemonWeight).toHaveTextContent(measurementUnit);
      userEvent.click(buttonNext);
    });
  });

  test('A imagem do Pokémon (com src e alt correspondente) é mostrada na tela', () => {
    const buttonNext = screen.getByRole('button', { name: /próximo pokémon/i });
    data.forEach(({ image, name }) => {
      const alt = screen.getByAltText(`${name} sprite`);
      expect(alt.src).toBe(image);
      userEvent.click(buttonNext);
    });
  });
});

describe('Testes no Card do Pokémon', () => {
  test('Contém o link de navegação More details, redireciona para url do pokemon', () => {
    const { history } = renderWithRouter(<App />);
    const linkDetails = screen.getByRole('link', { name: /More details/i });
    expect(linkDetails).toBeInTheDocument();
    userEvent.click(linkDetails);
    expect(history.location.pathname).toBe('/pokemons/25');
  });
});

describe('Testa se existe um ícone de estrela nos Pokémons favoritados.', () => {
  test('O ícone posui atributo src contendo o caminho /star-icon.svg', () => {
    const { history } = renderWithRouter(<App />);
    const linkDetails = screen.getByRole('link', { name: /More details/i });
    expect(linkDetails).toBeInTheDocument();
    userEvent.click(linkDetails);
    expect(history.location.pathname).toBe('/pokemons/25');

    const checkbox = screen.getByRole('checkbox', { name: /Pokémon favoritado?/i });
    userEvent.click(checkbox);

    const alt = screen.getByAltText(/Pikachu is marked as favorite/i);
    expect(alt.src).toContain('star-icon.svg');
  });
});
