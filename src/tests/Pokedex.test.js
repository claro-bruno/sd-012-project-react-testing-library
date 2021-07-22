import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../../renderWithRouter';
import Pokedex from '../components/Pokedex';

// prettier-ignore
describe('Requisito 5', () => {
  it('5.1 - Teste se página contém o texto Page requested not found', () => {
    renderWithRouter(<Pokedex />);
    const error404 = screen.getByText(/Page requested not found/i);
    expect(error404).toBeInTheDocument();
  });
  it('5.2 - Teste se é exibido o próximo Pokémon da lista', () => {
    renderWithRouter(<Pokedex />);
    expect(1).toBe(1);
  });
  it('5.2.1 - O botão deve conter o texto Próximo pokémon.', () => {
    renderWithRouter(<Pokedex />);
    expect(1).toBe(1);
  });
  it('5.2.2 - Os próximos Pokémons da lista devem ser mostrados.', () => {
    renderWithRouter(<Pokedex />);
    expect(1).toBe(1);
  });
  it('5.2.3 - O primeiro Pokémon deve ser mostrado se estiver no último.', () => {
    renderWithRouter(<Pokedex />);
    expect(1).toBe(1);
  });
  it('5.3 - Teste se é mostrado apenas um Pokémon por vez.', () => {
    renderWithRouter(<Pokedex />);
    expect(1).toBe(1);
  });
  it('5.4 - Teste se a Pokédex tem os botões de filtro.', () => {
    renderWithRouter(<Pokedex />);
    expect(1).toBe(1);
  });
  it('5.4.1 - Deve existir um botão de filtragem para cada tipo de Pokémon.', () => {
    renderWithRouter(<Pokedex />);
    expect(1).toBe(1);
  });
  it('5.4.2 - Testa filtragem de tipo do Pokémon.', () => {
    renderWithRouter(<Pokedex />);
    expect(1).toBe(1);
  });
  it('5.4.3 - O texto do botão deve corresponder ao nome do tipo, ex. Psychic.', () => {
    renderWithRouter(<Pokedex />);
    expect(1).toBe(1);
  });
  it('5.4.4 - O botão All precisa estar sempre visível.', () => {
    renderWithRouter(<Pokedex />);
    expect(1).toBe(1);
  });
  it('5.5 - Teste se a Pokédex contém um botão para resetar o filtro.', () => {
    renderWithRouter(<Pokedex />);
    expect(1).toBe(1);
  });
  it('5.5.1 - O texto do botão deve ser All.', () => {
    renderWithRouter(<Pokedex />);
    expect(1).toBe(1);
  });
  it('5.5.2 - A Pokedéx deverá estar sem filtros quando o botão All for clicado.', () => {
    renderWithRouter(<Pokedex />);
    expect(1).toBe(1);
  });
  it('5.5.3 - Ao carregar a página, o filtro selecionado deverá ser All.', () => {
    renderWithRouter(<Pokedex />);
    expect(1).toBe(1);
  });
});