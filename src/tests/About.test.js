import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

describe('Teste do componente About', () => {
  test('Verifica se o componente possúi um h2 com o texto: About Pokédex', () => {
    renderWithRouter(<About />);

    const text = screen.getByRole('heading', { name: /About Pokédex/i });

    expect(text).toBeInTheDocument();
  });

  test('Verifica se o componente possúi dois parágrafos sobre a Pokédex', () => {
    renderWithRouter(<About />);

    const text1 = 'This application simulates a Pokédex';
    const text2 = 'One can filter Pokémons by type';

    const paragraph1 = screen.getByText(text1, { exact: false });
    expect(paragraph1).toBeInTheDocument();

    const paragraph2 = screen.getByText(text2, { exact: false });
    expect(paragraph2).toBeInTheDocument();
  });

  test('Verifica se o componente possui a imagem da Pokédex', () => {
    renderWithRouter(<About />);

    const imageLink = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', imageLink);
  });
});
