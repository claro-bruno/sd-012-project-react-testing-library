import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';

describe('Testa componente <About />', () => {
  beforeEach(() => {
    renderWithRouter(<About />);
  });

  test('Testa se há um heading h2 com texto About Pokédex e se há 2 parágrafos', () => {
    const headingh2 = screen.getByRole('heading', { level: 2 });
    expect(headingh2).toHaveTextContent('About Pokédex');
  });

  test('Testa se a página contém a seguinte imagem de uma Pokédex', () => {
    const image = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const imageAbout = screen.getByRole('img');
    expect(imageAbout).toHaveAttribute('src', image);
  });
});
