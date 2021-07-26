import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from '../renderWithRouter';

describe('Verifica elementos do componente About', () => {
  beforeEach(() => {
    renderWithRouter(<About />);
  });
  test('Verifica se a página contém as informações sobre a Pokedex', () => {
    const infos = [
      /This application simulates a Pokédex, a/i,
      /digital encyclopedia containing all Pokémons/i,
      /One can filter Pokémons by type, and see/i,
      /more details for each one of them/i];

    infos.forEach((string) => {
      const textPart = screen.getByText(string);
      expect(textPart).toBeInTheDocument();
      expect(textPart.localName).toBe('p');
    });
  });
  test('Verifica se a página contém heading h2 com "About Pokédex"', () => {
    const h2 = screen.getByRole('heading', { name: 'About Pokédex' });
    expect(h2).toBeInTheDocument();
    expect(h2.localName).toBe('h2');
  });
  test('Verifica se a página contém a imagem de uma pokédex', () => {
    const imagem = screen.getByRole('img');
    const URL = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(imagem).toHaveProperty('src', URL);
  });
});
