import React from 'react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('7- Teste o componente <PokemonDetails.js', () => {
  test('1-Teste se as informações detalhadas do Pokémon selecionado', () => {
    renderWithRouter(<App />);
  });

  test('2- Teste se existe na página uma seção com os mapas', () => {
    renderWithRouter(<App />);
  });
  test('3- Teste se o usuário pode favoritar um pokémon através', () => {
    renderWithRouter(<App />);
  });
});
