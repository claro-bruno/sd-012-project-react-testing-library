import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from './RenderWithRouter';

describe('Teste do componente About.js', () => {
  beforeEach(() => renderWithRouter(<About />));

  it('Checa informações do Pokédex', () => {
    const head = screen.getByRole('heading', { name: 'About Pokédex' });

    expect(head).toBeInTheDocument();
  });

  it('Checa os 2 parágrados do Pokédex', () => {
    const parag = screen.getAllByText(/pokémons/i);

    expect(parag.length).toBe(2);
  });

  it('Checa a imagem do Pokédex', () => {
    const url = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const img = screen.getByRole('img');

    expect(img).toHaveProperty('src', url);
  });
});
