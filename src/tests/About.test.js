import React from 'react';
import { screen } from '@testing-library/react';
import { About } from '../components';
import renderWithRouter from './renderWithRouter';

beforeEach(() => {
  renderWithRouter(<About />);
});

describe(' Teste o componente <About.js />.', () => {
  it('Teste se a página contém um heading h2 com o texto About Pokédex.', () => {
    const title = screen.getByRole('heading', { name: /About Pokédex/i });

    expect(title).toBeInTheDocument();
  });

  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    const paragrafo1 = screen.getByText(/This application simulates a Pokédex, /i);
    const paragrafo2 = screen.getByText(/One can filter Pokémons by type,/i);

    expect(paragrafo1).toBeInTheDocument();
    expect(paragrafo2).toBeInTheDocument();
  });

  it('Teste se a página contém a seguinte imagem de uma Pokédex:', () => {
    const image = screen.getByRole('img', { name: /Pokédex/i });

    expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
