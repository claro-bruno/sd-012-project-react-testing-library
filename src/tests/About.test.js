import React from 'react';
import { screen } from '@testing-library/react';
import renderWRouter from './RenderWRouter';
import About from '../components/About';

describe('Verifica as funcionalidades do componente About', () => {
  test('Veifica se o componente tem o heading h2 com o About Pokédex', () => {
    renderWRouter(<About />);
    const h2 = screen.getByRole('heading', { level: 2 });

    expect(h2).toHaveTextContent(/About Pokédex/i);
  });
  test('Veifica se o componente tem a imagem de uma pokédex', () => {
    renderWRouter(<About />);
    const urlDaPokedex = ['src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png'];
    const pokedexImg = screen.getByRole('img');
    expect(pokedexImg).toHaveProperty(urlDaPokedex[0], urlDaPokedex[1]);
  });
  test('Verifica se o componente tem dois parágrafos sobre o pokemon', () => {
    renderWRouter(<About />);
    const umTexto = /this application simulates a pokédex/i;
    const otoTexto = /One can filter pokémons by type/i;
    const umParagrafo = screen.getByText(umTexto);
    const otoParagrafo = screen.getByText(otoTexto);

    expect(umParagrafo).toBeInTheDocument();
    expect(otoParagrafo).toBeInTheDocument();
  });
});
