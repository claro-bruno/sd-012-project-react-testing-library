import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import RenderWithRouter from '../renderWithRouter';
import data from '../data';

const pokemonType = 'pokemon-type';
const pokemonTypeBtn = 'pokemon-type-button';

describe('Teste o componente <Pokedex.js />', () => {
  it('Teste se página contém um heading h2 com o texto Encountered pokémons.', () => {
    const { getByRole } = RenderWithRouter(<App />);
    const h2Encountered = getByRole('heading', { level: 2 });
    expect(h2Encountered.textContent).toMatch(/Encountered pokémons/i);
  });

  it('Teste se é exibido o próximo Pokémon quando o botão é clicado', () => {
    const { getByTestId, getByText } = RenderWithRouter(<App />);
    const btnNext = getByTestId('next-pokemon');
    expect(btnNext).toHaveTextContent(/Próximo pokémon/i);
    fireEvent.click(btnNext);
    const nextPokemon = getByText('Charmander');
    expect(nextPokemon).toBeInTheDocument();
    data.forEach((_pokemon, index) => {
      if (index !== data.length - 1) {
        fireEvent.click(btnNext);
      }
    });
    const firstPokemon = getByText(/pikachu/i);
    expect(firstPokemon).toBeInTheDocument();
  });

  it('Teste se é mostrado apenas um Pokémon por vez.', () => {
    const { getAllByText } = RenderWithRouter(<App />);
    const pokemonsOnScreen = getAllByText(/Average weight/i);
    expect(pokemonsOnScreen.length).toBe(1);
  });

  it('Verifica se tem os botões de filtro por tipo', () => {
    const { getAllByTestId } = RenderWithRouter(<App />);
    const btnFilter = getAllByTestId(pokemonTypeBtn);
    const expectedButtonLength = 7;
    expect(btnFilter.length).toBe(expectedButtonLength);
  });

  it('A partir da seleção de tipo deve circular somente pokemons de mesmo tipo', () => {
    const { getByTestId, getAllByTestId } = RenderWithRouter(<App />);
    const btnFilter = getAllByTestId(pokemonTypeBtn);
    const fireBtn = btnFilter.find((btn) => btn.innerHTML === 'Fire');
    fireEvent.click(fireBtn);
    expect(getByTestId(pokemonType).innerHTML).toBe('Fire');
    const btnNext = getByTestId('next-pokemon');
    fireEvent.click(btnNext);
    expect(getByTestId(pokemonType).innerHTML).toBe('Fire');
  });

  it('O texto do botão deve corresponder ao nome do tipo', () => {
    const { getByTestId, getAllByRole } = RenderWithRouter(<App />);
    const typeBtn = getAllByRole('button');
    const poisonTypeBtn = typeBtn.find((btn) => btn.innerHTML === 'Poison');
    fireEvent.click(poisonTypeBtn);
    expect(getByTestId(pokemonType).innerHTML).toMatch('Poison');
  });

  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    const { getByRole, getByText } = RenderWithRouter(<App />);
    const button = getByRole('button', { name: 'All' });
    const nofilter = getByText('Pikachu');
    fireEvent.click(button);
    expect(nofilter).toBeInTheDocument();
  });

  it('Cria dinamicamente os botões de tipo', () => {
    const { getAllByTestId } = RenderWithRouter(<App />);
    const expectedBtns = 7;
    const buttons = getAllByTestId(pokemonTypeBtn);
    expect(buttons.length).toBe(expectedBtns);
  });
});
