import React from 'react';
import { render, screen } from '@testing-library/react';
import { About } from '../components';

describe('2. Teste o componente <About.js />.', () => {
  beforeEach(() => {
    render(<About />);
  });
  it('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    const h2Text = screen.getByRole('heading', { level: 2 });
    expect(h2Text).toHaveTextContent('About Pokédex');
  });
  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    const paragraphOne = screen.getByText(/This application simulates a Pokédex/i);
    expect(paragraphOne).toBeInTheDocument();
    const paragraphTwo = screen.getByText(/One can filter Pokémons by type/i);
    expect(paragraphTwo).toBeInTheDocument();
  });
  it('Teste se a página contém a seguinte imagem de uma Pokédex:', () => {
    const srcImage = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const imgTest = screen.getByRole('img');
    expect(imgTest).toHaveAttribute('src', srcImage);
  });
});
