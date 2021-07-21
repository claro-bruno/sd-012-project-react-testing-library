import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from './renderWithRouter';

describe('Teste se a página contém as informações sobre a Pokédex.', () => {
  beforeEach(() => {
    renderWithRouter(<About />);
  });
  it('Teste se a página contém um heading h2 com o texto About Pokédex.', () => {
    const aboutPokedex = screen.getByRole('heading', { level: 2, name: 'About Pokédex' });
    expect(aboutPokedex).toBeInTheDocument();
  });
  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    const paragraph01 = /This application simulates a Pokédex/i;
    expect(screen.getByText(paragraph01)).toBeInTheDocument();
    const paragraph02 = /One can filter Pokémons by type/i;
    expect(screen.getByText(paragraph02)).toBeInTheDocument();
    // const paragraph01 = screen.getByRole('p', {name:/This application simulates a Pokédex/i }) Não existe
  });
  it('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
// Link
// https://trybecourse.slack.com/archives/C01T2C18DSM/p1626896066010100
// https://trybecourse.slack.com/archives/C01T2C18DSM/p1626897108017100
