import React from 'react';
import { screen, render } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

describe('Teste o componente <About.js />', () => {
  it('Teste se a página contém as informações sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const header = screen.getByRole('heading', { level: 2 });
    expect(header).toHaveTextContent('About Pokédex');
  });
  it('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    render(<About />);
    const h2 = screen.getByRole('heading', { level: 2 });
    expect(h2).toBeInTheDocument();
    expect(h2).toHaveTextContent('About Pokédex');
  });
  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const findInFistP = screen.getByText(/a digital encyclopedia containing/i);
    const findInSecondP = screen.getByText(/see more details for each one of them/i);
    expect(findInFistP).toBeInTheDocument();
    expect(findInSecondP).toBeInTheDocument();
  });
  it('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    renderWithRouter(<About />);
    const pokedexImage = screen.getByRole('img');
    expect(pokedexImage).toBeInTheDocument();
    expect(pokedexImage.src).toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
