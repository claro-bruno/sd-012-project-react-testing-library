import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';

describe('Teste o componente <Pokedex.js />', () => {
  it('Teste se página contém um heading h2 com o texto Encountered pokémons.', () => {
    renderWithRouter(<App />);
    const encontrado = 'Encountered pokémons';
    const headingPokemon = screen.getByRole('heading', { name: encontrado });
    expect(headingPokemon).toBeInTheDocument();
  });

  it(`Teste se é exibido o próximo Pokémon da lista quando o botão
   Próximo pokémon é clicado.`, () => {
    renderWithRouter(<App />);
    const nextmsg = 'Próximo pokémon';
    const btnNext = screen.getByRole('button', { name: nextmsg });
    const currentPokemon = screen.getByText('Pikachu');
    expect(currentPokemon).toBeInTheDocument();
    fireEvent.click(btnNext);
    const nextPokemon = screen.getByText('Charmander');
    expect(nextPokemon).toBeInTheDocument();
  });

  it('Teste se é mostrado apenas um Pokémon por vez.', () => {
    renderWithRouter(<App />);
    screen.getByText('More details');
  });

  it('Teste se a Pokédex tem os botões de filtro.', () => {
    renderWithRouter(<App />);
    const botoes = screen.getAllByTestId('pokemon-type-button');
    const arrOftype = [
      'Electric',
      'Fire',
      'Bug',
      'Poison',
      'Psychic',
      'Normal',
      'Dragon',
    ];
    botoes.forEach((botao, index) => {
      expect(botao).toBeInTheDocument();
      expect(botao).toHaveTextContent(arrOftype[index]);
    });
  });

  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const btnAll = screen.getByRole('button', { name: /All/i });
    const pokeName = pokemons[0].name;
    fireEvent.click(btnAll);
    screen.getByText(pokeName);
  });
});
