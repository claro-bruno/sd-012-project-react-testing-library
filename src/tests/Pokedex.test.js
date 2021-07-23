import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../rota/renderWithRoute';
import App from '../App';

describe('Testa Pokedex.js', () => {
  it('Testa info da Pokedex(h2)', () => {
    renderWithRouter(<App />);
    const aboutPokedex = screen.getByRole('heading', { name: /Encountered pokémons/i });
    expect(aboutPokedex).toBeInTheDocument();
  });

  it('Testa botao Proximo pokemon', () => {
    renderWithRouter(<App />);
    const button = screen.getByRole('button', { name: /Próximo pokémon/i });
    expect(button).toBeInTheDocument();

    const firstPokemon = screen.getByText(/Pikachu/i);
    expect(firstPokemon).toBeInTheDocument();
    userEvent.click(button);

    const secondPokemon = screen.getByText(/Charmander/i);
    expect(secondPokemon).toBeInTheDocument();
    userEvent.click(button);

    expect(screen.getAllByRole('img').length).toEqual(1);
  });

  it('Testa se o primeiro Pokemon aparece depois do ultimo', () => {
    renderWithRouter(<App />);

    const firstPokemon = screen.getByText(/Pikachu/i);
    expect(firstPokemon).toBeInTheDocument();

    const button = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(button);
    expect(screen.getByText(/Charmander/i)).toBeInTheDocument();

    userEvent.click(button);
    expect(screen.getByText(/Caterpie/i)).toBeInTheDocument();

    userEvent.click(button);
    expect(screen.getByText(/Ekans/i)).toBeInTheDocument();

    userEvent.click(button);
    expect(screen.getByText(/Alakazam/i)).toBeInTheDocument();

    userEvent.click(button);
    expect(screen.getByText(/Mew/i)).toBeInTheDocument();

    userEvent.click(button);
    expect(screen.getByText(/Rapidash/i)).toBeInTheDocument();

    userEvent.click(button);
    expect(screen.getByText(/Snorlax/i)).toBeInTheDocument();

    userEvent.click(button);
    expect(screen.getByText(/Dragonair/i)).toBeInTheDocument();

    userEvent.click(button);
    expect(screen.getByText(/Pikachu/i)).toBeInTheDocument();
  });

  it('Testa botoes de filtro pokemon', () => {
    renderWithRouter(<App />);
    const all = screen.getByRole('button', { name: /all/i });
    const electric = screen.getByRole('button', { name: /electric/i });
    const fire = screen.getByRole('button', { name: /fire/i });
    const bug = screen.getByRole('button', { name: /bug/i });
    const poison = screen.getByRole('button', { name: /poison/i });
    const psychic = screen.getByRole('button', { name: /psychic/i });
    const normal = screen.getByRole('button', { name: /normal/i });
    const dragon = screen.getByRole('button', { name: /dragon/i });
    const buttonAll = screen.getByText(/all/i);

    expect(all).toBeInTheDocument();
    expect(electric).toBeInTheDocument();
    expect(fire).toBeInTheDocument();
    expect(bug).toBeInTheDocument();
    expect(poison).toBeInTheDocument();
    expect(psychic).toBeInTheDocument();
    expect(normal).toBeInTheDocument();
    expect(dragon).toBeInTheDocument();

    userEvent.click(fire);
    expect(screen.getByText(/Charmander/i)).toBeInTheDocument();
    userEvent.click(buttonAll);
    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();

    userEvent.click(bug);
    expect(screen.getByText(/Caterpie/i)).toBeInTheDocument();
    userEvent.click(buttonAll);
    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();

    userEvent.click(poison);
    expect(screen.getByText(/Ekans/i)).toBeInTheDocument();
    userEvent.click(buttonAll);
    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();

    userEvent.click(psychic);
    expect(screen.getByText(/Alakazam/i)).toBeInTheDocument();
    userEvent.click(buttonAll);
    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();

    userEvent.click(normal);
    expect(screen.getByText(/Snorlax/i)).toBeInTheDocument();
    userEvent.click(buttonAll);
    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();

    userEvent.click(dragon);
    expect(screen.getByText(/Dragonair/i)).toBeInTheDocument();
    userEvent.click(buttonAll);
    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
  });
  
  it('Testa botao correspondente ao pokemon', () => {
    renderWithRouter(<App />);
    const btnType = screen.getAllByTestId('pokemon-type-button');
    expect(btnType[1]).toHaveTextContent(/fire/i);
    userEvent.click(btnType[1]);
    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toHaveTextContent(/fire/i);
  });
});
