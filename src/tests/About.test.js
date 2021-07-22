import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import About from '../components/About';
import renderWithRouter from './renderWithRouter';

describe('Testa o componente <About.js />', () => {
  test('Página contém iformações Pokédex', () => {
    renderWithRouter(<About />);
    const aboutInfo = screen.getByText(/This application simulates a Pokédex/i);
    expect(aboutInfo).toBeInTheDocument();
  });

  test('Página contém um heading', () => {
    renderWithRouter(<About />);
    const header = screen.getByRole('heading', { name: /about pokédex/i });
    expect(header).toBeInTheDocument();
  });

  test('Página contém 2 parágrafos', () => {
    renderWithRouter(<About />);
    const p1 = screen.getByText(/This application simulates a Pokédex/i);
    expect(p1).toBeInTheDocument();

    const p2 = screen.getByText(/One can filter Pokémons/i);
    expect(p2).toBeInTheDocument();
  });

  test('Página contém imagem', () => {
    renderWithRouter(<About />);
    const img = screen.getByRole('img', { name: /pokédex/i });
    expect(img.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
