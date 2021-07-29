import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import { About } from '../components';

describe('testes do <About />', () => {
  test('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);
    const heading = screen.getByRole('heading', { name: /About Pokédex/i });

    expect(heading).toBeInTheDocument();
  });

  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const paragraph1 = /This application simulates a Pokédex/i;
    const paragraph2 = /One can filter Pokémons by type/i;

    expect(screen.getByText(paragraph1)).toBeInTheDocument();
    expect(screen.getByText(paragraph2)).toBeInTheDocument();
  });

  test('Teste se a página contém a imagem correta de uma Pokédex:', () => {
    renderWithRouter(<About />);
    const imgUrl = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const img = screen.getByRole('img');

    expect(img).toHaveAttribute('src', imgUrl);
  });
});
