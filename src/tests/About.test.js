import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../types/renderWithRouter';
import About from '../components/About';

describe('Testando o componente About.js', () => {
  test('Verifica se renderiza o informações sobre a Pokédex', () => {
    const { history } = renderWithRouter(<About />);
    const about = screen.getByText(/This application simulates a Pokédex/i);
    expect(about).toBeInTheDocument();
    const url = history.location.pathname;
    expect(url).toBe('/');
  });
  test('Verifica se renderiza o texto About Pokédex em h2', () => {
    const { history } = renderWithRouter(<About />);
    const tagH2 = screen.getByRole('heading', { level: 2 });
    expect(tagH2).toBeInTheDocument();
    expect(tagH2).toHaveTextContent('About Pokédex');
    const url = history.location.pathname;
    expect(url).toBe('/');
  });
  test('Verifica se a página tem dois parágrafos Pokédex', () => {
    const { history } = renderWithRouter(<About />);
    const firstP = screen.getByText(/This application simulates a Pokédex/i);
    const secondP = screen.getByText(/One can filter Pokémons/i);
    expect(firstP).toBeInTheDocument();
    expect(secondP).toBeInTheDocument();
    const url = history.location.pathname;
    expect(url).toBe('/');
  });
  test('Verifica se a página tem imagem de uma Pokédex', () => {
    const { history } = renderWithRouter(<About />);
    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();
    expect(image.src).toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
    const url = history.location.pathname;
    expect(url).toBe('/');
  });
});
