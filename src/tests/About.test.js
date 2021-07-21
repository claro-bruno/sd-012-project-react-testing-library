import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa informações do componente About.js', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByRole('link', { name: /About/i }));
  });

  it('Testa se a página contém um heading h2 com o texto About Pokédex', () => {
    const heading = screen.getByRole('heading', { name: /About Pokédex/i });
    expect(heading.localName).toBe('h2');
  });

  it('Testa se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    const paragraphs = [
      /This application simulates a Pokédex,/i,
      /One can filter Pokémons by type,/i];

    paragraphs.forEach((paragraph) => {
      const tagP = screen.getByText(paragraph);
      expect(tagP.localName).toBe('p');
    });
  });

  it('Testa se a página contém a imagem de uma Pokédex com url correta', () => {
    const imgURL = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(screen.getByRole('img')).toHaveProperty('src', imgURL);
  });
});
