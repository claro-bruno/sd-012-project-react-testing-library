import React from 'react';
import { getAllByTestId, screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import userEvent from '@testing-library/user-event';
import data from '../data';
import App from '../App';
import { render } from 'react-dom';

describe('testa a funcionalidade do componet "Pokedex.js"', () => {
  test('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const findH2 = screen.getByRole('heading', { level: 2});
    expect(findH2).toHaveTextContent(/Encountered pokémons/i);
  });

  test('Teste se é exibido o próximo Pokémon da lista quando o botão Próximo pokémon é clicado.', () => {
    renderWithRouter(<App />);
    const findButton = screen.getByTestId('next-pokemon');
    expect(findButton).toBeInTheDocument();
  });

  test('Os próximos Pokémons da lista devem ser mostrados, um a um, ao clicar sucessivamente no botão', () => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByRole('button', { name: /Próximo pokémon/i }));
    const selectpokemons = screen.getByAltText(/Charmander sprite/i)
    expect(selectpokemons).toBeInTheDocument();
  });

  test('O primeiro Pokémon da lista deve ser mostrado ao clicar no botão, se estiver no último Pokémon da lista;', () => {
      renderWithRouter(<App />);
      const selectpokemons = screen.getByTestId(/pokemon-name/i).innerHTML;
      for (let index = 1; index < data.length; index+=1) {
        userEvent.click(screen.getByRole('button', { name: /Próximo pokémon/i }));
        expect(screen.getByTestId(/pokemon-name/i).innerHTML).not.toEqual(selectpokemons);
      }
      userEvent.click(screen.getByRole('button', { name: /Próximo pokémon/i }));
      expect(screen.getByTestId(/pokemon-name/i).innerHTML).toEqual(selectpokemons);
  });
});

describe('Teste se a Pokédex tem os botões de filtro.', () => {
  test('Deve existir um botão de filtragem para cada tipo de Pokémon, sem repetição.', () => {
    renderWithRouter(<App />);
    const painelDeFiltragem = screen.getAllByTestId(/pokemon-type-button/i);
    const classePokemon = screen.getAllByTestId(/pokemon-type/i);
    for (let index = 0; index < painelDeFiltragem.length; index += 1) {
      userEvent.click(painelDeFiltragem[index]);
      expect(painelDeFiltragem[index]).not.toEqual(painelDeFiltragem[index -1]);
      for (let index2 = 0; index2 < classePokemon.length; index2 += 1) {
        userEvent.click(screen.getByRole('button', { name: /Próximo pokémon/i }));
        expect(classePokemon[index2].innerHTML).toEqual(classePokemon[index2].innerHTML);
      }
    }
    userEvent.click(painelDeFiltragem[0]);
    expect(painelDeFiltragem[0].innerHTML).toEqual(classePokemon[0].innerHTML);
  });
  
  test('O botão All precisa estar sempre visível.', () => {
    renderWithRouter(<App />)
    expect(screen.getByRole('button', { name: /All/i })).toBeInTheDocument();
  });
});


describe('Teste se a Pokédex contém um botão para resetar o filtro',() => {
  test('O texto do botão deve ser All', () => {
    renderWithRouter(<App />)
    const buttonAll = screen.queryAllByRole('button')
    expect(buttonAll[0].innerHTML).toEqual('All')
  });

  test('Ao carregar a página, o filtro selecionado deverá ser All', () => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByRole('button', { name: /Fire/i }));
    expect(screen.getByText(/Charmander/i)).toBeInTheDocument();
    userEvent.click(screen.getByRole('button', { name: /All/i }));
    expect(screen.getByText(/Pikachu/i)).toBeInTheDocument();
  });

});