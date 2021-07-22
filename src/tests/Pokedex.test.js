import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Verifica Pokedex.js', () => {
  it('Verifica se existe h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const pokedexHeading = screen.getByRole('heading', { name: /Encountered pokémons/i });
    expect(pokedexHeading).toBeInTheDocument();
  });

  it('Verifica se é exibido o próximo Pokémon quando clica no botão', () => {
    renderWithRouter(<App />);
    const pikachu = screen.getByText(/Pikachu/i);
    expect(pikachu).toBeInTheDocument();
    const click1 = screen.getByRole('button', { name: /Próximo pokémon/i });
    userEvent.click(click1);
    const charmander = screen.getByText(/Charmander/i);
    expect(charmander).toBeInTheDocument();
    const click2 = screen.getByRole('button', { name: /Próximo pokémon/i });
    userEvent.click(click2);
    const caterpie = screen.getByText(/Caterpie/i);
    expect(caterpie).toBeInTheDocument();
  });
  // Retirei essa parte do repositório da colega Paula Carlos
  // https://github.com/tryber/sd-012-project-react-testing-library/pulls?q=paula
  it('Verifica se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    const allButton = screen.getByRole('button', { name: /All/i });
    expect(allButton).toBeInTheDocument();
    const buttons = screen.getAllByTestId('pokemon-type-button');
    expect(buttons[0]).toHaveTextContent('Electric');
    expect(buttons[1]).toHaveTextContent('Fire');
    expect(buttons[2]).toHaveTextContent('Bug');
    expect(buttons[3]).toHaveTextContent('Poison');
    expect(buttons[4]).toHaveTextContent('Psychic');
    expect(buttons[5]).toHaveTextContent('Normal');
    expect(buttons[6]).toHaveTextContent('Dragon');
  });

  it('Verifica se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const pikachu = screen.getByText(/Pikachu/i);
    const allButton = screen.getByRole('button', { name: /All/i });
    userEvent.click(allButton);
    expect(pikachu).toBeInTheDocument();
  });
});
