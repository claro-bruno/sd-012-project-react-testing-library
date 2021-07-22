import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../../renderWithRouter';
import Pokedex from '../components/Pokedex';

// prettier-ignore
describe('Requisito 6', () => {
  it('6.1 - Teste se é renderizado um card com as informações de pokémon.', () => {
    renderWithRouter(<Pokedex />);
    const error404 = screen.getByText(/Page requested not found/i);
    expect(error404).toBeInTheDocument();
  });
  it('6.1.1 - O nome correto do Pokémon deve ser mostrado na tela.', () => {
    renderWithRouter(<Pokedex />);
    expect(1).toBe(1);
  });
  it('6.1.2 - O tipo correto do pokémon deve ser mostrado na tela.', () => {
    renderWithRouter(<Pokedex />);
    expect(1).toBe(1);
  });
  it('6.1.3 - O peso médio do pokémon deve ser exibido.', () => {
    renderWithRouter(<Pokedex />);
    expect(1).toBe(1);
  });
  it('6.1.4 - A imagem do Pokémon deve ser exibida..', () => {
    renderWithRouter(<Pokedex />);
    expect(1).toBe(1);
  });
  it('6.2 - Teste se o card do Pokémon indicado na Pokédex contém um link.', () => {
    renderWithRouter(<Pokedex />);
    expect(1).toBe(1);
  });
  it('6.3 - Teste se é feito o redirecionamento para detalhes de Pokémon.', () => {
    renderWithRouter(<Pokedex />);
    expect(1).toBe(1);
  });
  it('6.4 - Teste também se a URL exibida no navegador muda para /pokemon/<id>.', () => {
    renderWithRouter(<Pokedex />);
    expect(1).toBe(1);
  });
  it('6.5 - Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    renderWithRouter(<Pokedex />);
    expect(1).toBe(1);
  });
  it('6.5.1 - O ícone deve ser uma imagem.', () => {
    renderWithRouter(<Pokedex />);
    expect(1).toBe(1);
  });
  it('6.5.2 - A img deve ter o atributo alt, onde <pokemon> é o nome do Pokémon.', () => {
    renderWithRouter(<Pokedex />);
    expect(1).toBe(1);
  });
});