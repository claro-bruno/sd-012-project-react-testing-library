import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWhitRouter from './renderWhithRouter';
import App from '../App';

describe('Testa o componente About', () => {
  beforeEach(() => {
    renderWhitRouter(<App />);
    const clickAtAbout = screen.getByRole('link', { name: /About/i });
    userEvent.click(clickAtAbout);
  });

  test('Testa se a página contém um heading h2 com o texto About Pokédex', () => {
    const checkh2 = screen.getByRole('heading', { name: /About Pokédex/i });
    expect(checkh2).toBeDefined();
  });

  // Testa abaixo resolvido com a dica do colega Cristiano Lima no slack:
  // https://trybecourse.slack.com/archives/C01T2C18DSM/p1626896066010100
  test('Testa se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    const p1 = /This application simulates a Pokédex/i;
    const checkP1 = screen.getByText(p1);
    expect(checkP1).toBeInTheDocument();

    const p2 = /One can filter Pokémons by type/i;
    const checkP2 = screen.getByText(p2);
    expect(checkP2).toBeInTheDocument();
  });

  // Teste abaixo concluído com ajuda do colega Rodrigo Facury
  test('Testa se a página contém a imagem de uma Pokédex', () => {
    const image = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const checkImage = screen.getByRole('img');
    expect(checkImage.src).toBe(image);
  });
});
