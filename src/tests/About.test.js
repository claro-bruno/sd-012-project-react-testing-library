import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa renderização do componente About', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
    const linkAbout = screen.getByRole('link', { name: 'About' });
    userEvent.click(linkAbout);
  });

  it('Testa se a página About possui o texto About Pokédex', () => {
    const AboutTitle = screen.getByRole('heading', { name: 'About Pokédex' });
    expect(AboutTitle).toBeDefined();
  });

  it('Testa se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    const phraseOne = /This application simulates a Pokédex,/i;
    const phraseTwo = /One can filter Pokémons by type,/i;
    const paragraphOne = screen.getByText(phraseOne);
    const paragraphTwo = screen.getByText(phraseTwo);
    expect(paragraphOne).toBeDefined();
    expect(paragraphTwo).toBeDefined();
  });

  it('Testa se a página renderiza a imagem da pokedex', () => {
    const imgUrl = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const img = screen.getByRole('img');
    expect(img.src).toBe(imgUrl);
  });
});
