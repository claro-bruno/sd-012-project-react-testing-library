import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from './renderWithRouter';

describe('Testando o componente About', () => {
  beforeEach(() => {
    renderWithRouter(<About />);
  });
  test('Testa se contém um heading h2 com o texto About Pokédex', () => {
    const textAbout = screen.getByRole('heading', { level: 2 });
    expect(textAbout).toHaveTextContent('About Pokédex');
  });

  test('Testa se contém a seguinte imagem de uma Pokédex:', () => {
    const imgAbout = screen.getByRole('img');
    expect(imgAbout).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
