import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import data from '../data';
import App from '../App';

describe('Renderização de um card com as informações de determinado pokémon', () => {
  beforeEach(() => renderWithRouter(<App />));

  test('O nome correto do Pokémon deve ser mostrado na tela', () => {
    data.map(({ name }) => {
      const pokemonName = screen.getByTestId('pokemon-name');
      const buttonNext = screen.getByRole('button', { name: /próximo pokémon/i });
      expect(pokemonName).toBeInTheDocument();
      expect(screen
        .getByText(name))
        .toBeInTheDocument();
      return userEvent.click(buttonNext);
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
    // const buttonNext = screen.getByRole('button', { name: /fire/i });
    // userEvent.click(buttonNext);
    // const value = screen.getByTestId(/pokemon-weight/i); // trás o array de type
    // expect(value[0]).toHaveTextContent('8.5'); // o primeiro item do array tem o type igual a fire.
    const buttonNext = screen.getByRole('button', { name: /próximo pokémon/i });
    data.forEach(({ averageWeight: { value, measurementUnit } }) => {
      const textAverage = screen.getByText(/Average weight:/i);
      expect(textAverage).toBeInTheDocument();
      const pokemonWeight = screen.getByTestId('pokemon-weight');
      expect(pokemonWeight).toHaveTextContent(value);
      expect(pokemonWeight).toHaveTextContent(measurementUnit);
      userEvent.click(buttonNext);
    });
  });

  test('A imagem do Pokémon deve ser mostrado na tela', () => {
    const buttonNext = screen.getByRole('button', { name: /próximo pokémon/i });
    data.forEach(({ image, name }) => {
      const alt = screen.getByAltText(`${name} sprite`);
      expect(alt.src).toBe(image);
      userEvent.click(buttonNext);
    });
  });
});

describe('Testando link More Details', () => {
  test('Card do Pokémon contém um link de navegação para exibir detalhes', () => {
    const { history } = renderWithRouter(<App />);
    const linkDetails = screen.getByRole('link', { name: /More details/i });
    expect(linkDetails).toBeInTheDocument();
    userEvent.click(linkDetails);
    expect(history.location.pathname).toBe('/pokemons/25');
  });

  test('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    const { history } = renderWithRouter(<App />);
    const linkDetails = screen.getByRole('link', { name: /More details/i });
    expect(linkDetails).toBeInTheDocument();
    userEvent.click(linkDetails);
    expect(history.location.pathname).toBe('/pokemons/25');

    const inputLabel = screen.getByRole('checkbox', { name: /Pokémon favoritado?/i });
    userEvent.click(inputLabel);

    const alt = screen.getByAltText(/Pikachu is marked as favorite/i);
    expect(alt.src).toContain('star-icon.svg');
  });
});
