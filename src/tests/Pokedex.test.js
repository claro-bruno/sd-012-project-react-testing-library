import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../RenderWithRouter';
import App from '../App';

describe('Testa component Pokedex', () => {
  it('Verifica se página contém um h2 com texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const head = screen.getByRole('heading', { name: /Encountered pokémons/i });
    expect(head).toBeDefined();
  });

  it('Verifica se ao clicar no botão Proximo pokemon é exibido o próximo pokemon', () => {
    renderWithRouter(<App />);
    const firstPokemon = screen.getByText(/Pikachu/i);
    expect(firstPokemon).toBeDefined();

    const button = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(button);
    expect(screen.getByText(/Charmander/i)).toBeDefined();
    userEvent.click(button);
  });

  it('Verifica se apenas um pokémon é mostrado por vez', () => {
    renderWithRouter(<App />);
    const button = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(button);
    expect(screen.getAllByRole('img').length).toEqual(1);
  });

  it('Verifica se o primeiro pokémon é mostrado depois do último da lista', () => {
    renderWithRouter(<App />);

    const firstPokemon = screen.getByText(/Pikachu/i);
    expect(firstPokemon).toBeDefined();

    const button = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(button);
    expect(screen.getByText(/Charmander/i)).toBeDefined();

    userEvent.click(button);
    expect(screen.getByText(/Caterpie/i)).toBeDefined();

    userEvent.click(button);
    expect(screen.getByText(/Ekans/i)).toBeDefined();

    userEvent.click(button);
    expect(screen.getByText(/Alakazam/i)).toBeDefined();

    userEvent.click(button);
    expect(screen.getByText(/Mew/i)).toBeDefined();

    userEvent.click(button);
    expect(screen.getByText(/Rapidash/i)).toBeDefined();

    userEvent.click(button);
    expect(screen.getByText(/Snorlax/i)).toBeDefined();

    userEvent.click(button);
    expect(screen.getByText(/Dragonair/i)).toBeDefined();

    userEvent.click(button);
    expect(screen.getByText(/Pikachu/i)).toBeDefined();
  });

  it('Verifica se a pokedex mostra os botões de filtro', () => {
    renderWithRouter(<App />);
    const all = screen.getByRole('button', { name: /All/i });
    const electric = screen.getByRole('button', { name: /electric/i });
    const fire = screen.getByRole('button', { name: /fire/i });
    const bug = screen.getByRole('button', { name: /bug/i });
    const poison = screen.getByRole('button', { name: /poison/i });
    const psychic = screen.getByRole('button', { name: /psychic/i });
    const normal = screen.getByRole('button', { name: /normal/i });
    const dragon = screen.getByRole('button', { name: /dragon/i });

    expect(all).toBeDefined();
    expect(electric).toBeDefined();
    expect(fire).toBeDefined();
    expect(bug).toBeDefined();
    expect(poison).toBeDefined();
    expect(psychic).toBeDefined();
    expect(normal).toBeDefined();
    expect(dragon).toBeDefined();
  });

  it('Verifica se o botão All reseta o filtro', () => {
    renderWithRouter(<App />);
    const btnAll = screen.getByText(/all/i);
    const fire = screen.getByRole('button', { name: /fire/i });
    const bug = screen.getByRole('button', { name: /bug/i });
    const poison = screen.getByRole('button', { name: /poison/i });
    const psychic = screen.getByRole('button', { name: /psychic/i });
    const normal = screen.getByRole('button', { name: /normal/i });
    const dragon = screen.getByRole('button', { name: /dragon/i });

    userEvent.click(fire);
    expect(screen.getByText(/Charmander/i)).toBeDefined();
    userEvent.click(btnAll);
    expect(screen.getByText(/pikachu/i)).toBeDefined();

    userEvent.click(bug);
    expect(screen.getByText(/Caterpie/i)).toBeDefined();
    userEvent.click(btnAll);
    expect(screen.getByText(/pikachu/i)).toBeDefined();

    userEvent.click(poison);
    expect(screen.getByText(/Ekans/i)).toBeDefined();
    userEvent.click(btnAll);
    expect(screen.getByText(/pikachu/i)).toBeDefined();

    userEvent.click(psychic);
    expect(screen.getByText(/Alakazam/i)).toBeDefined();
    userEvent.click(btnAll);
    expect(screen.getByText(/pikachu/i)).toBeDefined();

    userEvent.click(normal);
    expect(screen.getByText(/Snorlax/i)).toBeDefined();
    userEvent.click(btnAll);
    expect(screen.getByText(/pikachu/i)).toBeDefined();

    userEvent.click(dragon);
    expect(screen.getByText(/Dragonair/i)).toBeDefined();
    userEvent.click(btnAll);
    expect(screen.getByText(/pikachu/i)).toBeDefined();
  });
  it('Verifica se o botão nome do tipo corresponde ao pokémon', () => {
    renderWithRouter(<App />);
    const btnType = screen.getAllByTestId('pokemon-type-button');
    expect(btnType[1]).toHaveTextContent(/fire/i);
    userEvent.click(btnType[1]);
    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toHaveTextContent(/fire/i);
  });
});

// it('Verifica se o botão All está sempre visível', () => {
//   renderWithRouter(<App />);
//   const btnAll = screen.getByText(/all/i);
//   const firstPokemon = screen.getByText(/Pikachu/i);
//   expect(firstPokemon).toBeDefined();
//   expect(btnAll).toBeDefined();

//   const button = screen.getByRole('button', { name: /próximo pokémon/i });
//   userEvent.click(button);
//   expect(screen.getByText(/Charmander/i)).toBeDefined();
//   expect(btnAll).toBeDefined();

//   userEvent.click(button);
//   expect(screen.getByText(/Caterpie/i)).toBeDefined();
//   expect(btnAll).toBeDefined();

//   userEvent.click(button);
//   expect(screen.getByText(/Ekans/i)).toBeDefined();
//   expect(btnAll).toBeDefined();

//   userEvent.click(button);
//   expect(screen.getByText(/Alakazam/i)).toBeDefined();
//   expect(btnAll).toBeDefined();

//   userEvent.click(button);
//   expect(screen.getByText(/Mew/i)).toBeDefined();
//   expect(btnAll).toBeDefined();

//   userEvent.click(button);
//   expect(screen.getByText(/Rapidash/i)).toBeDefined();
//   expect(btnAll).toBeDefined();

//   userEvent.click(button);
//   expect(screen.getByText(/Snorlax/i)).toBeDefined();
//   expect(btnAll).toBeDefined();

//   userEvent.click(button);
//   expect(screen.getByText(/Dragonair/i)).toBeDefined();
//   expect(btnAll).toBeDefined();

//   userEvent.click(button);
//   expect(screen.getByText(/Pikachu/i)).toBeDefined();
//   expect(btnAll).toBeDefined();
// });
