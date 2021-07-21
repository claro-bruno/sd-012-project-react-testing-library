import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testando componente Pokedex', () => {
  const types = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
  const pokemonName = 'pokemon-name';
  // Teste se página contém um heading h2 com o texto Encountered pokémons.
  it('Verifica se a página contém um header com texto específico', () => {
    renderWithRouter(<App />);
    const header = screen.getByText(/encountered pokémons/i);
    expect(header).toBeInTheDocument();
  });

  // Teste se é exibido o próximo Pokémon da lista quando o botão Próximo pokémon é clicado.
  // O botão deve conter o texto Próximo pokémon;
  // Os próximos Pokémons da lista devem ser mostrados, um a um, ao clicar sucessivamente no botão;
  it('Verifica funcionamento correto do botão de próximo Pokémon', () => {
    renderWithRouter(<App />);
    const nextButton = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(nextButton).toBeInTheDocument();

    const pokeName = screen.getByTestId(pokemonName);
    pokemons.forEach((pokemon, i) => {
      expect(pokeName).toHaveTextContent(pokemon.name);
      fireEvent.click(nextButton);
      expect(pokeName).not.toHaveTextContent(pokemons[i].name);
    });
  });

  // O primeiro Pokémon da lista deve ser mostrado ao clicar no botão, se estiver no último Pokémon da lista;
  it('Verifica se exibe o primeiro Pokémon ao clicar no botão no último Pokémon', () => {
    renderWithRouter(<App />);
    const nextButton = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(nextButton).toBeInTheDocument();

    pokemons.forEach((pokemon, i) => {
      if (i < pokemons.length - 1) {
        fireEvent.click(nextButton);
      }
    });

    const pokeName = screen.getByTestId(pokemonName);
    expect(pokeName).toHaveTextContent(pokemons[8].name);

    fireEvent.click(nextButton);
    expect(pokeName).toHaveTextContent(pokemons[0].name);
  });

  // Teste se é mostrado apenas um Pokémon por vez.
  it('Verifica se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);
    const names = screen.getAllByTestId(pokemonName);
    expect(names.length).toBe(1);
  });

  // Teste se a Pokédex tem os botões de filtro.
  // Deve existir um botão de filtragem para cada tipo de Pokémon, sem repetição.
  // O texto do botão deve corresponder ao nome do tipo, ex. Psychic;
  it('Verifica se há um botão de filtragem para cada tipo, sem repetição', () => {
    renderWithRouter(<App />);
    const filterButtons = screen.getAllByTestId('pokemon-type-button');
    filterButtons.forEach((button, i) => {
      expect(button).toBeInTheDocument();
      expect(filterButtons[i]).toHaveTextContent(types[i]);
    });
    expect(filterButtons).toHaveLength(types.length);
  });

  // A partir da seleção de um botão de tipo, a Pokédex deve circular somente pelos pokémons daquele tipo;
  it('Verifica se só permite circular por pokémons filtrados', () => {
    renderWithRouter(<App />);
    const fireButton = screen.getByRole('button', { name: /fire/i });
    fireEvent.click(fireButton);
    const name = screen.getByTestId(pokemonName);
    expect(name).toHaveTextContent('Charmander');
    const nextButton = screen.getByRole('button', { name: /próximo pokémon/i });

    fireEvent.click(nextButton);
    expect(name).toHaveTextContent('Rapidash');

    fireEvent.click(nextButton);
    expect(name).toHaveTextContent('Charmander');
  });

  // O botão All precisa estar sempre visível.
  // O texto do botão deve ser All;
  // Ao carregar a página, o filtro selecionado deverá ser All;
  // A Pokedéx deverá mostrar os Pokémons normalmente (sem filtros) quando o botão All for clicado;
  // Teste se a Pokédex contém um botão para resetar o filtro
  it('Verifica funcionamento do botão de filtro All', () => {
    renderWithRouter(<App />);
    const resetButton = screen.getByRole('button', { name: /all/i });
    expect(resetButton).toBeInTheDocument();

    const name = screen.getByTestId(pokemonName);
    expect(name).toHaveTextContent(pokemons[0].name);

    const nextButton = screen.getByRole('button', { name: /próximo pokémon/i });
    fireEvent.click(nextButton);
    expect(resetButton).toBeInTheDocument();

    expect(name).toHaveTextContent(pokemons[1].name);
    fireEvent.click(resetButton);

    expect(name).toHaveTextContent(pokemons[0].name);
  });
});
