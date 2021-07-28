import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';
import renderWhithRouter from './renderWithRouter.test';

describe('Testando componente About', () => {
  beforeEach(() => {
    renderWhithRouter(<About />);
  });

  test('Teste se a página contém as informações sobre a Pokédex', () => {
    const infPokedex = screen.getByText(/About/i);
    expect(infPokedex).toBeInTheDocument();
  });

  test('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    const title = screen.getByRole('heading', { name: /About Pokédex/i });
    expect(title).toBeInTheDocument();
  });

  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    const paragraph = screen.getAllByText(/Pokémons/i);

    expect(paragraph.length).toBe(2);
  });

  test('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    const img = screen.getByRole('img', { name: /Pokédex/i });

    const src = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    expect(img.src).toBe(src);
  });
});
