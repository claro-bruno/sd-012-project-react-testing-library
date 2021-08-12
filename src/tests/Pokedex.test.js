import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

describe('Verifica Pokedex.test.js', () => {
  test('Verifica se a links na pagina Inicial e botões', () => {
    renderWithRouter(<App />);

    const textPoke = screen.getByText(/Encountered pokémons/i);
    expect(textPoke).toBeDefined();
    const bttn = screen.getByRole('button', { name: /Próximo pokémon/i });
    expect(bttn).toBeDefined();

    userEvent.click(bttn);
    expect(screen.getByText(pokemons[1].name)).toBeDefined();
    userEvent.click(bttn);
    expect(screen.getByText(pokemons[2].name)).toBeDefined();
    userEvent.click(bttn);
    expect(screen.getByText(pokemons[3].name)).toBeDefined();
    userEvent.click(bttn);
    expect(screen.getByText(pokemons[4].name)).toBeDefined();
    userEvent.click(bttn);
    expect(screen.getByText(pokemons[5].name)).toBeDefined();
    userEvent.click(bttn);
    expect(screen.getByText(pokemons[6].name)).toBeDefined();
    userEvent.click(bttn);
    expect(screen.getByText(pokemons[7].name)).toBeDefined();
    userEvent.click(bttn);
    expect(screen.getByText(pokemons[8].name)).toBeDefined();
    userEvent.click(bttn);
    const type = screen.getByRole('button', { name: 'Poison' });
    expect(type).toBeDefined();
    userEvent.click(screen.getByRole('button', { name: 'Electric' }));
    userEvent.click(screen.getByRole('button', { name: 'All' }));
  });
  // Parte que não aparece no projeto, PEGUEI DO REPOSITORIO DO ALuno"Roberval Filho".
  test('contém os botões de fitlros', () => {
    renderWithRouter(<App />);
    const pokemonTypes = Array.from(new Set(pokemons.map(({ type }) => type)));
    const typeButtons = screen.getAllByTestId('pokemon-type-button');
    expect(typeButtons).toHaveLength(pokemonTypes.length);
    expect(typeButtons[0]).toHaveTextContent(pokemonTypes[0]);
    expect(typeButtons[4]).toHaveTextContent(pokemonTypes[4]);
    expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument();
  });
  // https://github.com/tryber/sd-012-project-react-testing-library/pull/79/commits/f8e94060d7f9c5ff7516bddb6a62c4b962491373
});
